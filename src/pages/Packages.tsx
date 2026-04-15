import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PACKAGES } from '../constants';
import PackageCard from '../components/PackageCard';

export default function Packages() {
  const [search, setSearch] = useState('');

  const filteredPackages = PACKAGES.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block">Tour Packages</span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-primary">
              Find Your Next <span className="text-gradient">Adventure</span>
            </h1>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-100 focus:border-secondary outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
