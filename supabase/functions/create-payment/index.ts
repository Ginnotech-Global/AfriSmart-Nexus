import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  serviceType: 'wellness' | 'agro';
  subscriptionType: 'one_off' | 'monthly';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    
    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    const { serviceType, subscriptionType }: PaymentRequest = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Determine pricing and session count based on service and subscription type
    let amount: number;
    let sessionsRemaining: number;
    let productName: string;

    if (serviceType === 'wellness') {
      if (subscriptionType === 'one_off') {
        amount = 500000; // 5k NGN in kobo (500,000 kobo = 5,000 NGN)
        sessionsRemaining = 1;
        productName = "Wellness Analysis - Single Session";
      } else {
        amount = 1500000; // 15k NGN in kobo
        sessionsRemaining = 4;
        productName = "Wellness Analysis - Monthly Package (4 sessions)";
      }
    } else { // agro
      if (subscriptionType === 'one_off') {
        amount = 500000; // 5k NGN per section
        sessionsRemaining = 1;
        productName = "Agro Analysis - Single Section";
      } else {
        amount = 1500000; // 15k NGN for 5 sections monthly
        sessionsRemaining = 5;
        productName = "Agro Analysis - Monthly Package (5 sections)";
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: { name: productName },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?service=${serviceType}`,
      cancel_url: `${req.headers.get("origin")}/${serviceType}`,
      metadata: {
        user_id: user.id,
        service_type: serviceType,
        subscription_type: subscriptionType,
        sessions_remaining: sessionsRemaining.toString(),
      },
    });

    // Create subscription record in Supabase
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const expiresAt = subscriptionType === 'monthly' 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      : null;

    await supabaseService.from("subscriptions").insert({
      user_id: user.id,
      service_type: serviceType,
      subscription_type: subscriptionType,
      stripe_customer_id: customerId,
      stripe_session_id: session.id,
      amount: amount,
      currency: 'NGN',
      sessions_remaining: sessionsRemaining,
      is_active: false, // Will be activated when payment is confirmed
      expires_at: expiresAt,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});