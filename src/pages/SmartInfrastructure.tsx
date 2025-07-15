import { Building2, Cpu, Shield, Smartphone, Cloud, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import smartInfrastructure from "@/assets/smart-infrastructure.jpg";

const SmartInfrastructure = () => {
  const services = [
    {
      icon: Building2,
      title: "Smart Estate Design",
      description: "Intelligent building systems with IoT integration, energy management, and automated controls."
    },
    {
      icon: Cpu,
      title: "AI & Automation Systems",
      description: "Advanced AI solutions for public and private sector automation and process optimization."
    },
    {
      icon: Shield,
      title: "Enterprise IT Architecture",
      description: "Robust cybersecurity frameworks and scalable IT infrastructure for modern organizations."
    },
    {
      icon: Smartphone,
      title: "Custom App Development",
      description: "Tailored mobile and web applications for business processes and customer engagement."
    },
    {
      icon: Cloud,
      title: "eGovernment Platforms",
      description: "Digital transformation solutions for government services and citizen engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ginno Technology Global Company Ltd.</h1>
                <p className="text-blue-600 font-medium">smart.gitech.africa</p>
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
                Innovating the Future with 
                <span className="text-blue-600"> Smart Infrastructure</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Building intelligent systems and digital infrastructure that power Africa's 
                transformation into a smart, connected continent.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Solutions
                </Button>
                <Button variant="outline" size="lg">
                  View Projects
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={smartInfrastructure} 
                alt="Smart Infrastructure Solutions" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-slate-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Infrastructure Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions for modern infrastructure, automation, and digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
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

      {/* Innovation Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Innovation Pillars</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Artificial Intelligence</h4>
              <p className="text-gray-600">Advanced AI and machine learning solutions for intelligent automation.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Cloud Computing</h4>
              <p className="text-gray-600">Scalable cloud infrastructure and distributed computing solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">IoT Integration</h4>
              <p className="text-gray-600">Connected device ecosystems for smart cities and buildings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-slate-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Build the Future?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create intelligent infrastructure solutions 
            that drive innovation and growth in your organization.
          </p>
          <Button size="lg" variant="secondary">
            Start Your Smart Infrastructure Project
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SmartInfrastructure;