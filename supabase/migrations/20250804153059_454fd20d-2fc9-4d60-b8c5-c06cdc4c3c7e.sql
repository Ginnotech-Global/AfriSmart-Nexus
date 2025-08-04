-- Create enum for subscription types
CREATE TYPE public.subscription_type AS ENUM ('one_off', 'monthly');

-- Create enum for service types
CREATE TYPE public.service_type AS ENUM ('wellness', 'agro');

-- Create subscriptions table to track user access
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_type service_type NOT NULL,
  subscription_type subscription_type NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_session_id TEXT,
  amount INTEGER NOT NULL, -- Amount in cents (5000 = 5k, 15000 = 15k)
  currency TEXT DEFAULT 'NGN',
  sessions_remaining INTEGER, -- For tracking remaining sessions (4 for wellness, 5 for agro)
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ, -- For monthly subscriptions
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();