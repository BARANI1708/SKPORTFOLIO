import { useEffect, useState } from "react";
import { Calendar, MapPin, GraduationCap, Target, Heart } from "lucide-react";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      icon: GraduationCap,
      title: "Computer Science Student",
      description: "Currently pursuing my passion for technology and innovation",
      highlight: "Academic Excellence"
    },
    {
      icon: Target,
      title: "App Development Focus",
      description: "Building intelligent applications that solve real-world problems",
      highlight: "Problem Solver"
    },
    {
      icon: Heart,
      title: "Innovation Enthusiast",
      description: "Constantly exploring new technologies and AI possibilities",
      highlight: "Tech Lover"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-2 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate learner on a journey to create intelligent solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile side */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Profile image placeholder with gradient border */}
            <div className="relative mb-8">
              <div className="w-80 h-80 mx-auto rounded-3xl p-1" style={{background: 'none'}}>
                <div className="w-full h-full rounded-3xl flex items-center justify-center" style={{background: 'none'}}>
                  <div className="w-64 h-64 rounded-2xl flex items-center justify-center" style={{background: 'none'}}>
                    <GraduationCap size={80} className="text-primary" />
                  </div>
                </div>
              </div>
              {/* Floating indicators */}
              <div className="absolute -top-4 -right-4 glass-card p-3 rounded-xl">
                <MapPin size={20} className="text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl">
                <Calendar size={20} className="text-accent" />
              </div>
            </div>

            {/* Bio */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-4">Barani Kumar</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a dedicated Computer Science student with an insatiable curiosity for 
                artificial intelligence and mobile app development. My journey began with 
                a simple question: "How can technology make life better?" This curiosity 
                drives me to explore cutting-edge solutions and create applications that 
                bridge the gap between human needs and technological possibilities.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="px-3 py-1 rounded-full glass-card text-sm">🎯 Problem Solver</span>
                <span className="px-3 py-1 rounded-full glass-card text-sm">🚀 Innovator</span>
                <span className="px-3 py-1 rounded-full glass-card text-sm">💡 AI Enthusiast</span>
              </div>
            </div>
          </div>

          {/* Timeline side */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className="relative pl-8 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-4 top-12 w-0.5 h-16 bg-gradient-to-b from-primary to-accent opacity-30" />
                  )}
                  
                  {/* Icon */}
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon size={16} className="text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="glass-card p-6 rounded-2xl group-hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};