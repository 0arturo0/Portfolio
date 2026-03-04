import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Heart, Briefcase } from 'lucide-react';

const hobbyColors = [
  { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', text: '#7c3aed', dot: '#a78bfa' },
  { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)', text: '#0891b2', dot: '#67e8f9' },
  { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', text: '#be185d', dot: '#f9a8d4' },
  { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', text: '#047857', dot: '#6ee7b7' },
  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#b45309', dot: '#fcd34d' },
  { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', text: '#b91c1c', dot: '#fca5a5' },
];

const educationAccents = [
  { line: 'rgba(0,0,0,0.1)', dot: 'rgba(0,0,0,0.2)', glow: 'none' },
  { line: 'rgba(0,0,0,0.1)', dot: 'rgba(0,0,0,0.2)', glow: 'none' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-12 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 via-teal-50/50 to-emerald-100/50 blur-3xl -z-10" />
          <h2 className="text-5xl font-serif font-bold tracking-tight text-black">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >

            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-6 h-6" style={{ color: '#60a5fa', opacity: 0.7 }} />
                <h3 className="text-xl font-bold tracking-tight text-black">Work Experience</h3>
              </div>
              <div className="space-y-8">
                <ExperienceItem
                  accent={educationAccents[0]}
                  company="The University of Texas at El Paso"
                  role="Teaching Assistant"
                  period="2024 — 2024"
                  description="Teaching and assisting students in their computer science courses."
                />
                <ExperienceItem
                  accent={educationAccents[0]}
                  company="Salesforce"
                  role="Software Engineer"
                  period="2024 — 2024"
                  description="Developed an automated classification system for real time monitoring"
                />
                <ExperienceItem
                  accent={educationAccents[0]}
                  company="PepsiCo"
                  role="Software Engineer"
                  period="2023 — 2023"
                  description="Implemented an Application Performance Management (APM) system for B2B website."
                />
                <ExperienceItem
                  accent={educationAccents[0]}
                  company="The University of Texas at El Paso"
                  role="OCSEO Program Student Assistant"
                  period="2022 — 2023"
                  description="Coordinated and delivered a CMS website"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-6 h-6" style={{ color: '#a78bfa', opacity: 0.7 }} />
                <h3 className="text-xl font-bold tracking-tight text-black">Education</h3>
              </div>
              <div className="space-y-8">
                <EducationItem
                  accent={educationAccents[0]}
                  school="The University of Texas at El Paso"
                  degree="M.S. in Artificial Intelligence"
                  period="2024 — 2025"
                  description="Specialized in Deep Learning, Machine Learning, and Computer Vision"
                  awards="S-STEM Scholar, Dean's List, Google Travel Scholar"
                />
                <EducationItem
                  accent={educationAccents[1]}
                  school="The University of Texas at El Paso"
                  degree="B.S. in Computer Science"
                  period="2020 — 2024"
                  description="Double Concentration in Software Engineering and Data Analytics and Minor in Mathematics"
                  awards="S-STEM Scholar, Dean's List, Google Travel Scholar"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6" style={{ color: '#f9a8d4', opacity: 0.8 }} />
                <h3 className="text-xl font-bold tracking-tight text-black">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Photography', 'Music', 'Soccer', 'Cooking', 'Hiking', 'Tennis', 'Coffee'].map((hobby, i) => {
                  const c = hobbyColors[i % hobbyColors.length];
                  return (
                    <span
                      key={hobby}
                      style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        color: c.text,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: `0 2px 12px ${c.border}`,
                      }}
                      className="px-4 py-2 rounded-2xl text-sm font-medium transition-transform hover:scale-105"
                    >
                      <span
                        style={{ background: c.dot, width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }}
                      />
                      {hobby}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EducationItem({
  school, degree, period, description, awards, accent
}: {
  school: string; degree: string; period: string; description: string; awards: string;
  accent: { line: string; dot: string; glow: string };
}) {
  return (
    <div
      className="space-y-2 relative pl-6"
      style={{ borderLeft: `1.5px solid ${accent.line}` }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 8,
          height: 8,
          marginLeft: -4,
          borderRadius: '50%',
          background: accent.dot,
        }}
      />
      <p className="text-xs font-mono" style={{ opacity: 0.35 }}>{period}</p>
      <h4 className="font-bold text-lg text-black">{school}</h4>
      <p className="text-sm font-medium" style={{ opacity: 0.6 }}>{degree}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.4)' }}>{description}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.35)' }}>{awards}</p>
    </div>
  );
}

function ExperienceItem({
  company, role, period, description, accent
}: {
  company: string; role: string; period: string; description: string;
  accent: { line: string; dot: string; glow: string };
}) {
  return (
    <div
      className="space-y-2 relative pl-6"
      style={{ borderLeft: `1.5px solid ${accent.line}` }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 8,
          height: 8,
          marginLeft: -4,
          borderRadius: '50%',
          background: accent.dot,
        }}
      />
      <p className="text-xs font-mono" style={{ opacity: 0.35 }}>{period}</p>
      <h4 className="font-bold text-lg text-black">{company}</h4>
      <p className="text-sm font-medium" style={{ opacity: 0.6 }}>{role}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.4)' }}>{description}</p>
    </div>
  );
}