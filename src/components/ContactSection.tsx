import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your organization with cutting-edge ICT solutions? 
            Get in touch with our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
            <Card className="card-neon">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">info@gitech.africa</p>
                    <p className="text-muted-foreground">partnerships@gitech.africa</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <p className="text-slate-950">+234 (0) 908 000 1559</p>
                    <p className="text-muted-foreground">+234 (0) 815 777 7125</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Headquarters</h4>
                    <p className="text-muted-foreground">
                      20 Gana Street, Miatama<br />
                      Abuja, Nigeria
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links to Subsidiaries */}
            <Card className="card-neon">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="btn-secondary justify-start" asChild>
                  <a href="https://health.gitech.africa" target="_blank" rel="noopener noreferrer">
                    <div className="w-3 h-3 bg-health-primary rounded-full mr-3"></div>
                    iTechnology Health Solutions
                  </a>
                </Button>
                <Button className="btn-secondary justify-start" asChild>
                  <a href="https://smart.gitech.africa" target="_blank" rel="noopener noreferrer">
                    <div className="w-3 h-3 bg-smart-primary rounded-full mr-3"></div>
                    Ginno Smart Infrastructure
                  </a>
                </Button>
                <Button className="btn-secondary justify-start" asChild>
                  <a href="https://agro.gitech.africa" target="_blank" rel="noopener noreferrer">
                    <div className="w-3 h-3 bg-agro-primary rounded-full mr-3"></div>
                    iAgroConstruct Tech Solutions
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-neon animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input type="text" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Your full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company/Organization
                  </label>
                  <Input type="text" value={formData.company} onChange={e => handleInputChange("company", e.target.value)} placeholder="Your company name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea value={formData.message} onChange={e => handleInputChange("message", e.target.value)} placeholder="Tell us about your project or how we can help..." rows={5} required />
                </div>

                <Button type="submit" className="btn-primary group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};