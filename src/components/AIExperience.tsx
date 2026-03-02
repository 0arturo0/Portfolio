import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Project } from '../types';

interface AIExperienceProps {
  projects: Project[];
}

export default function AIExperience({ projects }: AIExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background color interpolation
  const bgColors = projects.map(p => p.bgColor);
  const bgColor = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.6, 0.85],
    ['#ffffff', ...bgColors]
  );

  useEffect(() => {
    const unsubscribe = bgColor.on("change", (latest) => {
      document.body.style.backgroundColor = latest;
    });
    return () => unsubscribe();
  }, [bgColor]);

  const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

  // Calculate which project is currently active based on scroll
  const activeProjectIndex = useTransform(scrollYProgress,
    [0, ...projects.map((_, i) => (i + 0.5) / projects.length), 1],
    [0, ...projects.map((_, i) => i), projects.length - 1]
  );

  return (
    <div ref={containerRef} className="relative bg-transparent pb-0">
      {/* Sticky Training Header */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40"
              >
                {scrollYProgress.get() > 0.98 ? "Status: Optimization Complete" : `Training Model: ${projects[Math.min(Math.floor(activeProjectIndex.get()), projects.length - 1)]?.title || 'Initializing...'}`}
              </motion.p>
              <h2 className="text-2xl font-serif font-bold tracking-tighter">
                {scrollYProgress.get() > 0.98 ? "MODEL READY" : `NEURAL NETWORK: ${projects[Math.min(Math.floor(activeProjectIndex.get()), projects.length - 1)]?.title.toUpperCase() || 'TRAINING'}`}
              </h2>
            </div>
            <div className="text-right">
              <motion.span className="text-4xl font-mono font-bold tracking-tighter">
                {Math.round(progressPercent.get())}%
              </motion.span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-2 w-full bg-black/5 rounded-full overflow-hidden">
            <motion.div
              style={{ width: `${progressPercent.get()}%` }}
              className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-150"
            />

            {/* Milestones */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
              {[0.25, 0.5, 0.75, 1].map((m, i) => (
                <div key={i} className="h-full w-px bg-white/20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Vertical Layout */}
      <div className="max-w-5xl mx-auto px-6 py-32 space-y-64 pb-32">
        {projects.map((project, index) => (
          <TrainingProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
}

function TrainingProjectCard({ project, index, total }: { project: Project, index: number, total: number, key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.95, 1, 1.02]);
  const shadow = useTransform(scrollYProgress, [0.8, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 20px 50px rgba(0,0,0,0.1)"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, scale, boxShadow: shadow }}
      className="relative bg-white rounded-[2.5rem] border border-black/5 overflow-hidden group transition-colors duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-black/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          {/* Milestone Badge */}
          <div className="absolute top-8 left-8">
            <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 flex items-center space-x-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Checkpoint {Math.round(((index + 1) / total) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-12 lg:p-20 space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-black/20">Model 0{index + 1}</span>
              <div className="h-px flex-1 bg-black/5" />
            </div>
            <h3 className="text-5xl font-serif font-bold tracking-tighter leading-none">
              {project.title}
            </h3>
          </div>

          <p className="text-xl text-black/60 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-5 py-2.5 rounded-full bg-black/5 text-xs font-medium text-black/70 border border-black/5">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-8">
            <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">
              View Architecture
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
