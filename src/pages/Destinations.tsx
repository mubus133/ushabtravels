import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                         dest.country.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Global Exploration</span>
          <h1 className="text-6xl md:text-8xl font-black leading-none font-display mb-8">
            Curated <br />
            <span className="text-gradient">Destinations</span>
          </h1>
          <p className="text-primary/60 text-xl font-light leading-relaxed">
            From the serene beaches of the Maldives to the bustling streets of Tokyo, we've handpicked the world's most extraordinary locations for your next escape.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', 'Beach', 'City', 'Nature', 'Culture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "bg-primary/5 text-primary/60 hover:bg-primary/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={20} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-primary/5 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/5"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-8 right-8">
                <span className="px-4 py-2 glass-morphism rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest">
                  {dest.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="flex items-center text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  <MapPin size={12} className="mr-2" />
                  {dest.country}
                </div>
                <h3 className="text-4xl font-black text-white mb-4 font-display">
                  {dest.name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-8 font-light leading-relaxed">
                  {dest.description}
                </p>
                <Link to="/packages" className="inline-flex items-center text-white font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors">
                  View Packages <ArrowRight size={18} className="ml-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/20">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-primary">No destinations found</h3>
            <p className="text-primary/40 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
