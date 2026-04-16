import saudiHajjImg from './assets/sauddi.png';

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
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-saudi',
    name: 'Saudi Hajj & Umrah',
    country: 'Saudi Arabia',
    image: saudiHajjImg,
    description: 'Experience the spiritual journey of a lifetime with our dedicated Hajj and Umrah services.',
    featured: true,
    category: 'International'
  },
  {
    id: 'dest-dubai',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the pinnacle of luxury and modern architecture.',
    featured: true,
    category: 'International'
  },
  {
    id: 'dest-uk',
    name: 'United Kingdom',
    country: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    description: 'Explore the rich history and royal heritage of the UK.',
    featured: true,
    category: 'International'
  },
  {
    id: 'dest-canada',
    name: 'Canada',
    country: 'North America',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80&w=800',
    description: 'Breathtaking cityscapes and vibrant culture await in the Great North.',
    featured: true,
    category: 'International'
  }
];

export const PACKAGES: TourPackage[] = [
  {
    id: 'pkg-saudi',
    title: 'Saudi Hajj & Umrah Package',
    destination: 'Makkah & Madinah',
    duration: '15 Days, 14 Nights',
    price: 0,
    image: saudiHajjImg,
    rating: 5.0,
    reviews: 245,
    highlights: ['Ziyarat in Makkah', 'Ziyarat in Madinah', 'Guided Religious Tours'],
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah', description: 'Transfer to Makkah and check-in to your hotel near the Haram.' },
      { day: 2, title: 'Umrah Performance', description: 'Guided Umrah performance with our experienced religious guides.' }
    ]
  },
  {
    id: 'pkg-dubai',
    title: 'Dubai Luxury Experience',
    destination: 'Dubai, UAE',
    duration: '7 Days, 6 Nights',
    price: 0,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 210,
    highlights: ['Burj Khalifa Visit', 'Desert Safari', 'Palm Jumeirah'],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', description: 'Check into your luxury hotel with views of the Burj Khalifa.' }
    ]
  },
  {
    id: 'pkg-uk',
    title: 'United Kingdom Royal Tour',
    destination: 'London, Edinburgh, Cotswolds',
    duration: '12 Days, 11 Nights',
    price: 0,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 142,
    highlights: ['Buckingham Palace', 'Edinburgh Castle', 'Stonehenge'],
    itinerary: [
      { day: 1, title: 'Arrival in London', description: 'Welcome to London. Private transfer to your hotel in Mayfair.' }
    ]
  },
  {
    id: 'pkg-canada',
    title: 'Canada Trip Holiday',
    destination: 'Vancouver, Toronto, Montreal',
    duration: '14 Days, 13 Nights',
    price: 0,
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 98,
    highlights: ['CN Tower Visit', 'Vancouver Waterfront', 'Old Montreal Tour'],
    itinerary: [
      { day: 1, title: 'Arrival in Vancouver', description: 'Explore the beautiful coastal city of Vancouver and its vibrant downtown.' }
    ]
  }
];
