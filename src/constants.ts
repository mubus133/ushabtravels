export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  featured: boolean;
  category: 'International' | 'Local';
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the breathtaking sunsets and iconic blue-domed churches.',
    featured: true,
    category: 'International'
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'A tropical paradise with lush jungles and serene beaches.',
    featured: true,
    category: 'International'
  },
  {
    id: '3',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    description: 'Modern luxury meets desert adventure in the city of gold.',
    featured: true,
    category: 'International'
  },
  {
    id: '4',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    description: 'Crystal clear waters and overwater villas for the ultimate escape.',
    featured: false,
    category: 'International'
  }
];

export const PACKAGES: TourPackage[] = [
  {
    id: 'pkg-1',
    title: 'European Grandeur Tour',
    destination: 'Paris, Rome, Amsterdam',
    duration: '12 Days, 11 Nights',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    highlights: ['Eiffel Tower Dinner', 'Colosseum Guided Tour', 'Canal Cruise'],
    itinerary: [
      { day: 1, title: 'Arrival in Paris', description: 'Welcome to the City of Light. Transfer to your luxury hotel.' },
      { day: 2, title: 'Paris City Tour', description: 'Visit the Louvre, Notre Dame, and enjoy a Seine river cruise.' }
    ],
    inclusions: ['Luxury Accommodation', 'Daily Breakfast', 'Professional Guide', 'Airport Transfers'],
    exclusions: ['International Flights', 'Personal Expenses', 'Travel Insurance']
  },
  {
    id: 'pkg-2',
    title: 'Exotic Bali Retreat',
    destination: 'Ubud & Seminyak',
    duration: '7 Days, 6 Nights',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 85,
    highlights: ['Ubud Monkey Forest', 'Rice Terrace Trekking', 'Beachfront Spa'],
    itinerary: [
      { day: 1, title: 'Ubud Arrival', description: 'Check into your jungle villa and enjoy a traditional welcome.' }
    ],
    inclusions: ['Villa Stay', 'Yoga Sessions', 'Cultural Tours'],
    exclusions: ['Lunch & Dinner', 'Visa Fees']
  }
];
