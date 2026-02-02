import type { Vehicle } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageUrl || '';
const getGallery = (ids: string[]) => ids.map(id => getImage(id)).filter(url => url);

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 75000000,
    mileage: 15000,
    engine: 'Électrique',
    transmission: 'Automatique',
    fuelType: 'Électrique',
    description: 'Une berline de luxe entièrement électrique avec une accélération fulgurante, une longue autonomie et une technologie de pointe. Parfait pour la conduite en ville et les longs trajets.',
    features: ['Autopilot', 'Toit en verre panoramique', 'Écran tactile 17"', 'Intérieur Premium'],
    images: [
      getImage('sedan-1'),
      ...getGallery(['sedan-1-gallery-1', 'sedan-1-gallery-2'])
    ],
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'RAV4',
    year: 2022,
    price: 25000000,
    mileage: 30000,
    engine: '2.5L 4-Cyl',
    transmission: 'Automatique',
    fuelType: 'Hybride',
    description: 'Un SUV compact, fiable et économe en carburant. Le Toyota RAV4 est idéal pour les familles, offrant un grand espace de chargement et des caractéristiques de sécurité avancées.',
    features: ['Toyota Safety Sense 2.0', 'Apple CarPlay', 'Toit ouvrant', 'AWD'],
    images: [
      getImage('suv-1'),
      ...getGallery(['suv-1-gallery-1'])
    ],
  },
  {
    id: '3',
    make: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price: 120000000,
    mileage: 5000,
    engine: '3.0L Twin-Turbo Flat-6',
    transmission: 'Automatique',
    fuelType: 'Essence',
    description: 'L\'emblématique voiture de sport avec des performances à couper le souffle et un design intemporel. Découvrez le plaisir de conduire à son état le plus pur.',
    features: ['Pack Sport Chrono', 'Système audio Burmester', 'Sièges Sport Plus', 'Phares matriciels à LED'],
    images: [
      getImage('sportscar-1'),
      ...getGallery(['sportscar-1-gallery-1'])
    ],
  },
  {
    id: '4',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    price: 45000000,
    mileage: 45000,
    engine: '3.5L V6 EcoBoost',
    transmission: 'Automatique',
    fuelType: 'Essence',
    description: 'Le pick-up le plus vendu en Amérique, connu pour sa robustesse, sa capacité de remorquage et sa polyvalence. Parfait pour le travail et les loisirs.',
    features: ['Pro Power Onboard', 'Écran tactile 12"', 'Ensemble FX4 Off-Road', 'Hayon électrique'],
    images: [
      getImage('truck-1'),
    ],
  },
  {
    id: '5',
    make: 'BMW',
    model: 'Série 5',
    year: 2022,
    price: 55000000,
    mileage: 22000,
    engine: '2.0L 4-Cyl Turbo',
    transmission: 'Automatique',
    fuelType: 'Essence',
    description: 'Une berline exécutive qui allie luxe, confort et performance. La BMW Série 5 offre une expérience de conduite dynamique et une cabine sophistiquée remplie de technologie.',
    features: ['Live Cockpit Pro', 'Aide au stationnement', 'Sièges chauffants', 'Éclairage d\'ambiance'],
    images: [
      getImage('sedan-2'),
    ],
  },
  {
    id: '6',
    make: 'Audi',
    model: 'Q5',
    year: 2023,
    price: 65000000,
    mileage: 8000,
    engine: '2.0L 4-Cyl Turbo',
    transmission: 'Automatique',
    fuelType: 'Hybride',
    description: 'Un SUV de luxe qui offre une conduite douce, un intérieur de haute technologie et un style sophistiqué. L\'Audi Q5 est parfait pour ceux qui recherchent confort et prestige.',
    features: ['Virtual Cockpit', 'Système audio Bang & Olufsen', 'Quattro AWD', 'Intérieur cuir'],
    images: [
      getImage('suv-2')
    ]
  }
];
