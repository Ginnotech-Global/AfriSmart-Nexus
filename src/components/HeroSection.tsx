import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
export const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
      {/* Futuristic Background with Mesh Gradient */}
      <div className="absolute inset-0 z-0">
        <img src={heroBackground} alt="Gitech Africa - Smart Technology Solutions" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-electric-purple/10"></div>
      </div>
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-6 h-6 bg-electric-cyan rounded-full animate-pulse-glow shadow-glow-primary"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-electric-purple rounded-full animate-float shadow-glow-secondary" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-electric-green rounded-full animate-pulse-glow" style={{
        animationDelay: '4s'
      }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-electric-pink rounded-full animate-data-flow" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-electric-blue rounded-full animate-data-flow" style={{
        animationDelay: '3s'
      }}></div>
        
        {/* Scan lines */}
        <div className="absolute inset-0 scan-lines opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center text-foreground">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Powering Africa's Future with
            <span className="block text-holographic text-6xl md:text-8xl font-black">
              Smart ICT Solutions
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            Revolutionizing Health, Infrastructure, and Agriculture across Africa through 
            <span className="text-electric-cyan">cutting-edge AI</span>, <span className="text-electric-green">IoT</span>, and <span className="text-electric-purple">smart technology</span> solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button size="lg" className="btn-primary group">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button size="lg" className="btn-secondary group">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="card-neon animate-scale-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="text-4xl font-bold text-electric-cyan mb-2 animate-pulse-glow">3</div>
              <div className="text-muted-foreground">Innovative Subsidiaries</div>
            </div>
            <div className="card-neon animate-scale-in" style={{
            animationDelay: '0.4s'
          }}>
              <div className="text-4xl font-bold text-electric-green mb-2 animate-pulse-glow">9
+</div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="card-neon animate-scale-in" style={{
            animationDelay: '0.6s'
          }}>
              <div className="text-4xl font-bold text-electric-purple mb-2 animate-pulse-glow">3+</div>
              <div className="text-muted-foreground">African Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center shadow-glow-primary">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce shadow-glow-primary"></div>
        </div>
      </div>
    </section>;
};