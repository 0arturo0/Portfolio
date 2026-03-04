import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Smartphone, Globe, Cpu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../types';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsProjectsOpen(false);
  };

  // Handle scrolling after navigation to home
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <motion.div
        animate={{
          padding: isScrolled ? '8px 16px' : '12px 24px',
          scale: isScrolled ? 0.9 : 1,
        }}
        className="pill-navbar flex items-center space-x-6 md:space-x-8"
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-bold tracking-tighter text-black hover:opacity-50 transition-opacity"
        >
          HOME
        </Link>

        <Link
          to="/about"
          className="text-sm font-medium text-black hover:opacity-50 transition-opacity"
        >
          ABOUT
        </Link>

        <div className="relative group">
          <button
            onMouseEnter={() => setIsProjectsOpen(true)}
            className="flex items-center space-x-1 text-sm font-medium text-black hover:opacity-50 transition-opacity"
          >
            <span>PROJECTS</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 text-black", isProjectsOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProjectsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                onMouseLeave={() => setIsProjectsOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 liquid-glass rounded-3xl p-2 overflow-hidden"
              >
                {/* <ProjectLink
                  icon={<Smartphone className="w-4 h-4" />}
                  label="Mobile Apps"
                  onClick={() => scrollToSection('project-1')}
                /> */}
                <ProjectLink
                  icon={<Globe className="w-4 h-4" />}
                  label="Websites"
                  onClick={() => scrollToSection('project-2')}
                />
                <ProjectLink
                  icon={<Cpu className="w-4 h-4" />}
                  label="ML / AI"
                  onClick={() => scrollToSection('project-3')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/contact"
          className="text-sm font-medium text-black hover:opacity-50 transition-opacity"
        >
          CONTACT
        </Link>
      </motion.div>
    </nav>
  );
}

function ProjectLink({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-black/5 transition-colors text-sm font-medium"
    >
      <span className="opacity-60">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
