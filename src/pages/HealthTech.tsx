import { useState, useEffect } from "react";
import { Heart, Activity, Shield, Smartphone, Brain, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AuthModal } from "@/components/auth/AuthModal";
import { Dashboard } from "@/components/health/Dashboard";
import { PaymentPlans } from "@/components/payment/PaymentPlans";
import { usePaymentAccess } from "@/hooks/usePaymentAccess";
import healthTech from "@/assets/health-tech.jpg";

const HealthTech = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPaymentPlans, setShowPaymentPlans] = useState(false);

  const { hasAccess, subscription, loading: accessLoading, refreshAccess } = usePaymentAccess(user);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show payment plans if user is authenticated but doesn't have access
  if (user && session && !accessLoading && !hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-teal-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">iTechnology Global Enterprises</h1>
                  <p className="text-teal-600 font-medium">wellness.gitech.africa</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Back to Main Site
              </Button>
            </div>
          </div>
        </header>
        <PaymentPlans 
          onPaymentSuccess={() => {
            refreshAccess();
          }} 
        />
      </div>
    );
  }

  // If user is authenticated and has access, show the dashboard
  if (user && session && hasAccess) {
    return <Dashboard />;
  }

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Activity className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const services = [
    {
      icon: Activity,
      title: "QRMA Health Diagnostics",
      description: "Quantum Resonance Magnetic Analysis for comprehensive health screening and early disease detection."
    },
    {
      icon: Smartphone,
      title: "Remote Health Monitoring",
      description: "Wearable devices and IoT sensors for continuous health tracking and real-time alerts."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms providing predictive health analytics and personalized recommendations."
    },
    {
      icon: Users,
      title: "Virtual Consultations",
      description: "Telemedicine platforms connecting patients with healthcare professionals across Africa."
    },
    {
      icon: Shield,
      title: "Health SaaS Solutions",
      description: "Cloud-based software for hospitals, clinics, and wellness centers to manage patient care."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-teal-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">iTechnology Global Enterprises</h1>
                <p className="text-teal-600 font-medium">wellness.gitech.africa</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Main Site
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Empowering Wellness Through 
                <span className="text-teal-600"> Intelligent Technology</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionizing healthcare across Africa with cutting-edge diagnostic tools, 
                AI-powered insights, and comprehensive digital health solutions.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setShowAuthModal(true)}
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={healthTech} 
                alt="Health Technology Solutions" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 to-blue-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Our Health Technology Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital health solutions designed to improve healthcare delivery and patient outcomes across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Transform Healthcare in Your Organization</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with us to implement cutting-edge health technology solutions 
            that improve patient care and operational efficiency.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setShowAuthModal(true)}
          >
            Start Your Health Analysis
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => {
          setShowAuthModal(false);
          // User state will be updated via auth listener
        }}
      />
    </div>
  );
};

export default HealthTech;