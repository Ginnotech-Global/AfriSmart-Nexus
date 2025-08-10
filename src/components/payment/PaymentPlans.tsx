import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { supabase, domainConfig } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentPlansProps {
  onPaymentSuccess: () => void;
}

export const PaymentPlans = ({ onPaymentSuccess }: PaymentPlansProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use the domain's service type
  const serviceType = domainConfig.serviceType;

  const plans = {
    wellness: {
      title: "Wellness Analysis Plans",
      oneOff: {
        title: "Single Analysis",
        price: "₦5,000",
        description: "One comprehensive health analysis session",
        features: ["Complete QRMA health diagnostics", "Detailed health report", "Basic recommendations"]
      },
      monthly: {
        title: "Monthly Package",
        price: "₦15,000",
        description: "4 analysis sessions per month",
        features: ["4 comprehensive health analyses", "Priority support", "Advanced recommendations", "Monthly progress tracking"]
      }
    },
    agro: {
      title: "Agricultural Analysis Plans",
      oneOff: {
        title: "Single Section Analysis",
        price: "₦5,000",
        description: "Analysis for one farm section",
        features: ["Crop health assessment", "Soil analysis report", "Basic recommendations"]
      },
      monthly: {
        title: "Monthly Package", 
        price: "₦15,000",
        description: "5 section analyses per month",
        features: ["5 comprehensive section analyses", "Weather integration", "Advanced crop recommendations", "Market insights", "Priority support"]
      }
    }
  };

  const currentPlans = plans[serviceType];

  const handlePayment = async (subscriptionType: 'one_off' | 'monthly') => {
    setLoading(subscriptionType);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { serviceType, subscriptionType }
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        
        // Set up payment verification polling
        const pollForPayment = setInterval(async () => {
          try {
            const { data: accessData } = await supabase.functions.invoke('check-access', {
              body: { serviceType }
            });
            
            if (accessData?.hasAccess) {
              clearInterval(pollForPayment);
              toast({
                title: "Payment Successful!",
                description: "You now have access to the service.",
              });
              onPaymentSuccess();
            }
          } catch (error) {
            console.error("Error checking payment status:", error);
          }
        }, 3000); // Check every 3 seconds

        // Stop polling after 5 minutes
        setTimeout(() => {
          clearInterval(pollForPayment);
        }, 300000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{currentPlans.title}</h2>
        <p className="text-muted-foreground">Choose the plan that best fits your needs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* One-off Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-xl">{currentPlans.oneOff.title}</CardTitle>
            <CardDescription>{currentPlans.oneOff.description}</CardDescription>
            <div className="text-3xl font-bold text-primary">{currentPlans.oneOff.price}</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {currentPlans.oneOff.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full" 
              onClick={() => handlePayment('one_off')}
              disabled={loading === 'one_off'}
            >
              {loading === 'one_off' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Started'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Monthly Plan */}
        <Card className="relative border-primary shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Best Value
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{currentPlans.monthly.title}</CardTitle>
            <CardDescription>{currentPlans.monthly.description}</CardDescription>
            <div className="text-3xl font-bold text-primary">{currentPlans.monthly.price}</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {currentPlans.monthly.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full" 
              onClick={() => handlePayment('monthly')}
              disabled={loading === 'monthly'}
            >
              {loading === 'monthly' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Monthly Plan'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Secure payment powered by Stripe • All prices include applicable taxes</p>
        <p className="mt-2">Need help? Contact our support team</p>
      </div>
    </div>
  );
};