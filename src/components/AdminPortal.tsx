/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Calendar, DollarSign, Plus, Edit2, Trash2, CheckCircle, XCircle, 
  MapPin, Shield, Key, Eye, AlertCircle, FileText, ArrowRight, Compass, Sparkles, LogOut, Check
} from 'lucide-react';
import { Property, Booking } from '../types';

interface AdminPortalProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
}

const LUXURY_IMAGE_PRESETS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
];

export default function AdminPortal({
  properties,
  onAddProperty,
  onEditProperty,
  onDeleteProperty,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking
}: AdminPortalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'properties' | 'bookings'>('properties');

  // Form Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    name: '',
    type: 'Villa',
    location: 'Lekki',
    address: '',
    price: 500000000,
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 450,
    images: [LUXURY_IMAGE_PRESETS[0]],
    description: '',
    amenities: ['Smart Home Automation', 'Swimming Pool', '24/7 Security'],
    schools: [{ name: 'Prestige Academy', distance: '1.5 km' }],
    hospitals: [{ name: 'St. Nicholas Clinic', distance: '2.0 km' }],
    featured: true,
    coordinates: { x: 45, y: 75 }
  });

  // Current amenity/school/hospital inputs for appending
  const [newAmenity, setNewAmenity] = useState('');
  const [newSchool, setNewSchool] = useState({ name: '', distance: '' });
  const [newHospital, setNewHospital] = useState({ name: '', distance: '' });

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'prestige' || password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Key. Hint: use "prestige" to log in.');
    }
  };

  // Switch to Add Form mode
  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setFormData({
      name: '',
      type: 'Villa',
      location: 'Lekki',
      address: '',
      price: 500000000,
      bedrooms: 4,
      bathrooms: 4,
      garage: 2,
      sqm: 450,
      images: [LUXURY_IMAGE_PRESETS[Math.floor(Math.random() * LUXURY_IMAGE_PRESETS.length)]],
      description: '',
      amenities: ['Smart Home Automation', 'Swimming Pool', '24/7 Premium Security'],
      schools: [{ name: 'Prestige Academy', distance: '1.5 km' }],
      hospitals: [{ name: 'St. Nicholas Clinic', distance: '2.0 km' }],
      featured: true,
      coordinates: { x: 40, y: 70 }
    });
    setIsFormOpen(true);
  };

  // Switch to Edit Form mode
  const handleOpenEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      type: property.type,
      location: property.location,
      address: property.address,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      garage: property.garage,
      sqm: property.sqm,
      images: property.images.length > 0 ? property.images : [LUXURY_IMAGE_PRESETS[0]],
      description: property.description,
      amenities: property.amenities,
      schools: property.schools,
      hospitals: property.hospitals,
      featured: property.featured,
      coordinates: property.coordinates
    });
    setIsFormOpen(true);
  };

  // Handle property creation / update
  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.description) {
      alert('Please complete all premium fields.');
      return;
    }

    // Set map coordinate values according to selected location presets so they show on the interactive map beautifully
    let coordinates = { ...formData.coordinates };
    if (formData.location === 'Abuja') coordinates = { x: 68, y: 35 };
    else if (formData.location === 'Banana Island') coordinates = { x: 38, y: 65 };
    else if (formData.location === 'Ikoyi') coordinates = { x: 33, y: 72 };
    else if (formData.location === 'Victoria Island') coordinates = { x: 28, y: 80 };
    else if (formData.location === 'Lekki') coordinates = { x: 46, y: 78 };

    const completePropertyData: Property = {
      ...formData,
      coordinates,
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`
    };

    if (editingProperty) {
      onEditProperty(completePropertyData);
    } else {
      onAddProperty(completePropertyData);
    }

    setIsFormOpen(false);
    setEditingProperty(null);
  };

  // Form array modifiers
  const handleAddAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity] }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleAddSchool = () => {
    if (newSchool.name && newSchool.distance) {
      setFormData(prev => ({ ...prev, schools: [...prev.schools, newSchool] }));
      setNewSchool({ name: '', distance: '' });
    }
  };

  const handleRemoveSchool = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schools: prev.schools.filter((_, i) => i !== index)
    }));
  };

  const handleAddHospital = () => {
    if (newHospital.name && newHospital.distance) {
      setFormData(prev => ({ ...prev, hospitals: [...prev.hospitals, newHospital] }));
      setNewHospital({ name: '', distance: '' });
    }
  };

  const handleRemoveHospital = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hospitals: prev.hospitals.filter((_, i) => i !== index)
    }));
  };

  // Summary Metrics calculation
  const totalPortfolioValue = properties.reduce((acc, curr) => acc + curr.price, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const approvedBookings = bookings.filter(b => b.status === 'Approved').length;

  const formatNaira = (price: number) => {
    if (price >= 1000000000) {
      return `₦${(price / 1000000000).toFixed(2)} Billion`;
    }
    return `₦${(price / 1000000).toFixed(0)} Million`;
  };

  // Secure Lock Gateway Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 py-20 bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xl text-center space-y-6"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Prestige Council Portal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-xs mx-auto">
              Exclusive administrative interface for the Prestige Homes real estate portfolio. Authentication required.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Access Key (prestige)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold tracking-widest text-center focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {authError && (
              <div className="text-rose-500 text-[11px] font-medium flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10"
            >
              <span>Unlock Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <button
            onClick={() => setIsAuthenticated(true)}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Bypass Lock for Demonstration
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Top Header / Portal Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/60 dark:border-slate-850 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-mono uppercase font-semibold">
              <Shield className="w-3 h-3 text-blue-500" />
              <span>LIVE CORE SERVER ACTIVE</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              Prestige <span className="font-semibold text-blue-600">Admin Command</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-light max-w-xl leading-relaxed">
              Real-time synchronization console for active property listings, school distances, and secure client viewing dockets.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleOpenAddModal}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow shadow-blue-500/15"
            >
              <Plus className="w-4 h-4" />
              <span>Add Listing</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/25 transition-all cursor-pointer"
              title="Lock Admin Console"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-850 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Properties</span>
              <span className="text-xl font-display font-bold text-slate-900 dark:text-white">{properties.length} Active</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-850 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Portfolio Value</span>
              <span className="text-lg font-display font-bold text-slate-900 dark:text-white">{formatNaira(totalPortfolioValue)}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-850 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Pending Bookings</span>
              <span className="text-xl font-display font-bold text-slate-900 dark:text-white">{pendingBookings} Leads</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-850 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Approved Bookings</span>
              <span className="text-xl font-display font-bold text-slate-900 dark:text-white">{approvedBookings} Scheduled</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-4.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Properties Portfolio ({properties.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-4.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Viewing Inquiries ({bookings.length})</span>
            {pendingBookings > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold animate-pulse">
                {pendingBookings}
              </span>
            )}
          </button>
        </div>

        {/* Dynamic Tab Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'properties' ? (
            <motion.div
              key="tab-properties"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Properties Grid List */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        <th className="px-6 py-4">Property Image & Details</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Value (₦)</th>
                        <th className="px-6 py-4">Attributes</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                      {properties.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs">
                            No listings registered. Click "Add Listing" to create one.
                          </td>
                        </tr>
                      ) : (
                        properties.map((prop) => (
                          <tr key={prop.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                            <td className="px-6 py-4 flex items-center gap-4">
                              <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 shrink-0">
                                <img 
                                  src={prop.images[0]} 
                                  alt={prop.name} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <span className="font-display font-semibold text-xs text-slate-900 dark:text-white block hover:text-blue-600 transition-colors">
                                  {prop.name}
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                                  {prop.address}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium font-display text-slate-600 dark:text-slate-400 uppercase">
                                {prop.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                <span>{prop.location}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-900 dark:text-white">
                              ₦{(prop.price / 1000000).toLocaleString()}M
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                <span>{prop.bedrooms} Beds</span>
                                <span>•</span>
                                <span>{prop.sqm} sqm</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditModal(prop)}
                                  className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all cursor-pointer"
                                  title="Edit Listing Details"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Confirm permanent deletion of ${prop.name}?`)) {
                                      onDeleteProperty(prop.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                                  title="Remove Listing"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Bookings Tracker table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        <th className="px-6 py-4">Client Detail Profile</th>
                        <th className="px-6 py-4">Investment Index</th>
                        <th className="px-6 py-4">Bespoke Architectural Notes</th>
                        <th className="px-6 py-4">Docket Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Coordinate Concierge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs">
                            No client viewing inquiry dockets submitted yet.
                          </td>
                        </tr>
                      ) : (
                        bookings.map((book) => (
                          <tr key={book.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                            <td className="px-6 py-4">
                              <span className="font-display font-semibold text-xs text-slate-900 dark:text-white block">
                                {book.name}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                                {book.email}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                                {book.phone}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-semibold">
                                {book.budget === 'under-600' ? 'Under ₦600M' : book.budget === '600-1200' ? '₦600M - ₦1.2B' : '₦1.2B+ (Elite)'}
                              </span>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {book.notes || 'No security/architectural preferences specified.'}
                              </p>
                            </td>
                            <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                              {new Date(book.timestamp).toLocaleDateString()} {new Date(book.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider ${
                                book.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                                  : book.status === 'Completed'
                                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                                  : book.status === 'Declined'
                                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
                                  : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                              }`}>
                                {book.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {book.status === 'Pending' && (
                                  <>
                                    <button
                                      onClick={() => onUpdateBookingStatus(book.id, 'Approved')}
                                      className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer"
                                      title="Approve & Schedule Viewing"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => onUpdateBookingStatus(book.id, 'Declined')}
                                      className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                                      title="Decline Inquiry"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                {book.status === 'Approved' && (
                                  <button
                                    onClick={() => onUpdateBookingStatus(book.id, 'Completed')}
                                    className="px-2 py-1 rounded border border-slate-100 dark:border-slate-800 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-[9px] font-mono font-bold tracking-wider uppercase cursor-pointer"
                                    title="Mark Viewing as Completed"
                                  >
                                    Complete
                                  </button>
                                )}
                                <button
                                  onClick={() => onDeleteBooking(book.id)}
                                  className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                                  title="Archive Docket"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Window: Add & Edit Property wizard */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                      {editingProperty ? `Edit Masterwork Listing` : `Formulate Elite Listing`}
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Provide full structural metadata
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="p-1.5 rounded-full border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <XCircle className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Modal Form Scroll Area */}
                <form onSubmit={handleSubmitProperty} className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Row 1: Name and Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">PROMINENT PROPERTY TITLE</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. The Sapphire Lagoon Mansion"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">ARCHITECTURAL TYPOLOGY</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Villa">Villa</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Mansion">Mansion</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Location and Value */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">GEOGRAPHIC HUB LOCATION</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value as any }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Lekki">Lekki</option>
                        <option value="Ikoyi">Ikoyi</option>
                        <option value="Victoria Island">Victoria Island</option>
                        <option value="Banana Island">Banana Island</option>
                        <option value="Abuja">Abuja</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">PRICE VALUATION (₦ NAIRA)</label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        placeholder="e.g. 750000000"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Row 3: Physical Address */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">PHYSICAL PREMIUM ADDRESS</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="e.g. Plot 15, Banana Island Road, Ikoyi, Lagos"
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Row 4: Specs - Beds, Baths, Garages, SQM */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">BEDROOMS</label>
                      <input
                        type="number"
                        required
                        value={formData.bedrooms}
                        onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) || 0 }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">BATHROOMS</label>
                      <input
                        type="number"
                        required
                        value={formData.bathrooms}
                        onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: parseInt(e.target.value) || 0 }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">GARAGE SLOTS</label>
                      <input
                        type="number"
                        required
                        value={formData.garage}
                        onChange={(e) => setFormData(prev => ({ ...prev, garage: parseInt(e.target.value) || 0 }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">TOTAL SQM AREA</label>
                      <input
                        type="number"
                        required
                        value={formData.sqm}
                        onChange={(e) => setFormData(prev => ({ ...prev, sqm: parseInt(e.target.value) || 0 }))}
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* High Quality Luxury Hero Image Selection */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">LUXURY VISUAL HERO (SELECT ONE)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {LUXURY_IMAGE_PRESETS.map((imgUrl, i) => (
                        <div 
                          key={i}
                          onClick={() => setFormData(prev => ({ ...prev, images: [imgUrl] }))}
                          className={`relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            formData.images[0] === imgUrl 
                              ? 'border-blue-600 scale-105 shadow-md shadow-blue-500/10' 
                              : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-90'
                          }`}
                        >
                          <img src={imgUrl} alt="Preset visual choice" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {formData.images[0] === imgUrl && (
                            <div className="absolute top-1 right-1 p-0.5 rounded-full bg-blue-600 text-white">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Detailed Description */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">BESPOKE DESCRIPTION PORTFOLIO</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detail the property’s architectural pedigree, high-end materials, ceiling heights, security gating, lagoon viewpoints..."
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none resize-none"
                    />
                  </div>

                  {/* Section: Amenities */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">AMENITIES INDEX ({formData.amenities.length})</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="e.g. Automated Skylight Glass Roof"
                        className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddAmenity}
                        className="py-3 px-5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-colors text-xs font-semibold uppercase cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {formData.amenities.map((am, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                          <span>{am}</span>
                          <button type="button" onClick={() => handleRemoveAmenity(i)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Infrastructure distance metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Schools */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">ELITE SCHOOL PROXIMITY INDEX</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSchool.name}
                          onChange={(e) => setNewSchool(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="School Name"
                          className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={newSchool.distance}
                          onChange={(e) => setNewSchool(prev => ({ ...prev, distance: e.target.value }))}
                          placeholder="e.g. 1.2 km"
                          className="w-20 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                        />
                        <button type="button" onClick={handleAddSchool} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors text-xs cursor-pointer">
                          +
                        </button>
                      </div>
                      <div className="space-y-1">
                        {formData.schools.map((sch, i) => (
                          <div key={i} className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-850">
                            <span>{sch.name} ({sch.distance})</span>
                            <button type="button" onClick={() => handleRemoveSchool(i)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hospitals */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">ELITE HOSPITAL PROXIMITY INDEX</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHospital.name}
                          onChange={(e) => setNewHospital(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Hospital Name"
                          className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={newHospital.distance}
                          onChange={(e) => setNewHospital(prev => ({ ...prev, distance: e.target.value }))}
                          placeholder="e.g. 2.5 km"
                          className="w-20 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                        />
                        <button type="button" onClick={handleAddHospital} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors text-xs cursor-pointer">
                          +
                        </button>
                      </div>
                      <div className="space-y-1">
                        {formData.hospitals.map((hosp, i) => (
                          <div key={i} className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-850">
                            <span>{hosp.name} ({hosp.distance})</span>
                            <button type="button" onClick={() => handleRemoveHospital(i)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>

                {/* Modal Footer actions */}
                <div className="px-6 py-4.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitProperty}
                    className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow shadow-blue-500/15"
                  >
                    {editingProperty ? 'Modify Real Estate Asset' : 'Commit New Asset'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
