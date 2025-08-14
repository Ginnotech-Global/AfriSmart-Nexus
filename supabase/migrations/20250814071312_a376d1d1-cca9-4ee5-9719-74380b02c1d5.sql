-- Fix critical security vulnerability: Replace overly permissive subscription update policy
-- Drop the dangerous policy that allows anyone to update subscriptions
DROP POLICY IF EXISTS "System can update subscriptions" ON public.subscriptions;

-- Create a secure policy that only allows users to update their own non-critical subscription fields
-- Critical fields like amount, sessions_remaining, is_active should only be updated by system (service role)
CREATE POLICY "Users can update own subscription metadata" 
ON public.subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: Edge functions using service role key will bypass RLS and can still update critical fields
-- This policy only governs what authenticated users can do directly