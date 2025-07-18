import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Mail, Phone, MessageCircle, User, Folder } from "lucide-react";
import profilePic from "@/assets/profile.jpg";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-xl bg-background/80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={profilePic}
              alt="Baranikumar"
              className="w-10 h-10 rounded-full border-2 border-pink-400 shadow-lg object-cover"
              style={{ boxShadow: '0 0 16px 2px #ffb6d5, 0 0 32px 8px #c084fc' }}
            />
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-400 bg-clip-text text-transparent">
              Baranikumar
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="hero" size="sm">
                  Let's Talk
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary-glow/10 shadow-2xl border-2 border-primary/30">
                <div className="flex flex-col divide-y divide-border">
                  <a href="tel:8122643835" className="flex items-center gap-2 px-4 py-3 hover:bg-gradient-to-r hover:from-green-400/30 hover:to-green-600/20 transition-colors rounded-t-md">
                    <Phone size={18} className="text-green-600" /> <span className="font-semibold text-green-700">Call: 8122643835</span>
                  </a>
                  <a href="https://wa.me/918122643835" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 hover:bg-gradient-to-r hover:from-green-300/30 hover:to-green-500/20 transition-colors">
                    <MessageCircle size={18} className="text-green-500" /> <span className="font-semibold text-green-600">WhatsApp</span>
                  </a>
                  <a href="mailto:baranikumar1708@gmail.com" className="flex items-center gap-2 px-4 py-3 hover:bg-gradient-to-r hover:from-pink-300/30 hover:to-red-500/20 transition-colors">
                    <Mail size={18} className="text-red-500" /> <span className="font-semibold text-red-600">Email</span>
                  </a>
                  <button onClick={() => scrollToSection('#projects')} className="flex items-center gap-2 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-300/30 hover:to-purple-500/20 transition-colors w-full text-left">
                    <Folder size={18} className="text-purple-600" /> <span className="font-semibold text-purple-700">Projects</span>
                  </button>
                  <button onClick={() => scrollToSection('#about')} className="flex items-center gap-2 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-300/30 hover:to-blue-500/20 transition-colors w-full text-left rounded-b-md">
                    <User size={18} className="text-blue-600" /> <span className="font-semibold text-blue-700">About Me</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-card"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 p-6 glass-card rounded-2xl animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="hero" size="sm" className="mt-2">
                Let's Talk
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};