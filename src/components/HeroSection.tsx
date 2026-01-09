import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Map, FileWarning, Satellite, Shield, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-satellite.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Animated Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-foreground/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Satellite className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              AI-Powered Satellite Monitoring System
            </span>
          </div>

          {/* Headline */}
          <h1 
            className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Protecting Jaipur's{" "}
            <span className="relative">
              <span className="relative z-10">Aravalli Hills</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-secondary/40 -z-0" />
            </span>
            {" "}with AI & Satellite Intelligence
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Real-time monitoring of illegal mining and deforestation activities in the 
            Aravalli region using advanced satellite imagery and artificial intelligence.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary-foreground text-forest-dark hover:bg-primary-foreground/90 font-semibold text-base px-8 py-6 shadow-xl"
            >
              <Map className="w-5 h-5 mr-2" />
              View Jaipur Live Map
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary-foreground/50 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground font-semibold text-base px-8 py-6 backdrop-blur-sm"
            >
              <FileWarning className="w-5 h-5 mr-2" />
              Report Environmental Violation
            </Button>
          </div>

          {/* Trust Badges */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Government Verified</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/30" />
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Satellite className="w-5 h-5" />
              <span className="text-sm">Satellite Imagery</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/30" />
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Map className="w-5 h-5" />
              <span className="text-sm">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a 
          href="#stats" 
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
