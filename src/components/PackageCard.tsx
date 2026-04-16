import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TourPackage } from '../constants';

interface PackageCardProps {
  pkg: TourPackage;
  key?: string | number;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-primary/5"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 glass-morphism rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest">
            {pkg.duration}
          </span>
        </div>
        <div className="absolute top-6 right-6">
          <div className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors cursor-pointer">
            <Heart size={18} />
          </div>
        </div>
      </div>

      <div className="p-10 space-y-6">
        <div>
          <div className="flex items-center text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <MapPin size={12} className="mr-2" />
            {pkg.destination}
          </div>
          <h3 className="text-2xl font-display font-black text-primary group-hover:text-secondary transition-colors leading-tight">
            {pkg.title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-primary/5">
          <Link
            to={`/packages/${pkg.id}`}
            className="flex-grow btn-primary py-4 text-center rounded-2xl font-bold flex items-center justify-center group/btn"
          >
            Book Now
            <ArrowRight size={18} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
