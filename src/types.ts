import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ProjectCategory = 'mobile' | 'website' | 'ml-ai';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  bgColor: string;
  image: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  // Mobile Projects
  {
    id: 'm1',
    title: 'EcoTrack',
    description: 'Real-time carbon footprint monitoring with personalized sustainability goals.',
    category: 'mobile',
    bgColor: '#7f1d1d', // Dark Red
    image: 'https://picsum.photos/seed/m1/800/1600',
    tags: ['React Native', 'Firebase']
  },
  {
    id: 'm2',
    title: 'FitSync',
    description: 'Biometric health tracking with AI-powered workout recommendations.',
    category: 'mobile',
    bgColor: '#1e3a8a', // Dark Blue
    image: 'https://picsum.photos/seed/m2/800/1600',
    tags: ['Flutter', 'HealthKit']
  },
  {
    id: 'm3',
    title: 'ZenSpace',
    description: 'Mindfulness and meditation app with spatial audio experiences.',
    category: 'mobile',
    bgColor: '#064e3b', // Dark Green
    image: 'https://picsum.photos/seed/m3/800/1600',
    tags: ['SwiftUI', 'CoreAudio']
  },
  // Website Projects
  {
    id: 'w1',
    title: 'Luxe Global',
    description: 'High-end e-commerce platform with immersive 3D product visualization.',
    category: 'website',
    bgColor: '#450a0a', // Deep Red
    image: 'https://picsum.photos/seed/w1/1600/900',
    tags: ['Next.js', 'Three.js']
  },
  {
    id: 'w2',
    title: 'Nexus Cloud',
    description: 'Enterprise-grade cloud management dashboard with real-time analytics.',
    category: 'website',
    bgColor: '#172554', // Deep Blue
    image: 'https://picsum.photos/seed/w2/1600/900',
    tags: ['React', 'D3.js']
  },
  {
    id: 'w3',
    title: 'Aura Design',
    description: 'Interactive design agency portfolio with fluid liquid-glass aesthetics.',
    category: 'website',
    bgColor: '#022c22', // Deep Green
    image: 'https://picsum.photos/seed/w3/1600/900',
    tags: ['Vite', 'GSAP']
  },
  // AI Projects (CNN Layers)
  {
    id: 'a1',
    title: 'Vision Core',
    description: 'Input Layer: Real-time image preprocessing and feature extraction.',
    category: 'ml-ai',
    bgColor: '#422006', // Deep Brown/Orange
    image: 'https://picsum.photos/seed/a1/1200/800',
    tags: ['PyTorch', 'CUDA']
  },
  {
    id: 'a2',
    title: 'Deep Logic',
    description: 'Hidden Layer: Complex pattern recognition and semantic understanding.',
    category: 'ml-ai',
    bgColor: '#312e81', // Deep Indigo
    image: 'https://picsum.photos/seed/a2/1200/800',
    tags: ['TensorFlow', 'Keras']
  },
  {
    id: 'a3',
    title: 'Final Node',
    description: 'Output Layer: Predictive analysis and decision-making synthesis.',
    category: 'ml-ai',
    bgColor: '#1e1b4b', // Deep Purple
    image: 'https://picsum.photos/seed/a3/1200/800',
    tags: ['Scikit-learn', 'FastAPI']
  }
];
