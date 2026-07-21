/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MapPin, Bed, Bath, Car, Maximize2, CreditCard, 
  Calendar, MessageCircle, CheckCircle2, School, Activity,
  ChevronLeft, ChevronRight, Sliders, Sparkles, Check, Send
} from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetailModal({ property, onClose }: PropertyDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'calculator' | 'amenities' | '3d-cad'>('details');
  
  // Mortgage calculator states
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(15); // standard premium interest rate in Nigeria is relatively high, let's default to 15%
  const [loanTermYrs, setLoanTermYrs] = useState(10);
  
  // Inspection Booking state
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cadAngle, setCadAngle] = useState({ x: 0.5, y: 0.6 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  // Draw 3D Isometric CAD Wireframe of the luxury home
  useEffect(() => {
    if (activeTab !== '3d-cad') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 350;

    let animId: number;

    const renderCad = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark futuristic blueprint backdrop
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blueprint grid
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Projection mathematics (Simple 3D Isometric Projection)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 30;
      const scale = 110;

      // Render a luxury multi-volume villa shape (vertices)
      // Cube points in local space (-1 to 1)
      const vertices = [
        { x: -1, y: -0.8, z: -0.8 }, // 0: base front left
        { x: 1, y: -0.8, z: -0.8 },  // 1: base front right
        { x: 1, y: 0.8, z: -0.8 },   // 2: base back right
        { x: -1, y: 0.8, z: -0.8 },  // 3: base back left
        { x: -1, y: -0.8, z: 0.2 },  // 4: mid front left
        { x: 1, y: -0.8, z: 0.2 },   // 5: mid front right
        { x: 1, y: 0.8, z: 0.2 },    // 6: mid back right
        { x: -1, y: 0.8, z: 0.2 },   // 7: mid back left

        // Level 2 penthouse volume (slightly smaller box on top)
        { x: -0.6, y: -0.6, z: 0.2 },  // 8: level 2 base front left
        { x: 0.6, y: -0.6, z: 0.2 },   // 9: level 2 base front right
        { x: 0.6, y: 0.6, z: 0.2 },    // 10: level 2 base back right
        { x: -0.6, y: 0.6, z: 0.2 },   // 11: level 2 base back left
        { x: -0.6, y: -0.6, z: 0.9 },  // 12: level 2 top front left
        { x: 0.6, y: -0.6, z: 0.9 },   // 13: level 2 top front right
        { x: 0.6, y: 0.6, z: 0.9 },    // 14: level 2 top back right
        { x: -0.6, y: 0.6, z: 0.9 },   // 15: level 2 top back left
      ];

      // Luxury home elements (pool, terrace lines)
      const poolVertices = [
        { x: -1.8, y: -0.8, z: -0.8 },
        { x: -1.1, y: -0.8, z: -0.8 },
        { x: -1.1, y: 0.2, z: -0.8 },
        { x: -1.8, y: 0.2, z: -0.8 },
      ];

      // Rotate around CAD angle
      const cosX = Math.cos(cadAngle.x);
      const sinX = Math.sin(cadAngle.x);
      const cosY = Math.cos(cadAngle.y);
      const sinY = Math.sin(cadAngle.y);

      const project = (v: { x: number; y: number; z: number }) => {
        // Rotate Y (pitch)
        let x1 = v.x;
        let y1 = v.y * cosY - v.z * sinY;
        let z1 = v.y * sinY + v.z * cosY;

        // Rotate X (yaw)
        let x2 = x1 * cosX - z1 * sinX;
        let y2 = y1;
        let z2 = x1 * sinX + z1 * cosX;

        // Perspective or simple isometric project
        const px = cx + x2 * scale;
        const py = cy - y2 * scale * 0.7; // flatten height a bit for isometric look
        return { x: px, y: py };
      };

      const projected = vertices.map(project);
      const projPool = poolVertices.map(project);

      // Draw swimming pool
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.beginPath();
      ctx.moveTo(projPool[0].x, projPool[0].y);
      for (let i = 1; i < projPool.length; i++) ctx.lineTo(projPool[i].x, projPool[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pool water ripples
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.3)';
      ctx.beginPath();
      ctx.moveTo(projPool[0].x + 10, projPool[0].y - 5);
      ctx.lineTo(projPool[1].x - 10, projPool[1].y - 5);
      ctx.stroke();

      // Helper function to draw blueprint line between two indices
      const drawLine = (i1: number, i2: number, color = '#10B981', width = 1) => {
        ctx.beginPath();
        ctx.moveTo(projected[i1].x, projected[i1].y);
        ctx.lineTo(projected[i2].x, projected[i2].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };

      // Draw level 1 base (Emerald gold accent)
      const level1Color = '#10B981'; // luxury green line
      drawLine(0, 1, level1Color, 1.5);
      drawLine(1, 2, level1Color, 1.5);
      drawLine(2, 3, level1Color, 1.5);
      drawLine(3, 0, level1Color, 1.5);

      // Draw level 1 roof frame
      drawLine(4, 5, level1Color, 1.2);
      drawLine(5, 6, level1Color, 1.2);
      drawLine(6, 7, level1Color, 1.2);
      drawLine(7, 4, level1Color, 1.2);

      // Draw columns
      drawLine(0, 4, level1Color, 1.2);
      drawLine(1, 5, level1Color, 1.2);
      drawLine(2, 6, level1Color, 1.2);
      drawLine(3, 7, level1Color, 1.2);

      // Draw level 2 penthouse (Sky Blue wireframe)
      const level2Color = '#60A5FA';
      drawLine(8, 9, level2Color, 1.5);
      drawLine(9, 10, level2Color, 1.5);
      drawLine(10, 11, level2Color, 1.5);
      drawLine(11, 8, level2Color, 1.5);

      drawLine(12, 13, level2Color, 1.5);
      drawLine(13, 14, level2Color, 1.5);
      drawLine(14, 15, level2Color, 1.5);
      drawLine(15, 12, level2Color, 1.5);

      drawLine(8, 12, level2Color, 1.2);
      drawLine(9, 13, level2Color, 1.2);
      drawLine(10, 14, level2Color, 1.2);
      drawLine(11, 15, level2Color, 1.2);

      // Draw glass facades (cross lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(projected[0].x, projected[0].y);
      ctx.lineTo(projected[5].x, projected[5].y);
      ctx.moveTo(projected[1].x, projected[1].y);
      ctx.lineTo(projected[4].x, projected[4].y);
      ctx.stroke();

      // CAD metadata labels
      ctx.fillStyle = '#64748B';
      ctx.font = '10px monospace';
      ctx.fillText(`YAW: ${Math.round(cadAngle.x * 180 / Math.PI)}°  PITCH: ${Math.round(cadAngle.y * 180 / Math.PI)}°`, 15, 25);
      ctx.fillText(`SCALE: 1:${property.sqm} SQM CAD`, 15, 40);
      ctx.fillText('MODEL: LUX-DIGITAL-TWIN V1', 15, 55);

      ctx.fillStyle = '#10B981';
      ctx.fillText('• VERIFIED STRUCTURE', canvas.width - 150, 25);
      ctx.fillStyle = '#60A5FA';
      ctx.fillText('• 3D GLASS HARMONICS', canvas.width - 150, 40);

      // Rotating cue text
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Drag to Orbit Luxury 3D Blueprint', canvas.width / 2, canvas.height - 15);
      ctx.textAlign = 'left';
    };

    renderCad();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      setCadAngle(prev => ({
        x: prev.x + deltaX * 0.01,
        y: Math.max(0.1, Math.min(Math.PI / 2 - 0.1, prev.y + deltaY * 0.01))
      }));
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeTab, cadAngle, property]);

  // Mortgage calculations
  const downPaymentVal = (property.price * downPaymentPct) / 100;
  const principal = property.price - downPaymentVal;
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTermYrs * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = principal / totalMonths;
  }

  // Formatting helpers
  const formatNaira = (num: number) => {
    if (num >= 1000000000) {
      return `₦${(num / 1000000000).toFixed(2)}B`;
    }
    return `₦${(num / 1000000).toFixed(0)}M`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingName('');
      setBookingPhone('');
      setBookingDate('');
    }, 4000);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Prestige Homes team, I am highly interested in viewing "${property.name}" in ${property.location} (listed at ₦${(property.price / 1000000).toFixed(0)}M). Please coordinate a viewing schedule with me.`
    );
    return `https://wa.me/234800PRESTIGE?text=${text}`;
  };

  return (
    <div id="property-modal-overlay" className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#F8F9FA] dark:bg-slate-950 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/50 dark:border-slate-800"
      >
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative z-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 font-display font-medium text-xs tracking-wider uppercase mb-1">
              {property.type}
            </span>
            <h2 className="font-display text-xl md:text-2xl text-slate-900 dark:text-white font-semibold">{property.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Area: Gallery & Tabs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Immersive Gallery */}
            <div className="relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden group shadow-lg bg-slate-100 dark:bg-slate-900">
              <img
                src={property.images[activeImageIndex]}
                alt={property.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveImageIndex(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-slate-800" />
              </button>
              <button
                onClick={() => setActiveImageIndex(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-slate-800" />
              </button>

              {/* Location Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow text-xs font-semibold text-slate-900 dark:text-white border border-white dark:border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{property.location}, Nigeria</span>
              </div>

              {/* Index Indicator */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white tracking-widest">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    idx === activeImageIndex ? 'ring-2 ring-blue-500 scale-95 shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-95'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Premium Content Selector Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-850">
              {(['details', 'calculator', 'amenities', '3d-cad'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-5 text-sm font-display font-medium relative cursor-pointer capitalize transition-all duration-300 ${
                    activeTab === tab ? 'text-blue-600 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab === '3d-cad' ? 'Interactive 3D CAD' : tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="modalTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content viewer */}
            <div className="min-h-[220px]">
              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
                    {property.description}
                  </p>
                  
                  {/* Property Quick Stats */}
                  <div className="grid grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm text-center">
                    <div>
                      <div className="flex justify-center mb-1 text-slate-400">
                        <Bed className="w-4 h-4" />
                      </div>
                      <span className="block text-slate-800 dark:text-slate-200 font-semibold text-sm">{property.bedrooms} Bed</span>
                    </div>
                    <div>
                      <div className="flex justify-center mb-1 text-slate-400">
                        <Bath className="w-4 h-4" />
                      </div>
                      <span className="block text-slate-800 dark:text-slate-200 font-semibold text-sm">{property.bathrooms} Bath</span>
                    </div>
                    <div>
                      <div className="flex justify-center mb-1 text-slate-400">
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="block text-slate-800 dark:text-slate-200 font-semibold text-sm">{property.garage} Garage</span>
                    </div>
                    <div>
                      <div className="flex justify-center mb-1 text-slate-400">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <span className="block text-slate-800 dark:text-slate-200 font-semibold text-sm">{property.sqm} sqm</span>
                    </div>
                  </div>

                  {/* Nearby Facilities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-blue-600">
                        <School className="w-4 h-4" />
                        <h4 className="font-display font-medium text-sm text-slate-800 dark:text-white">Nearby Prestigious Schools</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        {property.schools.map((sch, i) => (
                          <li key={i} className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-medium text-slate-700">{sch.name}</span>
                            <span className="text-slate-400 font-mono">{sch.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-emerald-600">
                        <Activity className="w-4 h-4" />
                        <h4 className="font-display font-medium text-sm text-slate-800 dark:text-white">Nearby Health Centres</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        {property.hospitals.map((hosp, i) => (
                          <li key={i} className="flex justify-between border-b border-dashed border-slate-100 dark:border-slate-800 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{hosp.name}</span>
                            <span className="text-slate-400 font-mono">{hosp.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'calculator' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm space-y-5"
                >
                  <div className="flex items-center gap-2 text-blue-600">
                    <CreditCard className="w-4 h-4" />
                    <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Premium Investment Mortgage Calculator</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Downpayment slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Down Payment</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{downPaymentPct}% ({formatNaira(downPaymentVal)})</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        step="5"
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Interest Rate slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Interest Rate</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{interestRate}% p.a.</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="0.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Term slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span>Loan Term</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{loanTermYrs} Years</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="5"
                        value={loanTermYrs}
                        onChange={(e) => setLoanTermYrs(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations Result Summary */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">FINANCED AMOUNT</span>
                      <span className="block text-slate-700 dark:text-slate-300 font-semibold font-mono text-base">{formatNaira(principal)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">EST. MONTHLY OUTLAY</span>
                      <span className="block text-blue-600 dark:text-blue-400 font-bold font-mono text-lg">{formatNaira(monthlyPayment)} /mo</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center italic">
                    Calculated for standard elite financing. Real private bank rates might differ based on client credit asset volume.
                  </p>
                </motion.div>
              )}

              {activeTab === 'amenities' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                >
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{amenity}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === '3d-cad' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 bg-slate-900 dark:bg-slate-950 rounded-2xl p-4 shadow-inner"
                >
                  <canvas ref={canvasRef} className="rounded-xl max-w-full bg-slate-950 block shadow-inner cursor-grab active:cursor-grabbing" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Area: Contact Form, Inspection Scheduler, Pricing */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct Instant Action Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-lg flex flex-col gap-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">PREMIUM INVESTMENT VALUE</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl md:text-3xl font-display font-semibold text-slate-900 dark:text-white">
                    ₦{(property.price / 1000000).toFixed(0)}M
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({formatNaira(property.price)})
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100/40 dark:border-emerald-500/20 px-2.5 py-1 rounded-full w-max">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verified Legal Deed & Ownership Certificate</span>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Booking Form scheduler */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Schedule Private Inspection</h4>
                
                {bookingSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-500/20 text-center space-y-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h5 className="font-display font-semibold text-emerald-800 dark:text-emerald-300 text-xs">Request Vetted & Filed</h5>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 leading-snug">
                      An elite Prestige Homes concierge agent will contact you within 15 minutes to verify details.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1">YOUR NAME</label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. Kolawole"
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1">PHONE NUMBER</label>
                        <input
                          type="tel"
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="+234..."
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1">INSPECTION DATE</label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1">PREFERRED HOUR</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="09:00">09:00 AM (Early Light)</option>
                          <option value="11:00">11:00 AM (Midday Sun)</option>
                          <option value="14:00">02:00 PM (Afternoon Glow)</option>
                          <option value="16:00">04:00 PM (Golden Hour)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Private Viewing</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Micro Map Locator */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-md">
              <h4 className="font-display font-semibold text-xs text-slate-800 dark:text-white uppercase tracking-wider mb-2.5">SECURE RESIDENCE LOCATOR</h4>
              <div className="relative h-[120px] rounded-xl overflow-hidden bg-[#E2E8F0] dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                {/* Visual mock map styling */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
                {/* Styled paths */}
                <svg className="absolute inset-0 w-full h-full text-slate-300 dark:text-slate-800" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10,40 Q80,20 200,80 T400,10" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M50,-10 Q120,90 180,150" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M120,-10 Q220,120 380,100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
                </svg>

                {/* Hotspot */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full relative border-2 border-white shadow shadow-blue-500" />
                  <span className="mt-1.5 px-2 py-0.5 rounded bg-slate-900/90 text-[9px] font-mono text-white tracking-widest uppercase shadow">
                    {property.location} HUB
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-light leading-snug">
                Located in a highly-gated high-society hub. Perfect connection routes to Lekki Phase 1, Victoria Island financial core, and Banana Island marinas.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
