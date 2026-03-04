import React from 'react';
import { motion } from 'motion/react';

export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-8 xl:gap-16 items-center z-10">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="xl:col-span-7 flex flex-col items-start text-left space-y-10"
                >

                    <h1>
                        ARTUROOOO
                    </h1>

                    <p className="text-lg md:text-xl font-light tracking-tight text-black/60 max-w-lg border-l-2 border-black/10 pl-6 py-2 leading-relaxed">
                        Gradute Student at University of Texas at El Paso
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-8 pt-4 w-full sm:w-auto">
                        <a
                            href="/contact"
                            className="text-xs font-bold uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors flex items-center gap-2"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="xl:col-span-5 relative w-full aspect-[4/5] sm:aspect-square xl:aspect-[3/4] rounded-[2rem] overflow-hidden bg-black/5 shadow-2xl"
                >
                    {/* Using a fluid/abstract image that matches the portfolio's aesthetics */}
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
                        alt="Abstract Liquid Glass"
                        className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
                    />
                    {/* Subtle gradient overlay for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-white/90 font-serif italic text-2xl md:text-3xl leading-snug">
                            "FOTO COOL AQUI"
                        </p>
                    </div>
                </motion.div>

            </div>

            <motion.div
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] opacity-40 -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 50, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] opacity-30 -z-10"
            />

        </section>
    );
}
