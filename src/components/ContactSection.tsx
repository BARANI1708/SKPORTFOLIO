import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Github, Linkedin, Send, MessageCircle, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "baranikumar1708@gmail.com",
      href: "mailto:baranikumar1708@gmail.com",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@BARANI1708",
      href: "https://github.com/BARANI1708",
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "@barani-kumar-r",
      href: "https://www.linkedin.com/in/barani-kumar-r/",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: Phone,
      label: "Call or WhatsApp",
      value: "8122643835",
      href: "tel:8122643835",
      color: "from-green-500 to-green-700",
      extraLinks: [
        { label: "WhatsApp", href: "https://wa.me/918122643835" },
        { label: "Call", href: "tel:8122643835" }
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-2 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next innovative project? Let's build something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <Card className="glass-card p-8 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="glass-card border-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="glass-card border-primary/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello!"
                    rows={6}
                    required
                    className="glass-card border-primary/20 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact info */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-8">
              {/* Social links */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                    <Mail size={20} className="text-white" />
                  </div>
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <Card className="glass-card p-6 border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-105">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${link.color} group-hover:scale-110 transition-transform`}>
                            <link.icon size={20} className="text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors">
                              {link.label}
                            </h4>
                            <p className="text-muted-foreground">{link.value}</p>
                          </div>
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional info */}
              <Card className="glass-card p-6 border-primary/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  Quick Info
                </h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>🎓 Computer Science Student</p>
                  <p>💼 Available for internships and projects</p>
                  <p>🚀 Passionate about AI and app development</p>
                  <p>⚡ Usually responds within 24 hours</p>
                </div>
              </Card>

              {/* AI Assistant */}
              <div className="relative">
                <Card className="glass-card p-6 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <MessageCircle size={16} className="text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <h4 className="font-semibold">AI Assistant Active</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Powered by intelligence, designed for innovation. Let's create the future together!
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};