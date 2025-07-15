import { Leaf, Droplets, Sun, Home, Zap, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import agritech from "@/assets/agritech.jpg";

const AgriTech = () => {
  const services = [
    {
      icon: Leaf,
      title: "Precision Farming IoT",
      description: "AI-powered sensors and automation for optimized crop yield and resource management."
    },
    {
      icon: TreePine,
      title: "Agro-processing Facilities",
      description: "Modern processing and storage facilities with smart inventory and quality control systems."
    },
    {
      icon: Home,
      title: "Smart Rural Housing",
      description: "Sustainable, affordable housing solutions for low-income communities with smart home technology."
    },
    {
      icon: Zap,
      title: "Renewable Energy Systems",
      description: "Solar, wind, and biogas energy solutions for rural electrification and sustainability."
    },
    {
      icon: Droplets,
      title: "Water Management",
      description: "Smart irrigation systems and water conservation technologies for efficient farming."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">iAgroConstruct Tech Solutions</h1>
                <p className="text-green-600 font-medium">agro.gitech.africa</p>
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
                Building Smart Farms and 
                <span className="text-green-600"> Sustainable Communities</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transforming African agriculture through precision farming, sustainable 
                infrastructure, and renewable energy solutions for rural development.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Farming Smart
                </Button>
                <Button variant="outline" size="lg">
                  View Case Studies
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={agritech} 
                alt="Agricultural Technology Solutions" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-yellow-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Agricultural Technology Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AgriTech solutions designed to increase productivity, sustainability, and profitability in African agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-green-600" />
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

      {/* Sustainability Impact */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Sustainability Impact</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">30% Energy Savings</h4>
              <p className="text-gray-600">Renewable energy integration reduces operational costs and carbon footprint.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">40% Water Conservation</h4>
              <p className="text-gray-600">Smart irrigation systems optimize water usage for maximum efficiency.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">25% Yield Increase</h4>
              <p className="text-gray-600">Precision farming techniques boost crop productivity and quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Grow Smarter, Farm Better</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the agricultural revolution with our integrated AgriTech solutions 
            that combine technology, sustainability, and profitability.
          </p>
          <Button size="lg" variant="secondary">
            Transform Your Farm Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgriTech;