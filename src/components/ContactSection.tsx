/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, PhoneCall, Mail, MessageCircle, Calendar, ShieldCheck, Check, Globe } from 'lucide-react';

interface ContactSectionProps {
  onScheduleInspectionClick: () => void;
  onSubmitDocket?: (docket: { name: string; email: string; phone: string; budget: string; notes: string }) => void;
}

export default function ContactSection({ onScheduleInspectionClick, onSubmitDocket }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('600-1200');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    
    if (onSubmitDocket) {
      onSubmitDocket({
        name,
        email,
        phone,
        budget,
        notes
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
    }, 4000);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Prestige Homes concierge team, I would like to schedule an inspection. My name is ${name || 'Valued Client'} and my budget index is approx ${budget === 'under-600' ? 'under ₦600M' : budget === '600-1200' ? '₦600M - ₦1.2B' : '₦1.2B+'}. Please coordinate our portfolio review.`
    );
    return `https://wa.me/2348129382695?text=${text}`;
  };

  return (
    <section id="contact-and-inspection-hub" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      
      {/* Soft background highlights */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Layout Grid: Form on left, information & map placeholder on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Elite Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-3xl p-8 md:p-10 shadow-lg space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-semibold">PORTFOLIO ENQUIRY</span>
              <h3 className="font-display text-2xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Acquire Your Masterwork
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-light max-w-md leading-relaxed">
                Provide your contact details and investment thresholds below. An in-house executive council representative will file and response coordinate within minutes.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-500/20 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow shadow-emerald-500/20">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-emerald-800 dark:text-emerald-300 text-base">Briefing Docket Filed</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed max-w-sm mx-auto">
                  Your luxury profile docket was encrypted and securely transmitted. One of our trusted agents will phone or email you directly to arrange an exclusive chauffeur collection.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">CLIENT NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kolawole Adesina"
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">SECURE CONTACT PHONE</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234..."
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">INVESTMENT THRESHOLD</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="under-600">Under ₦600 Million</option>
                      <option value="600-1200">₦600M - ₦1.2 Billion</option>
                      <option value="above-1200">₦1.2B+ Billion (Elite Status)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Bespoke Architectural / Security Notes</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe specific preferences (e.g. smart-home yacht jetty, double-gate security level, infinity lagoon sunset, private chef kitchen)..."
                    className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>File Encrypted Docket</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Side: Maps Placeholder & Direct lines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact info cards */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-850 shadow flex flex-col gap-5">
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Prestige Concierge Lines</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">BOARD OFFICE PHONE</span>
                    <a href="tel:+2348129382695" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all font-medium text-[11px] uppercase tracking-wider">
                      <span>Call Concierge</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">ENQUIRIES INTAKE</span>
                    <a href="mailto:sylvestermishael@gmail.com" className="text-slate-800 dark:text-slate-200 font-semibold font-display text-sm hover:text-emerald-600 transition-colors">
                      sylvestermishael@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">GLOBAL ROADSHOW</span>
                    <span className="block text-slate-800 dark:text-slate-200 font-semibold font-display text-sm">
                      Lagos Core • Abuja • London Mayfair
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />
              
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>NDA & Client Privacy Guaranteed.</span>
              </div>
            </div>

            {/* Interactive Google Map Placeholder */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-850 shadow space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-800 dark:text-white">Lagos Head Office Hub</h4>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>KINGS CROSS ROAD, IKOYI</span>
                </span>
              </div>

              <div className="relative h-[200px] rounded-2xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-800 flex items-center justify-center">
                {/* Visual architectural blueprint map details */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* SVG architectural vectors */}
                <svg className="absolute inset-0 w-full h-full text-slate-600" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid layout represent roadways of Ikoyi */}
                  <line x1="10" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="120" x2="380" y2="120" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="180" x2="350" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  
                  <line x1="100" y1="10" x2="100" y2="210" stroke="currentColor" strokeWidth="2" />
                  <line x1="240" y1="10" x2="240" y2="210" stroke="currentColor" strokeWidth="2" />
                  <line x1="310" y1="10" x2="310" y2="210" stroke="currentColor" strokeWidth="1" />
                  
                  {/* Water inlet represent lagoons */}
                  <path d="M-10,30 Q90,5 210,40 T380,-10" fill="none" stroke="#2563EB" strokeWidth="3" className="opacity-40" />
                </svg>

                {/* Pulsating Map pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping absolute" />
                  <div className="w-5 h-5 bg-blue-600 rounded-full relative border-2 border-white shadow-lg flex items-center justify-center text-[9px] font-bold text-white font-mono">
                    P
                  </div>
                  <span className="mt-2 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-white uppercase tracking-widest shadow">
                    Prestige Headquarters
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
