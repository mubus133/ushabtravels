import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Plane, Calendar, Globe, MessageCircle, ArrowRight } from 'lucide-react';
import { PACKAGES } from '../constants';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    package: packageId || '',
    date: '',
    returnDate: '',
    travelers: '1',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2348109983573';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const selectedPackage = PACKAGES.find(p => p.id === formData.package);
    const destination = selectedPackage ? selectedPackage.title : 'Custom Destination';

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          destination
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Failed to submit booking inquiry');
      }

      setSubmitted(true);
      
      // Automatically redirect to WhatsApp if number is provided
      if (whatsappNumber) {
        const text = `Hello Ushab Travels! I'm interested in booking a trip.\n\nDestination: ${destination}\nDeparture Date: ${formData.date}\nReturn Date: ${formData.returnDate || 'Not specified'}\nTravelers: ${formData.travelers}\nName: ${formData.name}\nPhone: ${formData.phone}`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        
        // Use location.href instead of window.open to bypass pop-up blockers after async actions
        setTimeout(() => {
          window.location.href = url;
        }, 1500);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openWhatsApp = () => {
    const selectedPackage = PACKAGES.find(p => p.id === formData.package);
    const destination = selectedPackage ? selectedPackage.title : 'Custom Destination';
    
    const text = `Hello Ushab Travels! I'm interested in booking a trip.\n\nDestination: ${destination}\nDeparture Date: ${formData.date}\nReturn Date: ${formData.returnDate}\nTravelers: ${formData.travelers}\nName: ${formData.name}\nPhone: ${formData.phone}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Reservation</span>
          <h1 className="text-6xl md:text-7xl font-black font-display text-primary leading-none mb-8">
            Book Your <br />
            <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-primary/60 text-xl font-light leading-relaxed">
            Fill out the form below and our team will finalize your booking details within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-[4rem] shadow-2xl shadow-primary/5 border border-primary/5 overflow-hidden">
          {submitted ? (
            <div className="p-20 text-center space-y-10">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={56} />
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black font-display text-primary">Inquiry Received!</h2>
                <p className="text-primary/60 max-w-md mx-auto text-lg leading-relaxed">
                  We've received your booking request for <span className="text-primary font-bold">{PACKAGES.find(p => p.id === formData.package)?.title || 'your selected package'}</span>.
                </p>
                <p className="text-secondary font-bold animate-pulse">
                  Redirecting you to WhatsApp to finalize...
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={openWhatsApp}
                  className="btn-accent px-12 py-5 flex items-center justify-center space-x-3"
                >
                  <MessageCircle size={24} />
                  <span>Confirm on WhatsApp</span>
                </button>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="btn-outline px-12 py-5"
                >
                  Make Another Booking
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 bg-primary p-16 text-white space-y-16">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black font-display leading-tight">Why Book <br />With Us?</h3>
                  <p className="text-white/60 font-light">We handle every detail so you can focus on the experience.</p>
                </div>
                <div className="space-y-10">
                  {[
                    { icon: Globe, title: 'Expert Planning', desc: 'Every detail handled by pros.' },
                    { icon: Plane, title: 'Best Rates', desc: 'Guaranteed value for your money.' },
                    { icon: Calendar, title: 'Flexible Dates', desc: 'Easy rescheduling options.' },
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="lg:col-span-8 p-16 space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
                    {error}
                  </div>
                )}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Select Package</label>
                  <select 
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none font-bold text-primary"
                  >
                    <option value="">Choose a package...</option>
                    {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Departure Date</label>
                    <input 
                      required 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Return Date (Optional)</label>
                    <input 
                      type="date" 
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Travelers</label>
                    <input 
                      required 
                      type="number" 
                      name="travelers"
                      min="1" 
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Email</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com" 
                      className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Phone</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 ..." 
                      className="w-full px-8 py-5 rounded-3xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all font-bold text-primary" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-6 text-xl flex items-center justify-center space-x-4 disabled:opacity-50"
                >
                  <span>{loading ? 'Processing...' : 'Confirm Booking Inquiry'}</span>
                  {!loading && <ArrowRight size={24} />}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
