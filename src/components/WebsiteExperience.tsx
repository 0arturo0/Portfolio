import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

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

  const [modalOpen, setModalOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | undefined>();

  const handleOpenModal = (folderName?: string) => {
    setActiveFolder(folderName);
    setModalOpen(true);
  };

  return (
    <>
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        folderName={activeFolder}
      />
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* Computer Mockup Entrance */}
          <motion.div
            style={{ scale: monitorScale, opacity: frameOpacity }}
            className="relative w-[800px] aspect-video bg-zinc-800 rounded-2xl p-4 shadow-2xl border-[12px] border-zinc-700 z-50 flex items-center justify-center pointer-events-none"
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
            className="absolute inset-0 w-full h-full flex flex-col items-center pointer-events-none"
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
                  onOpenModal={handleOpenModal}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function WebsiteProjectItem({ project, progress, range, onOpenModal }: { project: Project, progress: any, range: [number, number], onOpenModal: (folderName?: string) => void, key?: string }) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const x = useTransform(progress, [range[0], range[1]], [100, -100]);
  const scale = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0.9, 1, 1, 0.9]);
  const pointerEvents = useTransform(progress, (v: number) => (v >= range[0] && v <= range[1] ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, x, scale, pointerEvents }}
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

        <div className="flex flex-col items-center space-y-4">
          <div
            className="relative w-full aspect-video bg-zinc-900 rounded-2xl p-1 shadow-2xl border border-white/10 overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
            onClick={() => onOpenModal(project.folderName)}
          >
            {/* Browser Top Bar */}
            <div className="bg-zinc-800 h-8 w-full flex items-center px-4 space-x-2 border-b border-white/5 relative z-20">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="flex-1 h-4 bg-white/5 rounded-full mx-4" />
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover z-10 pt-8"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Display Label Below Image */}
          <button
            onClick={() => onOpenModal(project.folderName)}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black transition-colors"
          >
            <span className="font-medium tracking-wide">📸 Click to View Gallery</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
