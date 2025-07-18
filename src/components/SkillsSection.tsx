import { useState, useEffect } from "react";
import { Code, Smartphone, Brain, Database, Zap, Cpu } from "lucide-react";

export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      id: 1,
      icon: Code,
      title: "Programming Languages",
      skills: ["Java", "Python", "Dart", "JavaScript"],
      color: "from-blue-500 to-indigo-500",
      description: "Core programming languages for diverse applications"
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["Flutter", "Android Studio", "Firebase", "SQLite"],
      color: "from-green-500 to-emerald-500",
      description: "Cross-platform mobile app development"
    },
    {
      id: 3,
      icon: Brain,
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "Scikit-learn", "NLP", "Computer Vision"],
      color: "from-purple-500 to-violet-500",
      description: "Artificial intelligence and data science"
    },
    {
      id: 4,
      icon: Zap,
      title: "Web Technologies",
      skills: ["Streamlit", "React", "HTML/CSS", "RESTful APIs"],
      color: "from-orange-500 to-red-500",
      description: "Modern web development frameworks"
    },
    {
      id: 5,
      icon: Database,
      title: "Data & Analytics",
      skills: ["Pandas", "NumPy", "Data Visualization", "SQL"],
      color: "from-cyan-500 to-blue-500",
      description: "Data manipulation and analysis tools"
    },
    {
      id: 6,
      icon: Cpu,
      title: "Development Tools",
      skills: ["Git", "VS Code", "Jupyter", "Google Colab"],
      color: "from-pink-500 to-rose-500",
      description: "Essential development and collaboration tools"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-2 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-primary-glow/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent applications
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              className={`group transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredSkill(category.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill category card */}
              <div className="glass-card p-8 rounded-3xl h-full transition-all duration-500 group-hover:scale-105 relative overflow-hidden">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>

                  {/* Skills list */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`flex items-center space-x-3 transition-all duration-300 ${
                          hoveredSkill === category.id 
                            ? 'translate-x-2 opacity-100' 
                            : 'translate-x-0 opacity-80'
                        }`}
                        style={{ transitionDelay: `${skillIndex * 50}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} flex-shrink-0`} />
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Floating particles effect */}
                <div className={`absolute top-4 right-4 w-1 h-1 bg-primary rounded-full transition-all duration-1000 ${
                  hoveredSkill === category.id ? 'animate-ping' : ''
                }`} />
                <div className={`absolute bottom-6 left-6 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-1000 ${
                  hoveredSkill === category.id ? 'animate-pulse' : ''
                }`} style={{ animationDelay: '200ms' }} />
              </div>

              {/* Background glow */}
              <div className={`absolute -z-10 inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 blur-xl scale-110 transition-all duration-500 ${
                hoveredSkill === category.id ? 'opacity-20 scale-125' : ''
              }`} />
            </div>
          ))}
        </div>

        {/* Tech stack summary */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-primary">Always Learning, Always Growing</h3>
            <p className="text-muted-foreground">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
              tools, and methodologies to stay at the forefront of innovation in AI and app development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};