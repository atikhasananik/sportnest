import type { Booking } from "@/data/bookings";

const STORAGE_KEY = "sportnest:bookings";
const EMPTY: Booking[] = [];

let cachedRaw: string | null = null;
let cachedBookings: Booking[] = EMPTY;

function parseBookings(raw: string | null): Booking[] {
  if (!raw) return EMPTY;

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getBookingsSnapshot(): Booking[] {
  if (typeof window === "undefined") return EMPTY;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedBookings = parseBookings(raw);
  }

  return cachedBookings;
}

export function getBookingsServerSnapshot(): Booking[] {
  return EMPTY;
}

export function subscribeToBookings(onChange: () => void) {
  const handleChange = () => onChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener("sportnest:bookings", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("sportnest:bookings", handleChange);
  };
}

function writeBookings(bookings: Booking[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event("sportnest:bookings"));
}

export function storeBooking(booking: Booking) {
  if (typeof window === "undefined") return;
  writeBookings([booking, ...getBookingsSnapshot()]);
}

export function removeStoredBooking(id: string) {
  if (typeof window === "undefined") return;
  writeBookings(
    getBookingsSnapshot().filter((booking) => booking.id !== id),
  );
}
