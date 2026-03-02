import React from 'react';
import { motion } from 'motion/react';
import { ProjectCategory, cn } from '../types';

interface EntranceAnimationProps {
  category: ProjectCategory;
  children: React.ReactNode;
}

export default function EntranceAnimation({ category, children }: EntranceAnimationProps) {
  if (category === 'mobile') {
    return (
      <div className="relative w-full max-w-2xl mx-auto aspect-[19/9] bg-zinc-900 rounded-[3rem] p-4 shadow-2xl border-[8px] border-zinc-800 overflow-hidden">
        {/* Notch (Side) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-6 h-32 bg-zinc-800 rounded-r-2xl z-20" />
        
        <motion.div
          initial={{ scale: 2, z: 500, opacity: 0 }}
          whileInView={{ scale: 1, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full rounded-[2rem] overflow-hidden bg-zinc-950 relative"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (category === 'website') {
    return (
      <div className="relative w-full max-w-5xl mx-auto perspective-1000">
        <motion.div
          initial={{ rotateX: 45, y: 200, opacity: 0 }}
          whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative bg-zinc-800 rounded-t-2xl p-2 pb-0 shadow-2xl border-x-[12px] border-t-[12px] border-zinc-700"
        >
          <div className="bg-zinc-900 h-6 w-full rounded-t-lg mb-2 flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-green-500/30" />
          </div>
          <div className="aspect-video bg-zinc-950 overflow-hidden rounded-t-sm">
            {children}
          </div>
        </motion.div>
        <div className="h-6 bg-zinc-600 rounded-b-2xl w-[108%] -ml-[4%] shadow-2xl relative z-10" />
      </div>
    );
  }

  if (category === 'ml-ai') {
    return (
      <div className="relative w-full max-w-3xl mx-auto aspect-video flex items-center justify-center perspective-1000">
        <div className="relative w-full h-full flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, z: -1000, scale: 0.5 }}
              whileInView={{ 
                opacity: 1 - i * 0.2, 
                z: -200 * i, 
                scale: 1 - i * 0.1,
                rotateY: i * 5
              }}
              transition={{ duration: 1.5, delay: i * 0.3 }}
              className={cn(
                "absolute inset-0 border border-white/10 rounded-3xl liquid-glass flex items-center justify-center overflow-hidden",
                i === 0 ? "z-30 shadow-2xl" : i === 1 ? "z-20" : "z-10"
              )}
              style={{
                width: `${100 - i * 15}%`,
                height: `${100 - i * 15}%`,
              }}
            >
              {i === 0 ? children : (
                <div className="grid grid-cols-12 gap-1 p-8 opacity-10">
                  {Array.from({ length: 144 }).map((_, j) => (
                    <div key={j} className="w-full aspect-square bg-white rounded-full" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
