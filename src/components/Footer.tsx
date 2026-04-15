import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Plane className="text-white w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black tracking-tighter leading-none text-primary">
                  USHAB
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                  Travels & Tour
                </span>
              </div>
            </Link>
            <p className="text-primary/60 text-lg leading-relaxed max-w-md">
              Redefining the art of travel. We create bespoke journeys that inspire, transform, and leave a lasting impact on the soul.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary/40">Company</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Packages', 'Destinations'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-primary/60 hover:text-primary font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary/40">Support</h4>
            <ul className="space-y-4">
              {['Contact', 'Booking', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-primary/60 hover:text-primary font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary/40">Newsletter</h4>
            <p className="text-primary/60 text-sm">Get travel inspiration and exclusive offers.</p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                try {
                  const res = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  if (res.ok) {
                    alert('Subscribed successfully!');
                    (e.target as any).reset();
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="flex gap-2"
            >
              <input 
                required
                name="email"
                type="email" 
                placeholder="Your email" 
                className="bg-primary/5 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary outline-none w-full"
              />
              <button type="submit" className="bg-primary text-white p-3 rounded-xl hover:bg-secondary transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-primary/40 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Ushab Travels and Tour. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-primary/40 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary/40 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
