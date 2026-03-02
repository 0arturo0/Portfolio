import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Heart, Code } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-6 h-6 opacity-20" />
              <h3 className="text-xl font-bold tracking-tight text-black">Education</h3>
            </div>
            <div className="space-y-8">
              <EducationItem
                school="Stanford University"
                degree="M.S. in Computer Science"
                period="2020 — 2022"
                description="Specialized in Artificial Intelligence and Human-Computer Interaction."
              />
              <EducationItem
                school="MIT"
                degree="B.S. in Software Engineering"
                period="2016 — 2020"
                description="Focused on web technologies and distributed systems."
              />
            </div>
          </motion.div>

          {/* Hobbies & Projects Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 opacity-20" />
                <h3 className="text-xl font-bold tracking-tight text-black">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Photography', 'Surfing', 'Analog Synths', 'Cooking', 'Hiking', 'Chess'].map((hobby) => (
                  <span key={hobby} className="px-4 py-2 rounded-2xl liquid-glass text-sm text-black/70">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Code className="w-6 h-6 opacity-20" />
                <h3 className="text-xl font-bold tracking-tight text-black">Project Philosophy</h3>
              </div>
              <p className="text-black/50 leading-relaxed italic">
                "I believe that code is a medium for art. Every pixel, every transition, and every line of logic should contribute to a cohesive story that resonates with the user."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EducationItem({ school, degree, period, description }: { school: string; degree: string; period: string; description: string }) {
  return (
    <div className="space-y-2 relative pl-6 border-l border-black/10">
      <div className="absolute left-0 top-2 w-2 h-2 -ml-1 rounded-full bg-black/20" />
      <p className="text-xs font-mono opacity-30">{period}</p>
      <h4 className="font-bold text-lg text-black">{school}</h4>
      <p className="text-sm font-medium opacity-60">{degree}</p>
      <p className="text-sm text-black/40 leading-relaxed">{description}</p>
    </div>
  );
}
