import React from 'react';
import { motion } from 'motion/react';
import { Plane, Hotel, ShieldCheck, Globe2, Briefcase, Car, CreditCard, Headphones } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Plane, title: 'Flight Booking', desc: 'Domestic and international flight reservations at competitive rates.' },
    { icon: Hotel, title: 'Hotel Reservation', desc: 'Luxury and budget-friendly accommodations worldwide.' },
    { icon: ShieldCheck, title: 'Visa Assistance', desc: 'Expert guidance for visa applications to major global destinations.' },
    { icon: Globe2, title: 'Holiday Packages', desc: 'Curated tour packages for individuals, couples, and families.' },
    { icon: Briefcase, title: 'Corporate Travel', desc: 'Tailored travel solutions for businesses and organizations.' },
    { icon: Car, title: 'Airport Pickup', desc: 'Reliable airport transfers and car rental services.' },
    { icon: CreditCard, title: 'Travel Insurance', desc: 'Comprehensive coverage for your peace of mind while traveling.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer support throughout your journey.' },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block">What We Offer</span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-primary mb-6">
              Premium <span className="text-gradient">Travel Services</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Comprehensive travel solutions designed to make your journey seamless, comfortable, and unforgettable.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <s.icon size={28} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
