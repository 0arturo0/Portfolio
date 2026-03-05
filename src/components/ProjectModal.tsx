/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    folderName?: string;
}

// Statically analyze all images in the Pictures folder at build time
const imageModules = import.meta.glob('/src/Pictures/**/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', { eager: true, import: 'default' }) as Record<string, string>;

export default function ProjectModal({ isOpen, onClose, folderName }: ProjectModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter images based on the active project's folderName
    const projectImages = React.useMemo(() => {
        if (!folderName) return [];

        const folderPath = `/src/Pictures/${folderName}/`;

        return Object.entries(imageModules)
            .filter(([path]) => path.startsWith(folderPath))
            .map(([_, url]) => url);
    }, [folderName]);

    // Reset index and block scrolling when opening a new project
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % projectImages.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                >
                    <X className="w-6 h-6" />
                </button>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative max-w-6xl w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {projectImages.length > 0 ? (
                        <>
                            <img
                                key={currentIndex}
                                src={projectImages[currentIndex]}
                                alt={`Project detail ${currentIndex + 1}`}
                                className="w-full h-full object-contain"
                            />

                            {projectImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm tracking-widest font-mono">
                                        {currentIndex + 1} / {projectImages.length}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-white/50 space-y-4">
                            <ImageIcon className="w-16 h-16 opacity-20" />
                            <p className="tracking-widest font-mono text-sm uppercase">No images found for this project</p>
                            <p className="text-xs opacity-50">Add images to src/Pictures/{folderName}</p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
