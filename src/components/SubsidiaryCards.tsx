import { ArrowRight, Heart, Building2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "@/components/Analytics";
import healthTech from "@/assets/health-tech.jpg";
import smartInfrastructure from "@/assets/smart-infrastructure.jpg";
import agritech from "@/assets/agritech.jpg";

const subsidiaries = [
  {
    title: "iTechnology Global Enterprises",
    subtitle: "Empowering Wellness Through Intelligent Technology",
    domain: "health.gitech.africa",
    description: "QRMA health diagnostics, remote monitoring, AI-powered insights, and virtual consultation platforms transforming healthcare across Africa.",
    image: healthTech,
    icon: Heart,
    gradient: "gradient-health",
    features: ["QRMA Health Diagnostics", "Remote Health Monitoring", "AI Preventive Insights", "Virtual Consultations"]
  },
  {
    title: "Ginno Technology Global Company Ltd.",
    subtitle: "Innovating the Future with Smart Infrastructure", 
    domain: "smart.gitech.africa",
    description: "Smart estate design, AI automation, enterprise IT architecture, and custom eGovernment platforms for the digital transformation of Africa.",
    image: smartInfrastructure,
    icon: Building2,
    gradient: "gradient-smart",
    features: ["Smart Estate Design", "AI & Automation Systems", "Enterprise IT Architecture", "eGovernment Platforms"]
  },
  {
    title: "iAgroConstruct Tech Solutions",
    subtitle: "Building Smart Farms and Sustainable Communities",
    domain: "agro.gitech.africa", 
    description: "AI-enabled precision farming, agro-processing facilities, smart housing, and renewable energy systems for sustainable rural development.",
    image: agritech,
    icon: Leaf,
    gradient: "gradient-agro",
    features: ["Precision Farming IoT", "Agro-processing Facilities", "Smart Rural Housing", "Renewable Energy Systems"]
  }
];

export const SubsidiaryCards = () => {
  const navigate = useNavigate();

  const handleSubsidiaryClick = (domain: string, title: string) => {
    trackEvent('subsidiary_click', 'navigation', title);
    
    // Map domain to route
    const routeMap: { [key: string]: string } = {
      'health.gitech.africa': '/health',
      'smart.gitech.africa': '/smart',
      'agro.gitech.africa': '/agro'
    };
    
    const route = routeMap[domain];
    if (route) {
      navigate(route);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Innovation Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three specialized subsidiaries working together to revolutionize Africa's technological landscape
            through health, infrastructure, and agricultural innovations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subsidiaries.map((subsidiary, index) => {
            const IconComponent = subsidiary.icon;
            return (
              <Card key={subsidiary.title} className="card-interactive group overflow-hidden animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={subsidiary.image} 
                    alt={subsidiary.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${subsidiary.gradient} opacity-80`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {subsidiary.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {subsidiary.subtitle}
                    </p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {subsidiary.description}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {subsidiary.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Domain & CTA */}
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground font-mono bg-accent/50 rounded-lg px-3 py-2">
                      {subsidiary.domain}
                    </div>
                    
                    <Button 
                      className="w-full group" 
                      variant="outline"
                      onClick={() => handleSubsidiaryClick(subsidiary.domain, subsidiary.title)}
                    >
                      Enter Site
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};