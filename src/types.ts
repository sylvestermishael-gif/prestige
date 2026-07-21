/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  name: string;
  type: 'Villa' | 'Penthouse' | 'Duplex' | 'Mansion' | 'Apartment' | 'Townhouse';
  location: 'Lekki' | 'Ikoyi' | 'Victoria Island' | 'Banana Island' | 'Abuja';
  address: string;
  price: number; // in Naira (e.g. 850000000 for ₦850M)
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqm: number;
  images: string[];
  description: string;
  amenities: string[];
  schools: { name: string; distance: string }[];
  hospitals: { name: string; distance: string }[];
  featured: boolean;
  coordinates: { x: number; y: number }; // Relative coordinates for our premium interactive vector map (0-100)
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface TimelineItem {
  title: string;
  description: string;
  iconName: string;
}

export interface SearchFilters {
  location: string;
  propertyType: string;
  budgetRange: string;
  bedrooms: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  notes: string;
  timestamp: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Declined';
}
