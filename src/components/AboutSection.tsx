import { Users, Target, Lightbulb, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const pillars = [{
  icon: Lightbulb,
  title: "Artificial Intelligence",
  description: "Leveraging AI to solve complex African challenges in health, agriculture, and infrastructure."
}, {
  icon: Globe,
  title: "Cloud & IoT",
  description: "Building connected ecosystems that enable real-time monitoring and smart decision making."
}, {
  icon: Users,
  title: "Healthcare Innovation",
  description: "Democratizing healthcare access through technology and preventive health solutions."
}, {
  icon: Target,
  title: "Sustainable Development",
  description: "Creating eco-friendly solutions that promote long-term environmental sustainability."
}];
export const AboutSection = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming Africa Through Technology
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Under the visionary leadership of <span className="font-semibold text-primary">Dr. Afebuameh I. Ogbesor</span>, 
            Gitech Africa is pioneering the technological revolution across the continent, creating sustainable solutions 
            that improve lives and drive economic growth.
          </p>
          
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12">
            <blockquote className="text-lg italic text-foreground">
              "Our mission is to harness the power of technology to solve Africa's most pressing challenges, 
              creating a prosperous and sustainable future for all Africans."
            </blockquote>
            <cite className="block mt-4 text-primary font-semibold">
              - Dr. Afebuameh I. Ogbesor, Founder & CEO
            </cite>
          </div>
        </div>
        
        {/* Innovation Pillars */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12 animate-fade-in-up">
            Our Innovation Pillars
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return <Card key={pillar.title} className="card-interactive text-center animate-scale-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2019</div>
              <div className="text-primary-light">Founded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-primary-light">Core Subsidiaries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-light">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-primary-light">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};