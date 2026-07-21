/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Bed, Bath, Car, Maximize2, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { Property, SearchFilters } from '../types';
import { PROPERTIES } from '../data';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  searchFilters: SearchFilters;
  onClearFilters: () => void;
  selectedLocation: string;
}

export default function FeaturedProperties({ properties, onSelectProperty, searchFilters, onClearFilters, selectedLocation }: FeaturedPropertiesProps) {
  const [activeTypeTab, setActiveTypeTab] = useState('All');

  // Multi-tier filtering
  const filteredProperties = properties.filter(prop => {
    // 1. Search Location filter
    if (searchFilters.location !== 'All' && prop.location !== searchFilters.location) return false;
    
    // 2. Map click Location filter
    if (selectedLocation !== 'All' && prop.location !== selectedLocation) return false;

    // 3. Search Type filter
    if (searchFilters.propertyType !== 'All' && prop.type !== searchFilters.propertyType) return false;

    // 4. Grid Tab Type filter
    if (activeTypeTab !== 'All' && prop.type !== activeTypeTab) return false;

    // 5. Budget Range filter
    if (searchFilters.budgetRange !== 'All') {
      const priceInMillions = prop.price / 1000000;
      if (searchFilters.budgetRange === 'under-600' && priceInMillions >= 600) return false;
      if (searchFilters.budgetRange === '600-1200' && (priceInMillions < 600 || priceInMillions > 1200)) return false;
      if (searchFilters.budgetRange === 'above-1200' && priceInMillions <= 1200) return false;
    }

    // 6. Bedrooms filter
    if (searchFilters.bedrooms !== 'All') {
      const minBeds = parseInt(searchFilters.bedrooms);
      if (prop.bedrooms < minBeds) return false;
    }

    return true;
  });

  const propertyTypes = ['All', 'Villa', 'Penthouse', 'Duplex', 'Mansion', 'Apartment', 'Townhouse'];

  const formatNairaVal = (num: number) => {
    return `₦${(num / 1000000).toFixed(0)}M`;
  };

  const hasActiveSearchFilters = 
    searchFilters.location !== 'All' || 
    searchFilters.propertyType !== 'All' || 
    searchFilters.budgetRange !== 'All' || 
    searchFilters.bedrooms !== 'All' ||
    selectedLocation !== 'All';

  return (
    <section id="featured-properties-catalog" className="py-24 bg-[#F8F9FA] dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title and Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-950/25 dark:border-emerald-500/20 dark:text-emerald-400 text-xs font-display font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIGNATURE COLLECTION</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              Vetted <span className="font-semibold text-slate-950 dark:text-sky-100">Luxury Properties</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl font-light text-sm md:text-base leading-relaxed">
              Explore our architectural masterpieces handpicked for structural integrity, exquisite artistry, and superior premium location indexing.
            </p>
          </div>

          {/* Quick Clear Filter trigger */}
          {hasActiveSearchFilters && (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onClearFilters}
              className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-medium text-xs tracking-wider uppercase bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Clear Filter Locks</span>
            </motion.button>
          )}
        </div>

        {/* Filter Tabs by Property Type */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-10 border-b border-slate-200/50 dark:border-slate-800">
          {propertyTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveTypeTab(type)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium font-display transition-all cursor-pointer whitespace-nowrap ${
                activeTypeTab === type
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow shadow-slate-900/15'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {type === 'All' ? 'All Types' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProperties.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((prop, idx) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-100/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group cursor-pointer relative"
                  onClick={() => onSelectProperty(prop)}
                >
                  {/* Property Image Header */}
                  <div className="relative h-[240px] overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={prop.images[0]}
                      alt={prop.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Dark gradient shadow inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Dynamic Badges */}
                    <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                      <span className="px-3 py-1.5 rounded-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white text-[10px] font-display font-medium uppercase tracking-wider shadow">
                        {prop.type}
                      </span>
                      {prop.featured && (
                        <span className="px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-display font-semibold uppercase tracking-wider shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-slate-950" />
                          <span>SIGNATURE</span>
                        </span>
                      )}
                    </div>

                    {/* Price Tag in Bottom Right */}
                    <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 dark:border-slate-800/50 text-slate-900 dark:text-white font-semibold font-display text-base shadow-lg">
                      {formatNairaVal(prop.price)}
                    </div>
                  </div>

                  {/* Property Info Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-5 bg-white dark:bg-slate-900/40">
                    <div className="space-y-2">
                      {/* Location MapPin label */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span>{prop.location}, Nigeria</span>
                      </div>

                      {/* Name heading */}
                      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {prop.name}
                      </h3>
                      
                      {/* Truncated description */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-2">
                        {prop.description}
                      </p>
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800" />

                    {/* Amenities quick-stats row */}
                    <div className="grid grid-cols-4 gap-2 text-center text-slate-500 dark:text-slate-400">
                      <div>
                        <div className="flex justify-center mb-0.5 text-slate-400 dark:text-slate-500">
                          <Bed className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{prop.bedrooms} Bed</span>
                      </div>
                      <div>
                        <div className="flex justify-center mb-0.5 text-slate-400 dark:text-slate-500">
                          <Bath className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{prop.bathrooms} Bath</span>
                      </div>
                      <div>
                        <div className="flex justify-center mb-0.5 text-slate-400 dark:text-slate-500">
                          <Car className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{prop.garage} Gar</span>
                      </div>
                      <div>
                        <div className="flex justify-center mb-0.5 text-slate-400 dark:text-slate-500">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{prop.sqm} sqm</span>
                      </div>
                    </div>

                    {/* Hover detail reveal helper */}
                    <div className="pt-1.5 flex justify-between items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span className="group-hover:underline">View Architectural Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-inner max-w-xl mx-auto space-y-4"
            >
              <div className="text-slate-300 dark:text-slate-600 flex justify-center">
                <SlidersHorizontal className="w-12 h-12" />
              </div>
              <h3 className="font-display font-semibold text-slate-800 dark:text-white text-lg">No properties found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light max-w-xs mx-auto">
                No matching luxury residences fit your selected filter criteria. Try expanding budget limits or selecting other neighborhoods.
              </p>
              <button
                onClick={onClearFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs tracking-wider uppercase hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
