/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, MapPin, Phone, ShieldCheck, AlignJustify, X, Sun, Moon, Globe } from 'lucide-react';
import { Property, SearchFilters, Booking } from './types';
import { PROPERTIES } from './data';

// Component imports
import OpeningScene from './components/OpeningScene';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import FeaturedProperties from './components/FeaturedProperties';
import InteractiveMap from './components/InteractiveMap';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PropertyDetailModal from './components/PropertyDetailModal';
import AdminPortal from './components/AdminPortal';

const DEFAULT_FILTERS: SearchFilters = {
  location: 'All',
  propertyType: 'All',
  budgetRange: 'All',
  bedrooms: 'All'
};

export default function App() {
  // Opening space scene state
  const [hasEntered, setHasEntered] = useState(false);
  
  // Load and manage properties list with default fallback
  const [properties, setProperties] = useState<Property[]>(() => {
    if (typeof window !== 'undefined') {
      const savedProps = localStorage.getItem('prestige_properties');
      if (savedProps) {
        try {
          return JSON.parse(savedProps);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return PROPERTIES;
  });

  // Sync properties to localStorage
  useEffect(() => {
    localStorage.setItem('prestige_properties', JSON.stringify(properties));
  }, [properties]);

  // Load and manage bookings list with realistic default mock listings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const savedBookings = localStorage.getItem('prestige_bookings');
      if (savedBookings) {
        try {
          return JSON.parse(savedBookings);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'book-1',
        name: 'Dr. Sylvester Mishael',
        email: 'sylvestermishael@gmail.com',
        phone: '+234 812 345 6789',
        budget: 'above-1200',
        notes: 'Interested in the Obsidian Vista Villa. Requesting a sunset inspection to review the smart solar integrations and private lagoon jetty clearance.',
        timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
        status: 'Pending'
      },
      {
        id: 'book-2',
        name: 'Amina Bello',
        email: 'amina.b@executive.ng',
        phone: '+234 905 555 1234',
        budget: '600-1200',
        notes: 'A private showing of the Old Ikoyi Penthouse. Prefer weekend slot. NDA paperwork must be dispatched in advance.',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
        status: 'Approved'
      }
    ];
  });

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('prestige_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleAddProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleEditProperty = (updatedProp: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleNewDocket = (docket: { name: string; email: string; phone: string; budget: string; notes: string }) => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      ...docket,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Selected Property for detail modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Active filters and coordination states
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  
  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hash-based client-side router
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Dark mode / Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Keyboard shortcut / easter egg listener for typing 'prestige'
  useEffect(() => {
    let inputBuffer = '';
    const secretCode = 'prestige';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting keystrokes in form inputs/textareas
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      // Append character to buffer
      if (e.key && e.key.length === 1) {
        inputBuffer += e.key.toLowerCase();
        
        // Keep the buffer within the secret code length limits
        if (inputBuffer.length > secretCode.length) {
          inputBuffer = inputBuffer.substring(inputBuffer.length - secretCode.length);
        }

        // Check matching
        if (inputBuffer === secretCode) {
          setHasEntered(true);
          window.location.hash = '#/admin';
          inputBuffer = ''; // Reset buffer
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/orbit' || hash === '#/earth') {
        setHasEntered(false);
        return;
      }
      if (hash === '#/catalog') {
        setCurrentPage('catalog');
      } else if (hash === '#/map') {
        setCurrentPage('map');
      } else if (hash === '#/promise') {
        setCurrentPage('promise');
      } else if (hash === '#/reviews') {
        setCurrentPage('reviews');
      } else if (hash === '#/contact') {
        setCurrentPage('contact');
      } else if (hash === '#/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
      // Instantly scroll to the top of the new page view
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    };

    // Initialize router mapping
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSearchFilters = (filters: SearchFilters) => {
    setSearchFilters(filters);
    // If search specifies a location, sync map selectedLocation
    if (filters.location !== 'All') {
      setSelectedLocation(filters.location);
    }
  };

  const handleClearFilters = () => {
    setSearchFilters(DEFAULT_FILTERS);
    setSelectedLocation('All');
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-900 relative text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <OpeningScene key="orbital-intro" onEnter={() => {
            setHasEntered(true);
            if (window.location.hash === '#/orbit' || window.location.hash === '#/earth') {
              window.location.hash = '#/';
            }
          }} />
        ) : (
          <motion.div
            key="prestige-homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col min-h-screen relative"
          >
            {/* STICKY LUXURY FLOATING NAVBAR */}
            <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300">
              <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-6 h-20 relative flex items-center justify-between">
                
                {/* Brand Logo */}
                <a 
                  href="#/"
                  className="flex items-center gap-2 cursor-pointer select-none group"
                >
                  <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:rotate-12 transition-transform">
                    <Compass className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-display tracking-widest text-sm font-semibold text-slate-900 dark:text-white uppercase">
                    PRESTIGE HOMES
                  </div>
                </a>

                {/* Nav Anchors (Desktop Navigation) */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-display font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <a 
                    href="#/" 
                    className={`transition-all py-1 relative ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    Home
                    {currentPage === 'home' && (
                      <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                  <a 
                    href="#/catalog" 
                    className={`transition-all py-1 relative ${currentPage === 'catalog' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    Catalog
                    {currentPage === 'catalog' && (
                      <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                  <a 
                    href="#/map" 
                    className={`transition-all py-1 relative ${currentPage === 'map' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    Map Radar
                    {currentPage === 'map' && (
                      <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                  <a 
                    href="#/promise" 
                    className={`transition-all py-1 relative ${currentPage === 'promise' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    The Promise
                    {currentPage === 'promise' && (
                      <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                  <a 
                    href="#/reviews" 
                    className={`transition-all py-1 relative ${currentPage === 'reviews' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    Reviews
                    {currentPage === 'reviews' && (
                      <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                </nav>

                {/* Action CTA (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Return to Space Orbit */}
                  <button
                    onClick={() => setHasEntered(false)}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
                    title="Return to Space Orbit"
                  >
                    <Globe className="w-4 h-4 text-blue-500 animate-pulse" />
                  </button>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-4">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>+234 800 PRESTIGE</span>
                  </div>
                  <a
                    href="#/contact"
                    className="px-5 py-2.5 rounded-full bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-display text-xs font-semibold tracking-wider uppercase hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow shadow-slate-950/10 text-center"
                  >
                    Schedule Viewing
                  </a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex items-center gap-2 md:hidden">
                  <button
                    onClick={() => setHasEntered(false)}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/85 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
                    title="Return to Space Orbit"
                  >
                    <Globe className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/85 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/85 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4 text-slate-700 dark:text-slate-300" /> : <AlignJustify className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
                  </button>
                </div>

              </div>

              {/* Mobile Drawer Navigation Menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <div className="px-6 py-6 flex flex-col gap-4 text-xs font-display font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      <a href="#/" onClick={() => setMobileMenuOpen(false)} className={`py-1 ${currentPage === 'home' ? 'text-blue-600 font-semibold' : ''}`}>Home</a>
                      <a href="#/catalog" onClick={() => setMobileMenuOpen(false)} className={`py-1 ${currentPage === 'catalog' ? 'text-blue-600 font-semibold' : ''}`}>Catalog</a>
                      <a href="#/map" onClick={() => setMobileMenuOpen(false)} className={`py-1 ${currentPage === 'map' ? 'text-blue-600 font-semibold' : ''}`}>Map Radar</a>
                      <a href="#/promise" onClick={() => setMobileMenuOpen(false)} className={`py-1 ${currentPage === 'promise' ? 'text-blue-600 font-semibold' : ''}`}>The Promise</a>
                      <a href="#/reviews" onClick={() => setMobileMenuOpen(false)} className={`py-1 ${currentPage === 'reviews' ? 'text-blue-600 font-semibold' : ''}`}>Reviews</a>
                      <a href="#/earth" onClick={() => setMobileMenuOpen(false)} className="py-1 text-blue-600 font-semibold flex items-center gap-1.5">
                        <Globe className="w-4 h-4" />
                        <span>Orbital View</span>
                      </a>
                      
                      <hr className="border-slate-100 dark:border-slate-800" />

                      <div className="flex flex-col gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          <Phone className="w-4 h-4 text-emerald-500" />
                          <span>+234 800 PRESTIGE</span>
                        </div>
                        <a
                          href="#/contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full py-3 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-center text-xs font-semibold uppercase cursor-pointer"
                        >
                          Book Direct Viewing
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* IMMERSIVE PAGE CONTENT ROUTER */}
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                {currentPage === 'home' && (
                  <motion.div
                    key="page-home"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <Hero 
                      onSearch={(filters) => {
                        handleSearchFilters(filters);
                        window.location.hash = '#/catalog';
                      }} 
                      onExploreClick={() => {
                        window.location.hash = '#/catalog';
                      }}
                      onScheduleClick={() => {
                        window.location.hash = '#/contact';
                      }}
                    />
                    <Statistics />
                  </motion.div>
                )}

                {currentPage === 'catalog' && (
                  <motion.div
                    key="page-catalog"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="pt-20"
                  >
                    <FeaturedProperties 
                      properties={properties}
                      onSelectProperty={handleSelectProperty}
                      searchFilters={searchFilters}
                      onClearFilters={handleClearFilters}
                      selectedLocation={selectedLocation}
                    />
                  </motion.div>
                )}

                {currentPage === 'map' && (
                  <motion.div
                    key="page-map"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="pt-20"
                  >
                    <InteractiveMap 
                      properties={properties}
                      onSelectProperty={handleSelectProperty}
                      selectedLocation={selectedLocation}
                      onLocationSelect={setSelectedLocation}
                    />
                  </motion.div>
                )}

                {currentPage === 'promise' && (
                  <motion.div
                    key="page-promise"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="pt-20"
                  >
                    <WhyChooseUs />
                  </motion.div>
                )}

                {currentPage === 'reviews' && (
                  <motion.div
                    key="page-reviews"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="pt-20"
                  >
                    <Testimonials />
                  </motion.div>
                )}

                {currentPage === 'contact' && (
                  <motion.div
                    key="page-contact"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="pt-20"
                  >
                    <ContactSection 
                      onScheduleInspectionClick={() => {
                        const formEl = document.getElementById('contact-and-inspection-hub');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onSubmitDocket={handleNewDocket}
                    />
                  </motion.div>
                )}

                {currentPage === 'admin' && (
                  <motion.div
                    key="page-admin"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <AdminPortal 
                      properties={properties}
                      onAddProperty={handleAddProperty}
                      onEditProperty={handleEditProperty}
                      onDeleteProperty={handleDeleteProperty}
                      bookings={bookings}
                      onUpdateBookingStatus={handleUpdateBookingStatus}
                      onDeleteBooking={handleDeleteBooking}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* FOOTER */}
            <Footer />

            {/* IMMERSIVE PROPERTY DETAILS MODAL */}
            <AnimatePresence>
              {selectedProperty && (
                <PropertyDetailModal 
                  property={selectedProperty} 
                  onClose={() => setSelectedProperty(null)} 
                />
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
