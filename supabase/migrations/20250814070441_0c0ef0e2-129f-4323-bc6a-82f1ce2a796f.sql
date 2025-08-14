-- Add SELECT policy for leads table to allow authorized users to view contact information
-- Only users with admin or super_admin roles can view leads
CREATE POLICY "Authorized users can view leads" 
ON public.leads 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);