/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, FileText, DollarSign, TrendingUp, Heart, Star } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  ShieldCheck: ShieldCheck,
  UserCheck: UserCheck,
  FileText: FileText,
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
  Heart: Heart
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us-timeline" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative architectural circle backgrounds */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Title / Intro */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 dark:bg-blue-950/25 dark:border-blue-500/20 dark:text-blue-400 text-xs font-display font-medium uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-blue-600" />
            <span>THE PRESTIGE PROMISE</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Why Discerning Investors <br />
            <span className="font-semibold text-slate-950 dark:text-sky-100">Choose Prestige Homes</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-light leading-relaxed">
            We operate beyond standard commercial boundaries, offering full legal security, institutional private bank channels, and generational home care.
          </p>
        </div>

        {/* Scrolling Interactive Timeline */}
        <div className="relative mt-20">
          {/* Central progress tracing line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {TIMELINE_ITEMS.map((item, idx) => {
              const IconComp = ICON_MAP[item.iconName] || ShieldCheck;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className="relative flex flex-col md:flex-row items-stretch"
                >
                  {/* Central Node Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-md shadow-blue-500/10 flex items-center justify-center -translate-x-1/2 z-10">
                    <IconComp className="w-4 h-4 text-blue-600" />
                  </div>

                  {/* Even items Left / Odd items Right */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end pr-0 md:pr-12 pl-12 md:pl-0">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100/80 dark:border-slate-800 shadow-sm max-w-md w-full md:text-right"
                      >
                        <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg md:text-xl tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ) : (
                      // Spacer for grid alignment
                      <div className="hidden md:block" />
                    )}
                  </div>

                  <div className="w-full md:w-1/2 flex justify-start pl-12">
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100/80 dark:border-slate-800 shadow-sm max-w-md w-full text-left"
                      >
                        <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg md:text-xl tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ) : (
                      // Spacer
                      <div className="hidden md:block" />
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
