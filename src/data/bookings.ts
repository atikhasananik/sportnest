export type BookingStatus = "upcoming" | "completed";

export type Booking = {
  id: string;
  venueId: string;
  venue: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  image: string;
};

export const initialBookings: Booking[] = [
  {
    id: "SN-2041",
    venueId: "court-house",
    venue: "The Court House",
    sport: "Basketball",
    location: "Gulshan 2, Dhaka",
    date: "Sat, 31 Oct",
    time: "06:30 PM – 08:00 PM",
    price: 1800,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "SN-2038",
    venueId: "smash-point",
    venue: "Smash Point",
    sport: "Badminton",
    location: "Dhanmondi, Dhaka",
    date: "Sun, 01 Nov",
    time: "07:30 AM – 08:30 AM",
    price: 800,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1613918431703-aa50889e3be9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "SN-1987",
    venueId: "green-turf",
    venue: "Green Turf Arena",
    sport: "Football",
    location: "Bashundhara R/A, Dhaka",
    date: "Sun, 18 Oct",
    time: "08:00 PM – 09:30 PM",
    price: 3750,
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
  },
];
