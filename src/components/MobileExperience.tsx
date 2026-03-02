import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface MobileExperienceProps {
  projects: Project[];
}

export default function MobileExperience({ projects }: MobileExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zoom and Fade effects for the phone frame
  const phoneScale = useTransform(scrollYProgress, [0, 0.15], [1, 10]);
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

        {/* Phone Mockup Entrance */}
        <motion.div
          style={{ scale: phoneScale, opacity: frameOpacity }}
          className="relative w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl z-50 flex items-center justify-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" />
          <div className="w-full h-full rounded-[2.5rem] bg-zinc-950 overflow-hidden" />
        </motion.div>

        {/* Mobile UI Content */}
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
              <MobileProjectItem
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

function MobileProjectItem({ project, progress, range }: { project: Project, progress: any, range: [number, number], key?: string }) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [100, -100]);
  const scale = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h3 className="text-6xl font-serif font-bold tracking-tighter text-black">{project.title}</h3>
          <p className="text-xl text-black/60 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full liquid-glass text-xs font-medium text-black/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-[280px] aspect-[9/19] bg-zinc-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-zinc-800 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-[2rem]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
