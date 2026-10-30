export type Venue = {
  id: string;
  name: string;
  sport: string;
  sportSlug: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  featured?: boolean;
  slots: string[];
};

const defaultSlots = ["06:00 AM", "07:30 AM", "05:00 PM", "06:30 PM", "08:00 PM"];

export const venues: Venue[] = [
  {
    id: "court-house",
    name: "The Court House",
    sport: "Basketball",
    sportSlug: "basketball",
    location: "Gulshan 2, Dhaka",
    price: 1200,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    badge: "Most booked",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "green-turf",
    name: "Green Turf Arena",
    sport: "Football",
    sportSlug: "football",
    location: "Bashundhara R/A, Dhaka",
    price: 2500,
    rating: 4.8,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    badge: "Floodlights",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "smash-point",
    name: "Smash Point",
    sport: "Badminton",
    sportSlug: "badminton",
    location: "Dhanmondi, Dhaka",
    price: 800,
    rating: 4.7,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1613918431703-aa50889e3be9?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "baseline-club",
    name: "Baseline Tennis Club",
    sport: "Tennis",
    sportSlug: "tennis",
    location: "Baridhara, Dhaka",
    price: 1500,
    rating: 4.9,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80",
    badge: "Coaching available",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "aqua-zone",
    name: "Aqua Zone",
    sport: "Swimming",
    sportSlug: "swimming",
    location: "Uttara, Dhaka",
    price: 600,
    rating: 4.6,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "mirpur-ground",
    name: "Mirpur Cricket Ground",
    sport: "Cricket",
    sportSlug: "cricket",
    location: "Mirpur, Dhaka",
    price: 3000,
    rating: 4.8,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
    badge: "Turf wicket",
    featured: true,
    slots: defaultSlots,
  },
  {
    id: "iron-yard",
    name: "Iron Yard Gym",
    sport: "Gym & Fitness",
    sportSlug: "gym",
    location: "Banani, Dhaka",
    price: 500,
    rating: 4.7,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    slots: defaultSlots,
  },
  {
    id: "spike-club",
    name: "Spike Beach Club",
    sport: "Volleyball",
    sportSlug: "volleyball",
    location: "Purbachal, Dhaka",
    price: 1000,
    rating: 4.5,
    reviews: 39,
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
    badge: "Beach court",
    slots: defaultSlots,
  },
];

export const featuredVenues = venues.filter((venue) => venue.featured);
