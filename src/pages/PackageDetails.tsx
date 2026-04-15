import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, MapPin, Star, CheckCircle2, XCircle, ArrowLeft, Calendar, Users, Shield } from 'lucide-react';
import { PACKAGES } from '../constants';

export default function PackageDetails() {
  const { id } = useParams();
  const pkg = PACKAGES.find(p => p.id === id);

  if (!pkg) return <div className="pt-40 text-center">Package not found</div>;

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/packages" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Packages
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">{pkg.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90 font-medium">
              <div className="flex items-center"><Clock size={20} className="mr-2 text-secondary" /> {pkg.duration}</div>
              <div className="flex items-center"><MapPin size={20} className="mr-2 text-secondary" /> {pkg.destination}</div>
              <div className="flex items-center"><Star size={20} className="mr-2 text-accent" fill="currentColor" /> {pkg.rating} ({pkg.reviews} reviews)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Embark on a journey of a lifetime with our {pkg.title}. This carefully curated experience takes you through the most iconic landmarks and hidden secrets of {pkg.destination}.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map((item) => (
                  <div key={item.day} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold shrink-0">
                        {item.day}
                      </div>
                      <div className="w-0.5 h-full bg-gray-100 my-2" />
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-display font-bold text-primary mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h4 className="text-xl font-display font-bold text-green-800 mb-6 flex items-center">
                  <CheckCircle2 className="mr-2" /> Inclusions
                </h4>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-green-700 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h4 className="text-xl font-display font-bold text-red-800 mb-6 flex items-center">
                  <XCircle className="mr-2" /> Exclusions
                </h4>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-center text-red-700 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-8">
              <div>
                <span className="text-gray-400 text-sm block mb-1">Price per person</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-display font-extrabold text-primary">${pkg.price}</span>
                  <span className="text-gray-400 font-medium">USD</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-2xl flex items-center space-x-4">
                  <Calendar className="text-secondary" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Next Departure</div>
                    <div className="text-sm font-bold text-primary">May 15, 2026</div>
                  </div>
                </div>
                <div className="p-4 bg-surface rounded-2xl flex items-center space-x-4">
                  <Users className="text-secondary" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Group Size</div>
                    <div className="text-sm font-bold text-primary">Max 12 People</div>
                  </div>
                </div>
              </div>

              <Link to={`/booking?package=${pkg.id}`} className="w-full btn-primary py-4 text-center block">
                Book This Trip
              </Link>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                <Shield size={14} className="text-green-500" />
                <span>Secure & Trusted Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
