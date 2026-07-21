/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Home, DollarSign, Bed, ChevronRight, Play, Compass } from 'lucide-react';
import { SearchFilters } from '../types';

// Import generated luxury real estate images for background slideshow
import luxuryWhiteVilla from '../assets/images/luxury_white_villa_1784591544837.jpg';
import luxuryDuskVilla from '../assets/images/luxury_dusk_villa_1784591560608.jpg';
import minimalistDarkMansion from '../assets/images/minimalist_dark_mansion_1784591603860.jpg';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
  onExploreClick: () => void;
  onScheduleClick: () => void;
}

const BACKGROUND_IMAGES = [
  luxuryWhiteVilla,
  luxuryDuskVilla,
  minimalistDarkMansion
];

export default function Hero({ onSearch, onExploreClick, onScheduleClick }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);
  
  // Search bar input state
  const [location, setLocation] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [budgetRange, setBudgetRange] = useState('All');
  const [bedrooms, setBedrooms] = useState('All');

  // Slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      propertyType,
      budgetRange,
      bedrooms
    });
    // Scroll down to properties after clicking search
    onExploreClick();
  };

  return (
    <div id="hero-section" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden bg-slate-900">
      
      {/* Background Slideshow with Cross-Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={bgIndex}
            src={BACKGROUND_IMAGES[bgIndex]}
            alt="Luxury Architecture"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Gradients blending with architectural aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] dark:from-slate-900 via-slate-900/40 to-slate-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-10 flex-1 flex flex-col justify-center items-center">
        
        {/* Little badge info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-display font-medium tracking-widest uppercase shadow-md"
        >
          <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '30s' }} />
          <span>WEST AFRICA’S PREMIER REAL ESTATE CONCIERGE</span>
        </motion.div>

        {/* Large Headline & subtext */}
        <div className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-7xl font-light text-white tracking-tight leading-[1.1] text-balance"
          >
            Find Luxury <br />
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300">
              Beyond Expectations
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-200 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
          >
            Discover premium waterfront villas, soaring skylines, and bespoke penthouses meticulously curated across Lekki, Ikoyi, and Banana Island.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wider uppercase shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore Properties</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onScheduleClick}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs tracking-wider uppercase border border-white/30 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Schedule Viewing</span>
          </button>
        </motion.div>

        {/* Premium Property Search Bar */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-4xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-2xl md:rounded-full p-4 md:p-3 border border-white/50 dark:border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-left"
        >
          {/* Location field */}
          <div className="px-4 border-r border-slate-200/60 dark:border-slate-800 last:border-0 py-1.5 md:py-0">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Location</span>
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-slate-800 dark:text-slate-100 text-xs font-semibold mt-1 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Locations</option>
              <option value="Lekki" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Lekki</option>
              <option value="Ikoyi" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Ikoyi</option>
              <option value="Victoria Island" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Victoria Island</option>
              <option value="Banana Island" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Banana Island</option>
              <option value="Abuja" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Abuja</option>
            </select>
          </div>

          {/* Property Type field */}
          <div className="px-4 border-r border-slate-200/60 dark:border-slate-800 last:border-0 py-1.5 md:py-0">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5 text-emerald-500" />
              <span>Type</span>
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-slate-800 dark:text-slate-100 text-xs font-semibold mt-1 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Types</option>
              <option value="Villa" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Villa</option>
              <option value="Penthouse" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Penthouse</option>
              <option value="Duplex" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Duplex</option>
              <option value="Mansion" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Mansion</option>
              <option value="Apartment" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Apartment</option>
              <option value="Townhouse" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Townhouse</option>
            </select>
          </div>

          {/* Budget Range field */}
          <div className="px-4 border-r border-slate-200/60 dark:border-slate-800 last:border-0 py-1.5 md:py-0">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              <span>Budget</span>
            </div>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full text-slate-800 dark:text-slate-100 text-xs font-semibold mt-1 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Budgets</option>
              <option value="under-600" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Under ₦600M</option>
              <option value="600-1200" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">₦600M - ₦1.2B</option>
              <option value="above-1200" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">₦1.2B +</option>
            </select>
          </div>

          {/* Bedrooms field */}
          <div className="px-4 border-r border-slate-200/60 dark:border-slate-800 last:border-0 py-1.5 md:py-0">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <Bed className="w-3.5 h-3.5 text-coral animate-pulse" />
              <span>Bedrooms</span>
            </div>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full text-slate-800 dark:text-slate-100 text-xs font-semibold mt-1 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Any Size</option>
              <option value="3" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">3+ Bedrooms</option>
              <option value="4" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">4+ Bedrooms</option>
              <option value="5" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">5+ Bedrooms</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="px-3">
            <button
              type="submit"
              className="w-full py-3 md:py-3 px-6 rounded-xl md:rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </motion.form>

      </div>

      {/* Decorative Wave Transition Layer at base */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F8F9FA] dark:from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
}
