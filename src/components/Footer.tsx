/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, Facebook, Twitter, Linkedin, Send, 
  Sparkles, ShieldCheck, Compass, Mail, ChevronRight 
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer id="prestige-footer-section" className="bg-slate-950 text-slate-400 relative overflow-hidden pt-20">
      
      {/* Wave Transition Top Symmetrical SVG Divider */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#F8F9FA] dark:bg-slate-900 pointer-events-none transition-colors duration-300">
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-12 text-slate-950 fill-current" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,48C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Col 1: Corporate Profile (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-full bg-blue-500/10 border border-blue-500/25">
              <Compass className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <span className="font-display tracking-widest text-sm font-semibold uppercase text-white">PRESTIGE HOMES</span>
          </div>

          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-sm">
            Prestige Homes is Nigeria’s ultimate destination for ultra-luxury residential assets. Our firm combines vetted architectural surveying with secure capital investment structures.
          </p>

          <div className="space-y-2 text-xs text-slate-300 font-light">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a href="mailto:sylvestermishael@gmail.com" className="hover:text-white transition-colors font-mono">
                sylvestermishael@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20 px-1 rounded bg-emerald-500/5">WhatsApp</span>
              <a href="https://wa.me/2348129382695" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all font-medium text-[11px] uppercase tracking-wider">
                <span>Start Chat</span>
              </a>
            </div>
          </div>

          {/* Social Icons row */}
          <div className="flex gap-4">
            <a href="#instagram" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#linkedin" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#twitter" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#facebook" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Neighborhood links (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-display text-white text-xs font-semibold tracking-wider uppercase">Neighborhoods</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><a href="#/map" className="hover:text-white transition-colors flex items-center gap-1"><span>Old Ikoyi Core</span></a></li>
            <li><a href="#/map" className="hover:text-white transition-colors flex items-center gap-1"><span>Lekki Peninsula</span></a></li>
            <li><a href="#/map" className="hover:text-white transition-colors flex items-center gap-1"><span>Banana Island Estate</span></a></li>
            <li><a href="#/map" className="hover:text-white transition-colors flex items-center gap-1"><span>Victoria Island Hub</span></a></li>
            <li><a href="#/map" className="hover:text-white transition-colors flex items-center gap-1"><span>Maitama, Abuja</span></a></li>
          </ul>
        </div>

        {/* Col 3: Signature Portfolios (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-display text-white text-xs font-semibold tracking-wider uppercase">Portfolios</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><a href="#/catalog" className="hover:text-white transition-colors">Waterfront Villas</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Skyline Penthouses</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Gated Smart Duplexes</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Sovereign Mansions</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Vetted Acreage</a></li>
            <li className="pt-2 border-t border-white/5">
              <a href="#/earth" className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 font-medium">
                <span>Return to Orbit</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Briefing Sign-up (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-display text-white text-xs font-semibold tracking-wider uppercase">Prestige Intelligence</h4>
          <p className="text-slate-400 text-xs font-light leading-relaxed">
            Subscribe to our confidential weekly intelligence bulletin detailing new off-market properties and sovereign investment indexes.
          </p>

          {subscribed ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Intelligence Docket Subscribed</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail coordinates..."
                className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-600"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer flex items-center justify-center shadow shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

      <hr className="border-white/5 opacity-80" />

      {/* Footer copyright bottom */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>ESTABLISHED 2011 • REAL-TIME AUDIT INDEX: COMPLIANT</span>
        </div>
        <span>© 2026 PRESTIGE HOMES INTERNATIONAL. ALL RIGHTS ENCRYPTED.</span>
      </div>

    </footer>
  );
}
