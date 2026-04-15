import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Globe, Shield, Heart, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-primary mb-6 leading-tight">
              Redefining the <br />
              <span className="text-gradient">Travel Experience</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Founded in 2015, Ushab Travels and Tour has grown from a boutique agency to Nigeria's most trusted travel partner. We believe that travel is not just about visiting new places, but about creating memories that last a lifetime.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-display font-extrabold text-primary mb-1">10+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-display font-extrabold text-primary mb-1">50k+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Happy Clients</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
              alt="Our Team"
              className="rounded-[40px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white">
                  <Award size={20} />
                </div>
                <span className="font-bold text-primary">Award Winning Agency</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="bg-primary rounded-[40px] p-12 md:p-20 text-white mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">Our Core Values</h2>
            <p className="text-white/60">The principles that guide every journey we curate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Integrity', desc: 'We operate with absolute transparency and honesty in all our dealings.' },
              { icon: Heart, title: 'Passion', desc: 'We are passionate about travel and dedicated to sharing that love with you.' },
              { icon: Globe, title: 'Excellence', desc: 'We strive for perfection in every detail of your travel itinerary.' },
            ].map((v, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-secondary">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold">{v.title}</h3>
                <p className="text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
