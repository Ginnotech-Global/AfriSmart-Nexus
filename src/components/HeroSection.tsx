import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
export const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBackground} alt="Gitech Africa - Smart Technology Solutions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>
      
      {/* Floating Particles/Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent rounded-full animate-float opacity-40" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary-light rounded-full animate-float opacity-50" style={{
        animationDelay: '4s'
      }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Powering Africa's Future with
            <span className="block bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Smart ICT Solutions
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Revolutionizing Health, Infrastructure, and Agriculture across Africa through 
            cutting-edge AI, IoT, and smart technology solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="btn-primary group">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="glass rounded-lg p-6 animate-scale-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="text-3xl font-bold text-primary-light mb-2">3</div>
              <div className="text-gray-300">Innovative Subsidiaries</div>
            </div>
            <div className="glass rounded-lg p-6 animate-scale-in" style={{
            animationDelay: '0.4s'
          }}>
              <div className="text-3xl font-bold text-primary-light mb-2">18+</div>
              <div className="text-gray-300">Projects Delivered</div>
            </div>
            <div className="glass rounded-lg p-6 animate-scale-in" style={{
            animationDelay: '0.6s'
          }}>
              <div className="text-3xl font-bold text-primary-light mb-2">3+</div>
              <div className="text-gray-300">African Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>;
};