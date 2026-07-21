/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Compass, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES } from '../data';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
}

interface MapLocation {
  id: string;
  name: 'Lekki' | 'Ikoyi' | 'Victoria Island' | 'Banana Island' | 'Abuja';
  displayName: string;
  x: number; // percentage from left
  y: number; // percentage from top
  description: string;
  averagePrice: string;
}

const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'loc-abuja',
    name: 'Abuja',
    displayName: 'Abuja Capital District',
    x: 68,
    y: 35,
    description: 'Federal capital city center, Maitama & Wuse II luxury corridors.',
    averagePrice: '₦420M'
  },
  {
    id: 'loc-banana',
    name: 'Banana Island',
    displayName: 'Banana Island Estate',
    x: 38,
    y: 65,
    description: 'Nigeria’s most exclusive private island, home to billionaires.',
    averagePrice: '₦2.5B'
  },
  {
    id: 'loc-ikoyi',
    name: 'Ikoyi',
    displayName: 'Old Ikoyi Core',
    x: 33,
    y: 72,
    description: 'Stately colonial-era tree-lined avenues with ultra-modern high-rises.',
    averagePrice: '₦1.2B'
  },
  {
    id: 'loc-vi',
    name: 'Victoria Island',
    displayName: 'Victoria Island Central',
    x: 28,
    y: 80,
    description: 'Financial hub combining luxury beachside apartments and tech corridors.',
    averagePrice: '₦670M'
  },
  {
    id: 'loc-lekki',
    name: 'Lekki',
    displayName: 'Lekki Peninsula',
    x: 46,
    y: 78,
    description: 'Rapidly expanding premium coastal peninsula with elite waterfront estates.',
    averagePrice: '₦715M'
  }
];

export default function InteractiveMap({ properties, onSelectProperty, selectedLocation, onLocationSelect }: InteractiveMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);

  const handleLocationClick = (locName: string) => {
    onLocationSelect(selectedLocation === locName ? 'All' : locName);
  };

  // Filter properties based on map click
  const mapFilteredProperties = properties.filter(p => {
    if (selectedLocation === 'All') return p.featured; // show featured in map view if none selected
    return p.location === selectedLocation;
  });

  const activeLocInfo = MAP_LOCATIONS.find(l => l.name === selectedLocation);

  return (
    <section id="interactive-map-section" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title and Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 dark:bg-blue-950/25 dark:border-blue-500/20 dark:text-blue-400 text-xs font-display font-medium tracking-wide">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
              <span>GEOGRAPHICAL INVESTMENTS</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              Interactive <span className="font-semibold text-blue-600">Location Radar</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl font-light text-sm md:text-base leading-relaxed">
              Explore elite Nigerian real estate hubs. Click on map hot spots to instantly filter listings, view average investment values, and explore neighborhood dynamics.
            </p>
          </div>
          
          {/* Location Fast Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onLocationSelect('All')}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                selectedLocation === 'All'
                  ? 'bg-blue-600 border-blue-600 text-white shadow shadow-blue-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Locations
            </button>
            {MAP_LOCATIONS.map(loc => (
              <button
                key={loc.id}
                onClick={() => handleLocationClick(loc.name)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  selectedLocation === loc.name
                    ? 'bg-blue-600 border-blue-600 text-white shadow shadow-blue-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Grid: Map left, filtered properties right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Premium Vector Map (8 cols) */}
          <div className="lg:col-span-7 bg-[#F1F5F9] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative min-h-[400px] md:min-h-[500px] overflow-hidden group">
            
            {/* Soft decorative background details */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400 dark:text-slate-500 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>SATELLITE HYBRID TOPOGRAPHY MODEL</span>
            </div>

            {/* Premium Vector SVG Outline representing Nigeria / Lagos core */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none select-none">
              <svg viewBox="0 0 500 400" className="w-full h-full text-slate-300 stroke-slate-200 dark:text-slate-800 dark:stroke-slate-800 stroke-2 fill-none opacity-80" xmlns="http://www.w3.org/2000/svg">
                {/* stylized Nigeria coastline */}
                <path d="M50,380 Q100,350 200,340 T350,330 T450,350" fill="none" strokeWidth="3" />
                {/* Lagos Lagoon details */}
                <path d="M120,335 Q180,310 240,320 T300,335" fill="none" strokeWidth="2" strokeDasharray="5 5" />
                {/* stylized Niger/Benue river connection to delta */}
                <path d="M220,10 L250,150 L200,300 L210,340" fill="none" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M250,150 L380,220 L420,330" fill="none" strokeWidth="1" strokeDasharray="3 3" />
                {/* Nigeria regional borders (minimal tech look) */}
                <circle cx="250" cy="200" r="180" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="1" />
                <circle cx="250" cy="200" r="240" stroke="rgba(203, 213, 225, 0.2)" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Interactive Hotspots Layer */}
            <div className="absolute inset-0">
              {MAP_LOCATIONS.map(loc => {
                const isActive = selectedLocation === loc.name;
                const isHovered = hoveredLocation?.id === loc.id;
                
                return (
                  <div
                    key={loc.id}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                    onClick={() => handleLocationClick(loc.name)}
                    onMouseEnter={() => setHoveredLocation(loc)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  >
                    {/* Ring ping animations */}
                    <div className={`absolute w-10 h-10 -left-5 -top-5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-blue-500/20 scale-125 animate-ping' : 'bg-slate-400/10 hover:bg-blue-400/10 scale-90'
                    }`} />
                    
                    {/* Main PIN dot */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive 
                        ? 'bg-blue-600 border-white scale-125 shadow-lg shadow-blue-500/40' 
                        : 'bg-white border-slate-400 dark:bg-slate-900 dark:border-slate-700 hover:border-blue-500 hover:scale-110 shadow'
                    }`}>
                      <MapPin className={`w-3 h-3 ${isActive ? 'text-white' : 'text-slate-500 hover:text-blue-500'}`} />
                    </div>

                    {/* Styled Mini Label */}
                    <div className={`absolute left-6 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white font-display text-[10px] font-semibold uppercase tracking-wider shadow pointer-events-none transition-all ${
                      isActive ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 -translate-x-2 group-hover:opacity-60'
                    }`}>
                      {loc.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Card Overlay for Hover state */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                {(hoveredLocation || activeLocInfo) ? (
                  <motion.div
                    key={(hoveredLocation || activeLocInfo)!.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl text-white shadow-xl pointer-events-auto"
                  >
                    <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-semibold">NEIGHBORHOOD INSIGHT</span>
                    <h4 className="font-display font-bold text-base mt-1 text-white">{(hoveredLocation || activeLocInfo)!.displayName}</h4>
                    <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">{(hoveredLocation || activeLocInfo)!.description}</p>
                    <div className="mt-3 flex justify-between items-center bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-700/50">
                      <span className="text-[10px] text-slate-400 font-mono">EST. INDEX PRICE</span>
                      <span className="text-xs font-semibold text-emerald-400">{(hoveredLocation || activeLocInfo)!.averagePrice}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-50 border border-slate-200/80 dark:bg-slate-950 dark:border-slate-850 p-4 rounded-2xl text-slate-500 dark:text-slate-400 shadow-sm text-xs font-light"
                  >
                    💡 Hover or click a map hotspot pin to unlock premium development insights, island dynamics, and pricing indexes.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Dynamic Filtered Properties (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-500" />
                <h3 className="font-display font-semibold text-slate-800 dark:text-white text-sm tracking-wide">
                  {selectedLocation === 'All' ? 'Vetted Signature Listings' : `${selectedLocation} Collection`}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{mapFilteredProperties.length} Properties Vetted</span>
            </div>

            {/* List scrollbox */}
            <div className="flex-1 space-y-4 max-h-[420px] overflow-y-auto pr-1 pb-2">
              <AnimatePresence mode="popLayout">
                {mapFilteredProperties.map(prop => (
                  <motion.div
                    key={prop.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-slate-900/60 hover:border-blue-100 dark:hover:border-blue-900/40 p-3 rounded-2xl flex gap-4 hover:bg-blue-50/10 dark:hover:bg-blue-950/10 transition-all cursor-pointer group shadow-sm"
                    onClick={() => onSelectProperty(prop)}
                  >
                    {/* Small preview image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img
                        src={prop.images[0]}
                        alt={prop.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Tiny details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-blue-500 uppercase font-semibold">{prop.type} • {prop.location}</span>
                        <h4 className="font-display font-semibold text-slate-800 dark:text-white text-xs md:text-sm tracking-tight mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{prop.name}</h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{prop.address}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100/60 dark:border-slate-800/80">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">₦{(prop.price / 1000000).toFixed(0)}M</span>
                        <span className="text-[10px] text-blue-500 flex items-center gap-1 font-medium font-display opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View Studio</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom highlight banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-emerald-500/5 dark:from-blue-500/10 dark:to-emerald-500/10 border border-blue-500/10 dark:border-blue-500/20 text-center">
              <div className="flex justify-center mb-1 text-emerald-500">
                <Sparkles className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light">
                Secure double-gated properties are audited by Prestige legal surveyors daily. Guaranteed litigation-free assets.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
