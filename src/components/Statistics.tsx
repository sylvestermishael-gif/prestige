/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2, Award, Users, ShieldAlert, TrendingUp } from 'lucide-react';
import { STATS } from '../data';

export default function Statistics() {
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    // Simple count-up timer simulation over 2.5 seconds
    const duration = 2500;
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Easing out count up
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentProgress = easeOutQuad(progress);

      setCounts(
        STATS.map(stat => {
          const currentVal = Math.floor(stat.value * currentProgress);
          return Math.min(stat.value, currentVal);
        })
      );

      if (frame >= totalFrames) {
        clearInterval(interval);
        setCounts(STATS.map(stat => stat.value)); // snap to final values
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="statistics-banner" className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background wireframes */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center text-center">
          {STATS.map((stat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                {/* Visual Icon representing statistics context */}
                <div className="flex justify-center mb-1 text-blue-400">
                  {idx === 0 && <Building2 className="w-5 h-5" />}
                  {idx === 1 && <Users className="w-5 h-5" />}
                  {idx === 2 && <TrendingUp className="w-5 h-5" />}
                  {idx === 3 && <Award className="w-5 h-5" />}
                </div>

                <div className="font-display text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-blue-200">
                  {idx === 2 ? '₦' : ''}
                  {counts[idx]}
                  {stat.suffix}
                </div>
                
                <p className="text-slate-300 text-[10px] md:text-xs font-mono uppercase tracking-widest font-light">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
