import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone, Heart, Shield, CreditCard } from "lucide-react";

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      icon: Smartphone,
      title: "Rapid Rescue",
      description: "Emergency response mobile app connecting users with nearest healthcare services using real-time location tracking and AI-powered triage.",
      tags: ["Flutter", "Firebase", "Google Maps API", "AI"],
      color: "from-red-500 to-orange-500",
      featured: true
    },
    {
      id: 2,
      icon: Heart,
      title: "Fit Pro",
      description: "Comprehensive fitness tracking app with personalized workout plans, nutrition guidance, and progress analytics.",
      tags: ["Flutter", "SQLite", "ML Kit", "Charts"],
      color: "from-green-500 to-emerald-500",
      featured: true
    },
    {
      id: 3,
      icon: Heart,
      title: "AI Mental Wellness Tracker",
      description: "Intelligent mental health companion using NLP to analyze mood patterns and provide personalized wellness recommendations.",
      tags: ["Python", "NLP", "TensorFlow", "Streamlit"],
      color: "from-purple-500 to-violet-500",
      featured: true
    },
    {
      id: 4,
      icon: Shield,
      title: "Payment Scam Detection",
      description: "ML-powered system for detecting fraudulent payment transactions with real-time analysis and risk assessment.",
      tags: ["Python", "Scikit-learn", "Pandas", "API"],
      color: "from-blue-500 to-cyan-500",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-2 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building intelligent solutions that make a difference
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project card */}
              <div className={`glass-card p-8 rounded-3xl h-full transition-all duration-500 group-hover:scale-105 ${
                project.featured ? 'border-primary/30' : 'border-white/10'
              }`}>
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                )}

                {/* Project icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${project.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon size={32} className="text-white" />
                </div>

                {/* Project content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className={`flex gap-3 pt-4 transition-all duration-300 ${
                    hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                  }`}>
                    <Button variant="glass" size="sm" className="flex-1">
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-primary/30 hover:bg-primary/10">
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>

                {/* Hover overlay effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </div>

              {/* Floating animation elements */}
              <div className={`absolute -z-10 inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-20 blur-xl scale-110 transition-all duration-500 ${
                hoveredProject === project.id ? 'opacity-30 scale-125' : 'opacity-0 scale-110'
              }`} />
            </div>
          ))}
        </div>

        {/* View all projects */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Button variant="hero" size="lg">
            <Github className="mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};