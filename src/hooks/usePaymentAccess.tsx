import { useState, useEffect } from "react";
import { supabase, domainConfig } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface Subscription {
  id: string;
  subscriptionType: 'one_off' | 'monthly';
  sessionsRemaining: number;
  expiresAt: string | null;
}

interface PaymentAccessState {
  hasAccess: boolean;
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

export const usePaymentAccess = (user: User | null) => {
  // Use the current domain's service type
  const serviceType = domainConfig.serviceType;
  const [state, setState] = useState<PaymentAccessState>({
    hasAccess: false,
    subscription: null,
    loading: true,
    error: null,
  });

  const checkAccess = async () => {
    if (!user) {
      setState({
        hasAccess: false,
        subscription: null,
        loading: false,
        error: null,
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.functions.invoke('check-access', {
        body: { serviceType }
      });

      if (error) throw error;

      setState({
        hasAccess: data.hasAccess,
        subscription: data.subscription,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error checking access:", error);
      setState({
        hasAccess: false,
        subscription: null,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to check access",
      });
    }
  };

  useEffect(() => {
    checkAccess();
  }, [user, serviceType]);

  const refreshAccess = () => {
    checkAccess();
  };

  return {
    ...state,
    refreshAccess,
  };
};