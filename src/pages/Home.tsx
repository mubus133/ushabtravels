import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Compass, MapPin, Plane } from 'lucide-react';
import { DESTINATIONS, PACKAGES } from '../constants';
import PackageCard from '../components/PackageCard';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Immersive Editorial Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506929199175-6000c6506dbc?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 glass-morphism rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Premium Travel Experiences
            </span>
            <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase font-display">
              Escape <br />
              <span className="text-secondary">Ordinary</span>
            </h1>
            <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Curated journeys for the modern explorer. Discover hidden gems and luxury destinations across the globe.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/packages" className="btn-accent px-12 py-5 text-base">
                Explore Packages
              </Link>
              <Link to="/booking" className="btn-primary bg-white text-primary hover:bg-white/90 px-12 py-5 text-base">
                Plan Your Trip
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 hidden md:block">
          <div className="glass-morphism rounded-[2.5rem] p-8 grid grid-cols-4 gap-8">
            {[
              { label: 'Destinations', value: '50+' },
              { label: 'Happy Travelers', value: '10k+' },
              { label: 'Expert Guides', value: '100+' },
              { label: 'Success Rate', value: '99%' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center border-r border-white/10 last:border-0">
                <div className="text-3xl font-display font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations - Modern Grid */}
      <section className="section-padding max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Curated Selection</span>
            <h2 className="text-5xl md:text-7xl font-black leading-none font-display">
              Where to <br />
              <span className="text-gradient">Next?</span>
            </h2>
          </div>
          <Link to="/destinations" className="btn-outline group">
            View All Destinations
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
          {DESTINATIONS.slice(0, 3).map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative rounded-[3rem] overflow-hidden shadow-2xl",
                idx === 0 ? "md:col-span-7" : "md:col-span-5"
              )}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                  <MapPin size={14} className="mr-2" />
                  {dest.country}
                </div>
                <h3 className="text-4xl font-black text-white mb-4 font-display">{dest.name}</h3>
                <Link to="/packages" className="inline-flex items-center text-white/70 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">
                  Explore Packages <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Bento Grid Style */}
      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Ushab Advantage</span>
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-display">Why Travel With Us?</h2>
            <p className="text-primary/60 text-lg">We don't just book trips; we craft life-changing experiences with obsessive attention to detail.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Global Network",
                desc: "Access to exclusive locations and experiences that aren't available to the general public."
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Safe & Secure",
                desc: "Your safety is our priority. We partner only with verified, high-end service providers."
              },
              {
                icon: <Compass className="w-10 h-10" />,
                title: "Expert Guidance",
                desc: "Our local experts provide deep insights and handle every detail of your journey."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl shadow-primary/5 border border-primary/5"
              >
                <div className="text-secondary mb-8">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-4 font-display">{feature.title}</h3>
                <p className="text-primary/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="section-padding max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Trending Now</span>
            <h2 className="text-5xl md:text-6xl font-black font-display">Popular Packages</h2>
          </div>
          <Link to="/packages" className="btn-primary">
            View All Packages
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* CTA Section - Bold & High Contrast */}
      <section className="section-padding px-4">
        <div className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden bg-primary py-24 px-8 md:px-20 text-center">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
              alt="CTA bg"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight font-display">
              Ready for your <br />
              <span className="text-secondary">next adventure?</span>
            </h2>
            <p className="text-white/70 text-xl mb-12 font-light">
              Join thousands of happy travelers and start planning your dream vacation today.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link to="/booking" className="btn-accent px-16 py-6 text-lg w-full md:w-auto">
                Book Your Trip
              </Link>
              <Link to="/contact" className="btn-outline border-white/20 text-white hover:bg-white/10 px-16 py-6 text-lg w-full md:w-auto">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
