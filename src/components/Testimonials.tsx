/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIdx(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials-carousel-section" className="py-24 bg-[#F8F9FA] dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative quotes icons floating */}
      <div className="absolute top-12 left-12 opacity-5 text-slate-900 dark:text-white pointer-events-none select-none">
        <Quote className="w-48 h-48" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-950/25 dark:border-emerald-500/20 dark:text-emerald-400 text-xs font-display font-medium uppercase tracking-wider">
            <Check className="w-3.5 h-3.5" />
            <span>VETTED APPRAISALS</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            Hear From Our <span className="font-semibold text-slate-950 dark:text-sky-100">Elite Clientele</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">
            Highly confidential investment feedback from Nigeria’s top venture leaders, industry chairmen, and real estate appreciators.
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Star Rating row */}
              <div className="flex gap-1 justify-center text-amber-400">
                {Array.from({ length: TESTIMONIALS[activeIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Comment */}
              <blockquote className="text-center text-slate-800 dark:text-slate-200 text-base md:text-xl font-light leading-relaxed italic">
                "{TESTIMONIALS[activeIdx].comment}"
              </blockquote>

              {/* Client identity */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/10 shadow shadow-blue-500/20">
                  <img
                    src={TESTIMONIALS[activeIdx].avatar}
                    alt={TESTIMONIALS[activeIdx].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <cite className="not-italic font-display font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                    {TESTIMONIALS[activeIdx].name}
                  </cite>
                  <span className="block text-[11px] md:text-xs text-slate-400 dark:text-slate-500 mt-0.5 tracking-wider uppercase font-mono">
                    {TESTIMONIALS[activeIdx].role}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Controls indicators */}
          <div className="flex items-center justify-between mt-8 md:mt-10 border-t border-slate-100 dark:border-slate-800 pt-6">
            
            {/* Dots */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
