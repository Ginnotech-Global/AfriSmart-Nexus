import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
      throw new Error("User not authenticated");
    }

    const { serviceType } = await req.json();

    // Check user's active subscriptions for the service
    const { data: subscriptions, error } = await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("service_type", serviceType)
      .eq("is_active", true)
      .gt("sessions_remaining", 0)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    const hasAccess = subscriptions && subscriptions.length > 0;
    const subscription = hasAccess ? subscriptions[0] : null;

    return new Response(JSON.stringify({ 
      hasAccess,
      subscription: subscription ? {
        id: subscription.id,
        subscriptionType: subscription.subscription_type,
        sessionsRemaining: subscription.sessions_remaining,
        expiresAt: subscription.expires_at,
      } : null
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in check-access:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});