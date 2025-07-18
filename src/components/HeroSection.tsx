import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Cpu, Smartphone, Brain } from "lucide-react";

const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0 
}: { 
  icon: any; 
  className: string; 
  delay?: number; 
}) => (
  <div 
    className={`absolute opacity-20 hover:opacity-40 transition-opacity duration-500 ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite`
    }}
  >
    <Icon size={48} className="text-primary-glow" />
  </div>
);

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Purple gradient overlay for enhanced effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/30 to-indigo-900/20 backdrop-blur-sm" />
      
      {/* Floating tech icons */}
      <FloatingIcon icon={Cpu} className="top-20 left-20" delay={0} />
      <FloatingIcon icon={Smartphone} className="top-40 right-32" delay={1.5} />
      <FloatingIcon icon={Brain} className="bottom-32 left-40" delay={3} />
      <FloatingIcon icon={Sparkles} className="bottom-20 right-20" delay={4.5} />
      
      {/* Main content */}
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Glowing greeting */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary animate-pulse">
            👋 Welcome to my digital universe
          </span>
        </div>
        
        {/* Main headline with glow effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            BARANIKUMAR
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-4xl text-muted-foreground mb-8 font-bold" style={{ color: 'hsl(var(--foreground) / 1)', fontWeight: 700 }}>
          AI & App Development Enthusiast
        </p>
        
        {/* Description */}
        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-bold" style={{ color: 'hsl(var(--foreground) / 1)', fontWeight: 700 }}>
          Passionate Computer Science student crafting intelligent applications 
          and exploring the frontiers of artificial intelligence
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button variant="hero" size="lg" className="group">
            <Sparkles className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Explore My Work
          </Button>
          <Button variant="glass" size="lg">
            Get In Touch
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ChevronDown className="mx-auto text-primary" size={32} />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-glow rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-10 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
};