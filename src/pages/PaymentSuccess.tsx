import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  const serviceType = searchParams.get('service') as 'wellness' | 'agro';

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) throw error;

        if (data.success) {
          setVerified(true);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleContinue = () => {
    if (serviceType === 'wellness') {
      navigate('/health');
    } else if (serviceType === 'agro') {
      navigate('/agro');
    } else {
      navigate('/');
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your payment. You now have access to {' '}
            {serviceType === 'wellness' ? 'wellness analysis services' : 'agricultural analysis tools'}.
          </p>
          
          {verified && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Payment verified and access granted
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Button onClick={handleContinue} className="w-full">
              Continue to {serviceType === 'wellness' ? 'Wellness Dashboard' : 'FarmAI Dashboard'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Back to Main Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;