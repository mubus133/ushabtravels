import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plane, Phone, Globe, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Packages', href: '/packages' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl',
        isScrolled ? 'top-4' : 'top-6'
      )}
    >
      <div className={cn(
        "rounded-[2rem] px-6 py-4 transition-all duration-500 flex items-center justify-between",
        isScrolled ? "glass-morphism shadow-2xl py-3" : "bg-white/50 backdrop-blur-sm border border-white/20"
      )}>
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Plane className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-black tracking-tighter leading-none text-primary">
              USHAB
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
              Travels & Tour
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-primary/5 rounded-2xl p-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl',
                location.pathname === link.href
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-primary/60 hover:text-primary'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/booking" className="btn-primary py-3 px-8 text-xs">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-0 right-0 glass-morphism rounded-[2.5rem] p-6 shadow-2xl md:hidden"
          >
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'block px-6 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all',
                    location.pathname === link.href
                      ? 'bg-primary text-white'
                      : 'text-primary hover:bg-primary/5'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/booking"
                  className="block w-full text-center btn-primary"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
