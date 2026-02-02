import type { Vehicle } from './types';

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
      'https://images.unsplash.com/photo-1722088353797-ddfe6e2faf34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzZWRhbiUyMGNhcnxlbnwwfHx8fDE3NjUyNDQ3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1533630217389-3a5e4dff5683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjYXIlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjUyMjExODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1712319850454-f4ba54e9208d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjYXIlMjB3aGVlbHxlbnwwfHx8fDE3NjUyMjc2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
      'https://images.unsplash.com/photo-1654159866298-e3c8ee93e43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzdXYlMjBjYXJ8ZW58MHx8fHwxNzY1MTYxMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1748214311893-47e4fd10282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdXYlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjUxODU0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
      'https://images.unsplash.com/photo-1506610654-064fbba4780c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzcG9ydHMlMjBjYXJ8ZW58MHx8fHwxNzY1MjIwMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1566215963619-ba25312fc9ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzcG9ydHNjYXIlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjUyNDYzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
      'https://images.unsplash.com/photo-1551830820-330a71b99659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaWNrdXAlMjB0cnVja3xlbnwwfHx8fDE3NjUxNDMzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
      'https://images.unsplash.com/photo-1597588561267-7a9507649ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNlZGFufGVufDB8fHx8MTc2NTE1NDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
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
      'https://images.unsplash.com/photo-1569398890582-1943b9a5c94b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncmV5JTIwc3V2fGVufDB8fHx8MTc2NTI0NjMwNXww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];
