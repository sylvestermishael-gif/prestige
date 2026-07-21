/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Testimonial, TimelineItem } from './types';

// Import generated luxury real estate images
import luxuryWhiteVilla from './assets/images/luxury_white_villa_1784591544837.jpg';
import luxuryDuskVilla from './assets/images/luxury_dusk_villa_1784591560608.jpg';
import minimalistLedVilla from './assets/images/minimalist_led_villa_1784591572651.jpg';
import geometricModernHouse from './assets/images/geometric_modern_house_1784591582970.jpg';
import blackWhiteHouse from './assets/images/black_white_house_1784591594272.jpg';
import minimalistDarkMansion from './assets/images/minimalist_dark_mansion_1784591603860.jpg';

export const PROPERTIES: Property[] = [
  // ==================== VILLAS ====================
  {
    id: 'prop-1',
    name: 'The Obsidian Vista Villa',
    type: 'Villa',
    location: 'Lekki',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    price: 850000000, // ₦850M
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    sqm: 680,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed by international award-winning architects, The Obsidian Vista represents the pinnacle of modern luxury living in Lekki Phase 1. Complete with smart-home automation, an infinity pool overlooking the lagoon, a private cinema, and a climate-controlled glass wine cellar.',
    amenities: [
      'Smart Home Automation',
      'Infinity Pool',
      'Lagoon Views',
      'Private 4K Cinema',
      '24/7 Premium Security',
      'Solar Power Battery Backups',
      'Double-height Living Saloon',
      'High-speed Fibre Internet'
    ],
    schools: [
      { name: 'British International School', distance: '1.2 km' },
      { name: 'Lekki British School', distance: '2.5 km' }
    ],
    hospitals: [
      { name: 'Evercare Hospital Lekki', distance: '1.8 km' },
      { name: 'Reddington Hospital', distance: '3.1 km' }
    ],
    featured: true,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-v2',
    name: 'The Ivory Crest Villa',
    type: 'Villa',
    location: 'Ikoyi',
    address: 'Alexander Avenue, Old Ikoyi, Lagos',
    price: 980000000, // ₦980M
    bedrooms: 5,
    bathrooms: 5,
    garage: 3,
    sqm: 610,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A stately architectural modern villa boasting majestic white marble pillars and high-volume, floor-to-ceiling glass paneling. Nested in the tranquil, secured green belt of Old Ikoyi, this property is custom-tailored for families who demand privacy, safety, and visual luxury.',
    amenities: [
      'Double-Height Glass Foyer',
      'Private Spa and Sauna Room',
      'Biometric Access Control',
      'Fully Furnished Staff Quarters',
      'Premium Italian Cabinetry',
      'Water Treatment Plant'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '1.1 km' },
      { name: 'Corona Secondary School', distance: '2.1 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '1.4 km' },
      { name: 'St. Nicholas Hospital', distance: '2.8 km' }
    ],
    featured: true,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-v3',
    name: 'Le Mirage Sunset Villa',
    type: 'Villa',
    location: 'Victoria Island',
    address: 'Oniru Waterfront, Victoria Island, Lagos',
    price: 720000000, // ₦720M
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 520,
    images: [
      luxuryDuskVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A breathtaking coastal residence blending tropical design accents with sleek geometric minimalism. Le Mirage Sunset Villa offers spectacular ocean-side terraces, outdoor poolside cabanas, and fully integrated automated environmental systems.',
    amenities: [
      'Oceanfront Viewing Deck',
      'Infinity Pool with Led Lighting',
      'Home automation server rack',
      'Central cooling chiller systems',
      'Integrated solar battery grid',
      'Luxury outdoor bar area'
    ],
    schools: [
      { name: 'American International School', distance: '1.9 km' },
      { name: 'British International School', distance: '3.2 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '1.5 km' },
      { name: 'Paelon Memorial Hospital', distance: '2.1 km' }
    ],
    featured: false,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },
  {
    id: 'prop-v4',
    name: 'The Emerald Riviera Villa',
    type: 'Villa',
    location: 'Lekki',
    address: 'Richmond Gate Estate, Lekki, Lagos',
    price: 540000000, // ₦540M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 450,
    images: [
      geometricModernHouse,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elegant contemporary villa wrapped in rich local green landscaping. It features a stunning black-framed spiral architectural stair leading to a customized roof-deck recreation area, complete with 360 views of Richmond Peninsula.',
    amenities: [
      'Rooftop BBQ terrace lounge',
      'Black Spiral Rooftop Stairs',
      'Fully Integrated Smart Audio',
      'Triple-purified Water Borehole',
      '24/7 Gated Community Guard'
    ],
    schools: [
      { name: 'British International School', distance: '3.4 km' },
      { name: 'Lekki British School', distance: '1.8 km' }
    ],
    hospitals: [
      { name: 'Evercare Hospital Lekki', distance: '2.2 km' },
      { name: 'Vantage Health Center', distance: '1.1 km' }
    ],
    featured: false,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-v5',
    name: 'The Alabaster Horizon Villa',
    type: 'Villa',
    location: 'Abuja',
    address: 'Gwarinpa Crest Avenue, Abuja',
    price: 1150000000, // ₦1.15B
    bedrooms: 5,
    bathrooms: 6,
    garage: 4,
    sqm: 750,
    images: [
      minimalistLedVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An expansive architectural estate set in Abuja’s rising high-net-worth hills. Complete with stunning perimeter lighting accents, a custom pool with dual stone waterfalls, a full smart surveillance center, and heavy steel-reinforced bulletproof entrance doors.',
    amenities: [
      'Perimeter Smart LED Beams',
      'Double Stone Pool Waterfalls',
      'Command Surveillance Room',
      'Bulletproof Main Security Doors',
      'Dual Detached Staff BQs',
      'Large Landscaped Palm Garden'
    ],
    schools: [
      { name: 'The Regent School', distance: '2.5 km' },
      { name: 'American International School', distance: '4.8 km' }
    ],
    hospitals: [
      { name: 'Nizamiye Hospital', distance: '2.9 km' },
      { name: 'National Hospital Abuja', distance: '5.1 km' }
    ],
    featured: true,
    coordinates: { x: 68, y: 35 } // Abuja position
  },

  // ==================== PENTHOUSES ====================
  {
    id: 'prop-2',
    name: 'The Grand Aurelia Penthouse',
    type: 'Penthouse',
    location: 'Ikoyi',
    address: 'Kingsway Road, Old Ikoyi, Lagos',
    price: 1200000000, // ₦1.2B
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 540,
    images: [
      luxuryDuskVilla,
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elite penthouse high above Ikoyi with panoramic views of the Lagos skyline and Atlantic ocean. This architectural masterwork features floor-to-ceiling glass, floating travertine marble stairs, a private wrap-around terrace sky-pool, and a dedicated 24-hour concierge service.',
    amenities: [
      'Sky Pool & Lounge',
      'Wrap-around Panoramic Terrace',
      '24-Hour Premium Concierge',
      'Private Elevator Access',
      'Triple-filtered Water Purification',
      'Private Wellness Spa',
      'Chef-grade Italian Kitchen'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '0.8 km' },
      { name: 'Corona Secondary School', distance: '1.9 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '0.5 km' },
      { name: 'St. Nicholas Hospital', distance: '2.2 km' }
    ],
    featured: true,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-p2',
    name: 'The Sapphire Ridge Penthouse',
    type: 'Penthouse',
    location: 'Victoria Island',
    address: 'Ligali Ayorinde High-Rise, Victoria Island, Lagos',
    price: 920000000, // ₦920M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 480,
    images: [
      minimalistLedVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rising majestically over the coastal commercial ridge of Victoria Island, Sapphire Ridge provides high-end corporate executives with an unparalleled live-work retreat. Comprising custom soundproofing, automated smart cooling zones, and a glass-enclosed infinity dipping spa.',
    amenities: [
      'Glass-Enclosed Infinity Spa',
      'Acoustic Soundproof Insulated Walls',
      'Zoned Smart Climate Matrix',
      'Biometric Direct Elevator Gate',
      'Executive Home Office Suite'
    ],
    schools: [
      { name: 'French School (Lycée Louis Pasteur)', distance: '1.2 km' },
      { name: 'American International School', distance: '2.1 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '0.9 km' },
      { name: 'Lagoon Hospital VI', distance: '2.5 km' }
    ],
    featured: true,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },
  {
    id: 'prop-p3',
    name: 'The Celestial Cloud Penthouse',
    type: 'Penthouse',
    location: 'Abuja',
    address: 'Maitama Towers, Maitama, Abuja',
    price: 1400000000, // ₦1.4B
    bedrooms: 4,
    bathrooms: 5,
    garage: 3,
    sqm: 590,
    images: [
      blackWhiteHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Elevated luxury in the political heartbeat of Nigeria. Maitama’s ultimate crown jewel penthouse occupies the entire top floors, offering 360-degree panoramas of the Presidential Villa and rolling hills, coupled with top-level private military-grade high-security clearance.',
    amenities: [
      'Helipad Access Deck',
      'Private 1500-Bottle Wine Vault',
      'Bulletproof Glass Pane Filters',
      'Private Resident Lift Lobby',
      '24/7 Secretariat Concierge Team',
      'Professional Grade Kitchen Setup'
    ],
    schools: [
      { name: 'The Regent Secondary School', distance: '1.5 km' },
      { name: 'AIS Abuja', distance: '3.6 km' }
    ],
    hospitals: [
      { name: 'Nizamiye Turkish Hospital', distance: '1.8 km' },
      { name: 'National Hospital Abuja', distance: '4.5 km' }
    ],
    featured: true,
    coordinates: { x: 68, y: 35 } // Abuja position
  },
  {
    id: 'prop-p4',
    name: 'The Solis Sky Terrace Penthouse',
    type: 'Penthouse',
    location: 'Lekki',
    address: 'Lekki Phase 1 Waterfront Towers, Lagos',
    price: 590000000, // ₦590M
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    sqm: 380,
    images: [
      geometricModernHouse,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A contemporary waterfront sky loft oriented perfectly to capture the sunrise across Lekki Link Bridge. It boasts a beautiful wooden pergola outdoor dining balcony, double-tier glass walls, custom teak paneling, and a cozy central firepit hearth.',
    amenities: [
      'Waterfront Pergola Balcony',
      'Lekki Link Bridge Viewfront',
      'Outdoor Firepit Hearth',
      'Custom African Teak Accents',
      'Premium Central AV Systems'
    ],
    schools: [
      { name: 'British International School', distance: '2.0 km' },
      { name: 'Meadow Hall School', distance: '4.8 km' }
    ],
    hospitals: [
      { name: 'Evercare Hospital Lekki', distance: '1.5 km' },
      { name: 'St. Nicholas Clinic Lekki', distance: '2.9 km' }
    ],
    featured: false,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-p5',
    name: 'The Apex Zenith Penthouse',
    type: 'Penthouse',
    location: 'Banana Island',
    address: 'Ocean Parade, Banana Island, Ikoyi, Lagos',
    price: 1850000000, // ₦1.85B
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    sqm: 710,
    images: [
      luxuryDuskVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rising to the peak of Ocean Parade, the Apex Zenith Penthouse is Nigeria’s definitive statement of high-rise living. Includes a private indoor plunge pool, complete Crestron control automation, customized climate cabinets, and spectacular views across Lagos lagoon channels.',
    amenities: [
      'Private Indoor Heated Plunge Pool',
      'Full Crestron Home Automation',
      'Lagoon and Atlantic View Meridian',
      'Water Osmosis Filtration System',
      'Private Resident Wellness Spa',
      'Four-car Covered Secured Garage'
    ],
    schools: [
      { name: 'Banana Island School', distance: '0.6 km' },
      { name: 'Corona Secondary School', distance: '3.8 km' }
    ],
    hospitals: [
      { name: 'Reddington Clinic Banana Island', distance: '0.4 km' },
      { name: 'First Cardiology Consultants', distance: '3.1 km' }
    ],
    featured: true,
    coordinates: { x: 38, y: 65 } // Banana Island position
  },

  // ==================== DUPLEXES ====================
  {
    id: 'prop-3',
    name: 'The Luminary Smart Duplex',
    type: 'Duplex',
    location: 'Victoria Island',
    address: 'Kofo Abayomi Street, Victoria Island, Lagos',
    price: 670000000, // ₦670M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 420,
    images: [
      minimalistLedVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Positioned in the financial heart of Victoria Island, this smart residence merges futuristic home automation with cozy mid-century design. Featuring voice-controlled lighting, dynamic climate sensors, soundproof windows, and a fully solar-integrated roofing system.',
    amenities: [
      'Voice-Activated Smart Controls',
      'Solar Roof Integrated Grid',
      'Soundproof Triple Glazing',
      'Private Courtyard Garden',
      'Zero-Edge Plunge Pool',
      'Underground Automated Garage'
    ],
    schools: [
      { name: 'American International School', distance: '1.5 km' },
      { name: 'French School (Lycée Louis Pasteur)', distance: '1.1 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '0.7 km' },
      { name: 'Paelon Memorial Hospital', distance: '1.4 km' }
    ],
    featured: false,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },
  {
    id: 'prop-d2',
    name: 'The Marble Arcade Duplex',
    type: 'Duplex',
    location: 'Lekki',
    address: 'Chevron Drive, Lekki, Lagos',
    price: 480000000, // ₦480M
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 390,
    images: [
      blackWhiteHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elegant high-contrast duplex featuring hand-selected Calacatta marble walls, custom warm-lit architectural columns, and double-height ceilings. Set inside a serene, private gated street with pristine eco-smart battery inverter backups.',
    amenities: [
      'Calacatta Marble Wall Accents',
      'Dynamic Column Uplighting',
      'Full Smart Power Inverters',
      'Detached Executive Maid’s BQ',
      'Fibre Optic Internet Hub'
    ],
    schools: [
      { name: 'Meadow Hall School', distance: '1.2 km' },
      { name: 'British International School', distance: '4.6 km' }
    ],
    hospitals: [
      { name: 'Vantage Health Center', distance: '0.8 km' },
      { name: 'Evercare Hospital Lekki', distance: '3.9 km' }
    ],
    featured: false,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-d3',
    name: 'The Onyx Linear Duplex',
    type: 'Duplex',
    location: 'Ikoyi',
    address: 'Bourdillon Road, Old Ikoyi, Lagos',
    price: 820000000, // ₦820M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 430,
    images: [
      minimalistDarkMansion,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A striking minimalist dark-charcoal masterwork combining linear architectural concrete with elegant recessed warm glows. Located along the premium Bourdillon green line, this duplex offers elite access, high security, and high-quality Italian fittings.',
    amenities: [
      'Recessed Warm LED Trims',
      'Floating Oakwood Staircase',
      'Fully Integrated Smart AV',
      'Dual Industrial Kitchen Setup',
      'Bespoke Walk-in Closets',
      'Fitted Water Osmosis Filter'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '1.4 km' },
      { name: 'Corona Secondary School', distance: '2.5 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '1.1 km' },
      { name: 'St. Nicholas Hospital', distance: '1.9 km' }
    ],
    featured: false,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-d4',
    name: 'The Platinum Vista Duplex',
    type: 'Duplex',
    location: 'Abuja',
    address: 'Wuse II Residential Estate, Abuja',
    price: 790000000, // ₦790M
    bedrooms: 5,
    bathrooms: 5,
    garage: 3,
    sqm: 510,
    images: [
      geometricModernHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A stunning multi-level family duplex inside Abuja’s most sought-after commercial-residential buffer. Characterized by wide-format modern lines, rich navy walls, bespoke brass fixtures, private guest suites, and a fully solar-supported generator-free backup.',
    amenities: [
      'Zoned Inverter Solar Grid',
      'Detached Double Story BQ',
      'Bespoke Brass Fixtures',
      'Dedicated Ground Cinema Room',
      'Paved Secured 3-Car Port'
    ],
    schools: [
      { name: 'The Regent Primary School', distance: '0.9 km' },
      { name: 'American International School', distance: '3.4 km' }
    ],
    hospitals: [
      { name: 'Nizamiye Hospital', distance: '2.1 km' },
      { name: 'National Hospital Abuja', distance: '3.8 km' }
    ],
    featured: true,
    coordinates: { x: 68, y: 35 } // Abuja position
  },
  {
    id: 'prop-d5',
    name: 'The Marina Cove Duplex',
    type: 'Duplex',
    location: 'Banana Island',
    address: 'Waterfront Drive, Banana Island, Ikoyi, Lagos',
    price: 1100000000, // ₦1.1B
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 490,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elite waterfront duplex offering access to private harbor slips and private water views. Crafted with polished white sandstones, wide glass walkways, deep wooden terraces, and advanced multi-point security systems.',
    amenities: [
      'Lagoon Access Platform',
      'Custom White Sandstone Facades',
      'Double Gated Security Buffer',
      'Centralised Smart Fire Matrix',
      'High Volume Open Living Rooms'
    ],
    schools: [
      { name: 'Banana Island School', distance: '0.8 km' },
      { name: 'St. Saviour’s School', distance: '3.5 km' }
    ],
    hospitals: [
      { name: 'Reddington Clinic Banana Island', distance: '0.5 km' },
      { name: 'Lagoon Hospital', distance: '4.2 km' }
    ],
    featured: false,
    coordinates: { x: 38, y: 65 } // Banana Island position
  },

  // ==================== MANSIONS ====================
  {
    id: 'prop-4',
    name: 'The Sovereign Waterfront Estate',
    type: 'Mansion',
    location: 'Banana Island',
    address: 'Coral Dr, Banana Island, Ikoyi, Lagos',
    price: 2500000000, // ₦2.5B
    bedrooms: 7,
    bathrooms: 8,
    garage: 5,
    sqm: 1250,
    images: [
      minimalistDarkMansion,
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An unparalleled masterpiece of high-society luxury, located on the highly coveted waterfront of Banana Island. Enjoy direct boat dock privileges, ultra-secured private entryways, high-security vault safe-rooms, and a massive heated saltwater pool merging seamlessly with the lagoon view.',
    amenities: [
      'Private Yacht Jetty & Dock',
      'Saltwater Heated Olympic Pool',
      'Military-Grade Safe Room',
      'Tennis & Basketball Court',
      'Dual Detached Guest Pavilions',
      'Professional Guard House',
      'Helipad Landing Access'
    ],
    schools: [
      { name: 'Banana Island School', distance: '0.4 km' },
      { name: 'Meadow Hall School', distance: '5.2 km' }
    ],
    hospitals: [
      { name: 'Reddington Clinic Banana Island', distance: '0.3 km' },
      { name: 'Lagoon Hospital', distance: '4.8 km' }
    ],
    featured: true,
    coordinates: { x: 38, y: 65 } // Banana Island position
  },
  {
    id: 'prop-m2',
    name: 'The Imperial Onyx Mansion',
    type: 'Mansion',
    location: 'Ikoyi',
    address: 'Queen’s Drive, Old Ikoyi, Lagos',
    price: 2100000000, // ₦2.1B
    bedrooms: 6,
    bathrooms: 7,
    garage: 4,
    sqm: 1100,
    images: [
      minimalistDarkMansion,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural titan showcasing a grand white-lit concrete staircase, majestic floor-to-ceiling visual glass panels, and deep moody tones. Anchored beautifully along Queen’s Drive, offering sweeping private waterfront garden views and complete executive privacy.',
    amenities: [
      'Grand Illuminated Staircase',
      'Private Lagoon-Side Garden',
      'Executive Panic Safety Vault',
      'Fully Automated Access Portal',
      'Full Industrial Prep Kitchen',
      '60KVA Automated Solar System'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '0.9 km' },
      { name: 'Corona Secondary School', distance: '1.7 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '0.7 km' },
      { name: 'St. Nicholas Hospital', distance: '2.5 km' }
    ],
    featured: true,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-m3',
    name: 'The Crown Jewel Palace',
    type: 'Mansion',
    location: 'Abuja',
    address: 'Maitama Hilltop Crest, Abuja',
    price: 1950000000, // ₦1.95B
    bedrooms: 7,
    bathrooms: 8,
    garage: 6,
    sqm: 1350,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched at the highest residential crest of Maitama, this majestic palace represents the zenith of federal estate power. Comprising bulletproof guard bunkers, expansive marble banquet rooms, a subterranean wellness wing, and private diplomatic gates.',
    amenities: [
      'Hilltop Panoramic Helipad',
      'Banquet Hall for 80 Guests',
      'Subterranean Wellness Spa & Pool',
      'Diplomacy-Grade Guard Bunker',
      'Six-car Automated Basement',
      'Dedicated Private Guest Wing'
    ],
    schools: [
      { name: 'American International School of Abuja', distance: '2.9 km' },
      { name: 'The Regent School', distance: '1.5 km' }
    ],
    hospitals: [
      { name: 'National Hospital Abuja', distance: '4.6 km' },
      { name: 'Nizamiye Hospital', distance: '2.8 km' }
    ],
    featured: true,
    coordinates: { x: 68, y: 35 } // Abuja position
  },
  {
    id: 'prop-m4',
    name: 'The Regent Waterline Mansion',
    type: 'Mansion',
    location: 'Lekki',
    address: 'Block 12, Lekki Phase 1 Waterfront, Lagos',
    price: 1350000000, // ₦1.35B
    bedrooms: 6,
    bathrooms: 6,
    garage: 4,
    sqm: 980,
    images: [
      luxuryDuskVilla,
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An modern architectural marvel located at the premium waterfront boundary of Lekki. Highlighted by striking cantilevered glass balconies, a custom saltwater pool, professional staff quarters, private jetty access, and complete smart control matrices.',
    amenities: [
      'Cantilevered Glass Balconies',
      'Custom Saltwater Pool',
      'Private Yacht Jetty Entry',
      'Crestron Smart-System Hub',
      'Detached Staff Quarters',
      'Soundproof Private Library'
    ],
    schools: [
      { name: 'British International School', distance: '1.3 km' },
      { name: 'Lekki British School', distance: '2.2 km' }
    ],
    hospitals: [
      { name: 'Evercare Hospital Lekki', distance: '1.9 km' },
      { name: 'Reddington Hospital', distance: '3.3 km' }
    ],
    featured: false,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-m5',
    name: 'The Grand Archway Manor',
    type: 'Mansion',
    location: 'Victoria Island',
    address: 'Bishop Aboyade Cole Street, Victoria Island, Lagos',
    price: 1600000000, // ₦1.6B
    bedrooms: 6,
    bathrooms: 7,
    garage: 4,
    sqm: 1050,
    images: [
      blackWhiteHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elegant black-and-white mansion framing beautiful geometric concrete portals. Located within the secure residential buffers of Victoria Island, this manor houses dynamic multi-tier entertainment lounges, automated garden sprinklers, and a large professional gym.',
    amenities: [
      'Geometric Concrete Portals',
      'Multi-tier Entertainment Lounge',
      'Automated Garden Sprinklers',
      'State-of-the-art Gym Wing',
      'Detached Executive Guest Lodge',
      'Full Home Automation Rack'
    ],
    schools: [
      { name: 'American International School', distance: '1.2 km' },
      { name: 'French School (Lycée Louis Pasteur)', distance: '1.8 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '0.5 km' },
      { name: 'Paelon Memorial Hospital', distance: '1.2 km' }
    ],
    featured: false,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },

  // ==================== APARTMENTS ====================
  {
    id: 'prop-5',
    name: 'The Pinnacle Heights Skyline',
    type: 'Apartment',
    location: 'Abuja',
    address: 'Maitama District, Abuja',
    price: 420000000, // ₦420M
    bedrooms: 3,
    bathrooms: 4,
    garage: 2,
    sqm: 290,
    images: [
      blackWhiteHouse,
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'This sleek, modern luxury apartment in Maitama, Abuja, offers outstanding city views combined with premium embassy-grade security. Featuring bespoke wooden paneled walls, custom brass light fittings, a gorgeous state-of-the-art kitchen, and full access to a private resident gymnasium and health club.',
    amenities: [
      'Embassy-Grade Bulletproof Security',
      'Resident Gymnasium & Spa',
      'Bespoke African Teak Joinery',
      'Integrated Miele Appliances',
      'Executive Boardrooms Access',
      'Valet Parking Services'
    ],
    schools: [
      { name: 'American International School of Abuja', distance: '2.8 km' },
      { name: 'The Regent School Maitama', distance: '1.2 km' }
    ],
    hospitals: [
      { name: 'National Hospital Abuja', distance: '4.1 km' },
      { name: 'Nizamiye Hospital', distance: '3.3 km' }
    ],
    featured: false,
    coordinates: { x: 68, y: 35 } // Abuja position
  },
  {
    id: 'prop-a2',
    name: 'The Azure Coastline Residence',
    type: 'Apartment',
    location: 'Victoria Island',
    address: 'Eko Atlantic City, Victoria Island, Lagos',
    price: 320000000, // ₦320M
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    sqm: 240,
    images: [
      geometricModernHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A stunning modern ocean-side apartment situated inside the ultra-modern Eko Atlantic City. Combining absolute state-of-the-art ecological infrastructure, high volume water plants, standard underground parking, and scenic sunset ocean viewpoints.',
    amenities: [
      'Oceanfront Viewing Windows',
      '24/7 Smart Eco Grid Power',
      'Underground Secured Carpark',
      'Fitted Italian Quartz Counters',
      'Fully Staffed Lobby Concierge'
    ],
    schools: [
      { name: 'American International School', distance: '2.5 km' },
      { name: 'French School (Lycée Louis Pasteur)', distance: '3.1 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '1.9 km' },
      { name: 'Paelon Memorial Hospital', distance: '2.6 km' }
    ],
    featured: false,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },
  {
    id: 'prop-a3',
    name: 'The Amber Horizon Suites',
    type: 'Apartment',
    location: 'Lekki',
    address: 'Fola Osibo Road, Lekki Phase 1, Lagos',
    price: 280000000, // ₦280M
    bedrooms: 2,
    bathrooms: 3,
    garage: 1,
    sqm: 180,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A gorgeous boutique luxury apartment offering outstanding accessibility in the lively social core of Lekki Phase 1. Complete with sleek modern finishings, customized modular kitchens, cozy private balconies, and robust security gates.',
    amenities: [
      'Modular Integrated Kitchen',
      'Cozy Sunset View Balcony',
      'High Speed Internet Hub',
      'Fitted Wardrobe Solutions',
      'Dedicated Security Team'
    ],
    schools: [
      { name: 'Lekki British School', distance: '1.1 km' },
      { name: 'British International School', distance: '2.8 km' }
    ],
    hospitals: [
      { name: 'Evercare Hospital Lekki', distance: '1.4 km' },
      { name: 'Vantage Health Center', distance: '0.9 km' }
    ],
    featured: false,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-a4',
    name: 'Old Ikoyi Sanctuary Apartments',
    type: 'Apartment',
    location: 'Ikoyi',
    address: 'Glover Road, Old Ikoyi, Lagos',
    price: 490000000, // ₦490M
    bedrooms: 3,
    bathrooms: 4,
    garage: 2,
    sqm: 275,
    images: [
      minimalistLedVilla,
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A gorgeous luxury flat surrounded by stately old trees and beautiful colonial heritage sites in Old Ikoyi. Incorporating private citizen elevators, a shared automated lap pool, fully wired fibre networks, and dedicated domestic quarters.',
    amenities: [
      'Stately Green Tree Canopy Views',
      'Shared Smart Automated Lap Pool',
      'Integrated Fiber Networking',
      'Dedicated Staff Quarter Slot',
      '24/7 Silent Hybrid Inverters'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '0.7 km' },
      { name: 'Corona Secondary School', distance: '1.5 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '0.9 km' },
      { name: 'St. Nicholas Hospital', distance: '2.1 km' }
    ],
    featured: true,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-a5',
    name: 'The Island Crest Sky-Suites',
    type: 'Apartment',
    location: 'Banana Island',
    address: 'Zone 4, Banana Island Estate, Ikoyi, Lagos',
    price: 680000000, // ₦680M
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    sqm: 310,
    images: [
      luxuryDuskVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultra-luxurious island apartments featuring absolute state-of-the-art building security, marble lobbies, high-volume central conditioning systems, a gorgeous resident gym, and secure boat launching docks.',
    amenities: [
      'Shared Boat Launching Docks',
      'Grand Polished Marble Lobby',
      'Central Climate Matrix',
      'High-Performance Resident Gym',
      'Triple redundant generator backings'
    ],
    schools: [
      { name: 'Banana Island School', distance: '0.5 km' },
      { name: 'Meadow Hall School', distance: '5.5 km' }
    ],
    hospitals: [
      { name: 'Reddington Clinic Banana Island', distance: '0.4 km' },
      { name: 'Lagoon Hospital', distance: '4.5 km' }
    ],
    featured: false,
    coordinates: { x: 38, y: 65 } // Banana Island position
  },

  // ==================== TOWNHOUSES ====================
  {
    id: 'prop-6',
    name: 'The Lumina Urban Townhouse',
    type: 'Townhouse',
    location: 'Lekki',
    address: 'VGC Chevron Drive, Lekki, Lagos',
    price: 580000000, // ₦580M
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 380,
    images: [
      geometricModernHouse,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece of contemporary space planning, located in a highly secured gated avenue. It is characterized by high-volume light shafts, minimalist linear aesthetics, an open concept indoor-outdoor kitchen, and a stunning third-floor rooftop BBQ deck.',
    amenities: [
      'Rooftop BBQ Garden Terrace',
      'Double-Volume Glass Skylight',
      'Secure Gated Estate Guard',
      'Central Surround Audio System',
      'Eco-Smart Inverter Power',
      'Detached Staff Quarters'
    ],
    schools: [
      { name: 'Meadow Hall School', distance: '1.4 km' },
      { name: 'British International School', distance: '5.5 km' }
    ],
    hospitals: [
      { name: 'Vantage Health Center', distance: '0.6 km' },
      { name: 'Evercare Hospital', distance: '4.2 km' }
    ],
    featured: true,
    coordinates: { x: 46, y: 78 } // Lekki Peninsula position
  },
  {
    id: 'prop-t2',
    name: 'The Bronze Linear Townhouse',
    type: 'Townhouse',
    location: 'Victoria Island',
    address: 'Oniru Mews Road, Victoria Island, Lagos',
    price: 510000000, // ₦510M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 360,
    images: [
      blackWhiteHouse,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A striking high-contrast multi-tier townhouse featuring customized bronze geometric facades and warm wooden pergolas. Nested within a fully gated residential bubble in Victoria Island, complete with robust smart home lighting matrices.',
    amenities: [
      'Bronze Geometric Window Trims',
      'Warm Timber Pergolas & Balcony',
      'Automated Access Control Portal',
      'Fibre Wired Audio Throughout',
      'Secure Triple Backup Inverters'
    ],
    schools: [
      { name: 'American International School', distance: '1.4 km' },
      { name: 'French School (Lycée Louis Pasteur)', distance: '1.9 km' }
    ],
    hospitals: [
      { name: 'Reddington Multi-specialist Hospital', distance: '1.1 km' },
      { name: 'Paelon Memorial Hospital', distance: '1.6 km' }
    ],
    featured: false,
    coordinates: { x: 28, y: 80 } // Victoria Island position
  },
  {
    id: 'prop-t3',
    name: 'The Saffron Row Townhouse',
    type: 'Townhouse',
    location: 'Ikoyi',
    address: 'Thompson Avenue, Old Ikoyi, Lagos',
    price: 640000000, // ₦640M
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 410,
    images: [
      luxuryWhiteVilla,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A stately high-end luxury row house along Old Ikoyi’s beautiful tree canopies. Designed with natural limestone finishes, warm indirect internal glows, private dipping splash pool, and professional guard buffers.',
    amenities: [
      'Natural Limestone Wall Clads',
      'Private Heated Dipping Pool',
      'Professional Guard Watch Post',
      'Staff Quarters with Ensuite',
      'Multi-Zone Climate Management'
    ],
    schools: [
      { name: 'St. Saviour’s School', distance: '1.2 km' },
      { name: 'Corona Secondary School', distance: '2.2 km' }
    ],
    hospitals: [
      { name: 'First Cardiology Consultants', distance: '0.8 km' },
      { name: 'St. Nicholas Hospital', distance: '2.4 km' }
    ],
    featured: false,
    coordinates: { x: 33, y: 72 } // Ikoyi position
  },
  {
    id: 'prop-t4',
    name: 'The Embassy Row Townhouses',
    type: 'Townhouse',
    location: 'Abuja',
    address: 'Diplomatic Enclave, Maitama, Abuja',
    price: 730000000, // ₦730M
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    sqm: 430,
    images: [
      minimalistLedVilla,
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Highly secured luxury townhomes within Abuja’s exclusive diplomatic enclave. Highlighted by high-contrast visual concrete geometries, smart-energy solar grids, professional-grade panic escape vaults, and premium guard controls.',
    amenities: [
      'Diplomacy-Grade Escapade Vault',
      'Full Roof Solar Energy Grid',
      'Automated Access Gates',
      'Recessed Warm-White Trim LEDs',
      'Detached Guard House BQ'
    ],
    schools: [
      { name: 'The Regent Secondary School', distance: '1.2 km' },
      { name: 'AIS Abuja', distance: '3.1 km' }
    ],
    hospitals: [
      { name: 'Nizamiye Hospital', distance: '2.4 km' },
      { name: 'National Hospital Abuja', distance: '4.2 km' }
    ],
    featured: true,
    coordinates: { x: 68, y: 35 } // Abuja position
  },
  {
    id: 'prop-t5',
    name: 'The Water’s Edge Townhouse',
    type: 'Townhouse',
    location: 'Banana Island',
    address: 'Harbor Gate, Banana Island, Ikoyi, Lagos',
    price: 950000000, // ₦950M
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    sqm: 460,
    images: [
      minimalistDarkMansion,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elite multi-level townhouse set directly at the coveted harbor entrance of Banana Island. Boasting direct visual water coordinates, premium yacht docking facilities, floating timber steps, and advanced air purifier grids.',
    amenities: [
      'Direct Harbor view Balcony',
      'Custom Yacht Slip Dock',
      'Floating Teak Steps',
      'Wired Crestron Lighting Matrix',
      'Dedicated domestic helpers wing'
    ],
    schools: [
      { name: 'Banana Island School', distance: '0.4 km' },
      { name: 'St. Saviour’s School', distance: '3.6 km' }
    ],
    hospitals: [
      { name: 'Reddington Clinic Banana Island', distance: '0.3 km' },
      { name: 'Lagoon Hospital', distance: '4.9 km' }
    ],
    featured: true,
    coordinates: { x: 38, y: 65 } // Banana Island position
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alhaji Abdulrasheed Alao',
    role: 'Chairman, Alao Investments',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The absolute pinnacle of luxury real estate in West Africa. Prestige Homes handled our Banana Island mansion purchase with flawless confidentiality and legal precision.'
  },
  {
    id: 'test-2',
    name: 'Dr. Chinedu Okafor',
    role: 'Co-Founder, Helium Health',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Their premium service was unbelievable. Moving into our Maitama Penthouse in Abuja was perfectly seamless, with complete tech-smart integration waiting for us.'
  },
  {
    id: 'test-3',
    name: 'Toluwalope Adesina',
    role: 'Creative Director, Zircon Design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I am highly particular about architecture and lighting. Prestige Homes understood my aesthetic completely and found us a magnificent waterfront property.'
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    title: 'Verified Listings',
    description: 'Every property undergoes a 27-point legal, structural, and financial validation audit before hitting our catalog.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Trusted Agents',
    description: 'Our realtors are vetted luxury specialists with deeper insider knowledge of premium neighborhoods.',
    iconName: 'UserCheck'
  },
  {
    title: 'Legal Assistance',
    description: 'Enjoy frictionless legal processing, documentation vetting, and deed transfer directly via our in-house law council.',
    iconName: 'FileText'
  },
  {
    title: 'Mortgage Support',
    description: 'We partner with elite private banking institutions to secure preferred premium interest rates up to ₦2B.',
    iconName: 'DollarSign'
  },
  {
    title: 'Investment Guidance',
    description: 'Get deep quantitative market analysis and projected 10-year capital appreciation charts for any property.',
    iconName: 'TrendingUp'
  },
  {
    title: 'Premium Customer Service',
    description: 'A lifelong commitment. Enjoy post-sale maintenance, 24/7 emergency repair dispatch, and landscaping support.',
    iconName: 'Heart'
  }
];

export const STATS = [
  { value: 500, label: 'Luxury Homes Handled', suffix: '+' },
  { value: 1200, label: 'Happy Families Housed', suffix: '+' },
  { value: 120, label: 'Property Value Vetted', suffix: 'B ₦' },
  { value: 15, label: 'Years Vetted Experience', suffix: ' Yrs' }
];
