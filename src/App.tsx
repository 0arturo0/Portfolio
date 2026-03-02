/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import { PROJECTS } from './types';
import { ArrowDown } from 'lucide-react';

import MobileExperience from './components/MobileExperience';
import WebsiteExperience from './components/WebsiteExperience';
import AIExperience from './components/AIExperience';
import ContactSection from './components/ContactSection';

function Home() {
  const mobileProjects = PROJECTS.filter(p => p.category === 'mobile');
  const websiteProjects = PROJECTS.filter(p => p.category === 'website');
  const aiProjects = PROJECTS.filter(p => p.category === 'ml-ai');

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8 z-10"
        >
          <h1 className="text-7xl md:text-[10rem] font-serif font-bold tracking-tighter leading-none text-black">
            CRAFTING<br />
            <span className="italic text-black/5">DIGITAL</span><br />
            REALITIES
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-tight text-black/40 max-w-2xl mx-auto">
            A creative developer specializing in high-performance web, mobile, and intelligent systems.
          </p>
        </motion.div>

        {/* Floating Glass Elements for Hero */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 liquid-glass rounded-full blur-3xl opacity-40"
        />
        <motion.div
          animate={{ 
            y: [0, 50, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] liquid-glass rounded-full blur-[100px] opacity-30"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-20">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 opacity-20" />
          </motion.div>
        </motion.div>
      </section>

      {/* Immersive Mobile Experience */}
      <div id="project-1">
        <div className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-xs font-mono uppercase tracking-[0.5em] opacity-30 mb-20">01 / Mobile Applications</h2>
        </div>
        <MobileExperience projects={mobileProjects} />
      </div>

      {/* Immersive Website Experience */}
      <div id="project-2">
        <div className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-xs font-mono uppercase tracking-[0.5em] opacity-30 mb-20">02 / Web Experiences</h2>
        </div>
        <WebsiteExperience projects={websiteProjects} />
      </div>

      {/* Immersive AI Experience (CNN) */}
      <div id="project-3">
        <div className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-xs font-mono uppercase tracking-[0.5em] opacity-30 mb-20">03 / Machine Intelligence</h2>
        </div>
        <AIExperience projects={aiProjects} />
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <div className="pt-32">
      <AboutSection />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-32">
      <ContactSection />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative bg-white text-black selection:bg-black/10">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-black/5 bg-white/50 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-2xl font-serif font-bold tracking-tighter">PORTFOLIO<span className="text-black/20">.</span></p>
              <p className="text-sm font-mono opacity-30">© 2026 DESIGNED & CODED WITH PASSION</p>
            </div>
            <div className="flex space-x-12">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">Legal</p>
                <ul className="space-y-2 text-sm opacity-50">
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Terms</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">Social</p>
                <ul className="space-y-2 text-sm opacity-50">
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Twitter</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
