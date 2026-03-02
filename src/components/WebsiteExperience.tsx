import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Project } from '../types';

interface WebsiteExperienceProps {
  projects: Project[];
}

export default function WebsiteExperience({ projects }: WebsiteExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zoom and Fade effects for the computer frame
  const monitorScale = useTransform(scrollYProgress, [0, 0.15], [1, 12]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Background color interpolation
  const bgColors = projects.map(p => p.bgColor);
  const bgColor = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.65, 0.9],
    ['#ffffff', ...bgColors]
  );

  useEffect(() => {
    const unsubscribe = bgColor.on("change", (latest) => {
      document.body.style.backgroundColor = latest;
    });
    return () => unsubscribe();
  }, [bgColor]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Computer Mockup Entrance */}
        <motion.div
          style={{ scale: monitorScale, opacity: frameOpacity }}
          className="relative w-[800px] aspect-video bg-zinc-800 rounded-2xl p-4 shadow-2xl border-[12px] border-zinc-700 z-50 flex items-center justify-center"
        >
          <div className="bg-zinc-900 h-6 w-full absolute top-0 left-0 rounded-t-lg flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-green-500/30" />
          </div>
          <div className="w-full h-full rounded-sm bg-zinc-950 overflow-hidden" />
          {/* Stand */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-24 bg-zinc-600 rounded-b-2xl -z-10" />
        </motion.div>

        {/* Website UI Content */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 w-full h-full flex flex-col items-center"
        >
          {projects.map((project, index) => {
            const total = projects.length;
            const sectionSize = 0.8 / total;
            const start = 0.15 + index * sectionSize;
            const end = start + sectionSize;

            return (
              <WebsiteProjectItem
                key={project.id}
                project={project}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function WebsiteProjectItem({ project, progress, range }: { project: Project, progress: any, range: [number, number], key?: string }) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const x = useTransform(progress, [range[0], range[1]], [100, -100]);
  const scale = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="absolute inset-0 flex items-center justify-center px-12"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <h3 className="text-7xl font-serif font-bold tracking-tighter leading-none text-black">{project.title}</h3>
          <p className="text-2xl text-black/60 leading-relaxed max-w-xl">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-6 py-3 rounded-full liquid-glass text-sm font-medium text-black/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative aspect-video bg-zinc-900 rounded-2xl p-1 shadow-2xl border border-white/10 overflow-hidden">
          {/* Browser Top Bar */}
          <div className="bg-zinc-800 h-8 w-full flex items-center px-4 space-x-2 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="flex-1 h-4 bg-white/5 rounded-full mx-4" />
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  );
}
