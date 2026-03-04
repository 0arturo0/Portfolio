import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, Send } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column: Intro & Socials */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-5xl font-serif font-bold tracking-tight text-black">
                Contact Me
              </h2>
              <p className="text-xl text-black/60 leading-relaxed max-w-lg">
                Software Engineer with a background in Computer Science and a Master's in Artificial Intelligence, With experience in full-stack development and AI
              </p>
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-20">Connect</h3>
              <div className="flex flex-col space-y-4">
                <SocialLink icon={<Mail className="w-5 h-5" />} label="arturofh01@gmail.com" href="mailto:arturofh01@gmail.com" />
                <SocialLink icon={<Github className="w-5 h-5" />} label="https://github.com/0arturo0" href="https://github.com/0arturo0" />
                <SocialLink icon={<Linkedin className="w-5 h-5" />} label="https://www.linkedin.com/in/arturof01/" href="https://www.linkedin.com/in/arturof01/" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-black/5 p-8 md:p-12 rounded-[2.5rem] border border-black/5"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 ml-4">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Arturo Kanguro"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white rounded-2xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 ml-4">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="arturo@example.com"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white rounded-2xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 ml-4">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-6 py-4 bg-white rounded-2xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/20 transition-all resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-zinc-900 transition-all disabled:opacity-50 border border-black hover:border-orange-500/30 shadow-xl shadow-black/10"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSent ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center space-x-4 group text-black/70 hover:text-black transition-colors"
    >
      <span className="p-3 rounded-full bg-white border border-black/5 group-hover:bg-black group-hover:text-white group-hover:border-orange-500/30 group-hover:ring-4 group-hover:ring-orange-500/5 transition-all duration-300">
        {icon}
      </span>
      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">{label}</span>
    </a>
  );
}
