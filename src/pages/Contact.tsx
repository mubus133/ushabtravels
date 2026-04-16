import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2348109983573';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Failed to send message');
      }

      setSubmitted(true);
      
      // Automatically redirect to WhatsApp if number is provided
      if (whatsappNumber) {
        const text = `Hello Ushab Travels! I just submitted a contact form.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        
        // Use window.open to avoid iframe "refused to connect" errors
        setTimeout(() => {
          window.open(url, '_blank');
        }, 1000);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openWhatsApp = () => {
    const text = `Hello Ushab Travels! I just submitted a contact form.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-black font-display text-primary mb-6">
              Contact <span className="text-gradient">Ushab Travels</span>
            </h1>
            <p className="text-primary/60 text-lg">
              Have questions about a destination or need help with your booking? Our travel experts are here to assist you 24/7.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-primary/5 space-y-8">
              <h3 className="text-2xl font-black font-display text-primary">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Call Us', detail: '+234 810 998 3573', sub: 'Mon-Sun, 24/7' },
                  { icon: Mail, title: 'Email Us', detail: 'ushabcreations4@gmail.com', sub: 'Online support 24/7' },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-primary">{item.title}</h4>
                      <p className="text-primary/60">{item.detail}</p>
                      <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/5 border border-primary/5 relative overflow-hidden">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black font-display text-primary">Message Sent!</h3>
                    <p className="text-primary/60 text-lg">We've received your email. For an even faster response, you can also confirm your message on WhatsApp.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={openWhatsApp}
                      className="btn-accent px-8 py-4 flex items-center justify-center space-x-3"
                    >
                      <MessageCircle size={24} />
                      <span>Confirm on WhatsApp</span>
                    </button>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="btn-outline px-8 py-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 ..." 
                        className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">How can we help?</label>
                    <textarea 
                      required 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6} 
                      placeholder="Tell us about your travel plans..." 
                      className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-0 focus:ring-2 focus:ring-secondary outline-none resize-none transition-all"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full btn-primary py-6 text-lg flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    {!loading && <Send size={20} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
