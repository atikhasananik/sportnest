"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { initialBookings, type Booking } from "@/data/bookings";
import {
  getBookingsServerSnapshot,
  getBookingsSnapshot,
  removeStoredBooking,
  subscribeToBookings,
} from "@/lib/bookings";
import { formatPrice } from "@/lib/format";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  X,
} from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";
import { getAllSportsData, getSportCategories } from "@/data/sportsData";

const sports = getSportCategories(await getAllSportsData())

type Filter = "upcoming" | "past";

function sportSlugFor(sportName: string) {
  return sports.find((sport) => sport.name === sportName)?.slug;
}

export default function BookingsList() {
  const { toast } = useToast();
  const storedBookings = useSyncExternalStore(
    subscribeToBookings,
    getBookingsSnapshot,
    getBookingsServerSnapshot,
  );
  const [cancelledIds, setCancelledIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>("upcoming");

  const allBookings = [...storedBookings, ...initialBookings];
  const upcoming = allBookings.filter(
    (booking) =>
      booking.status === "upcoming" && !cancelledIds.includes(booking.id),
  );
  const past = allBookings.filter(
    (booking) =>
      booking.status === "completed" || cancelledIds.includes(booking.id),
  );
  const visible = filter === "upcoming" ? upcoming : past;

  function cancelBooking(booking: Booking) {
    const isStored = storedBookings.some((item) => item.id === booking.id);

    if (isStored) {
      removeStoredBooking(booking.id);
      toast({
        variant: "danger",
        title: `Booking #${booking.id} cancelled`,
        description: `${booking.venue} · ${booking.date} · ${booking.time}`,
      });
      return;
    }

    setCancelledIds((current) => [...current, booking.id]);
    toast({
      variant: "danger",
      title: `Booking #${booking.id} cancelled`,
      description: `${booking.venue} · ${booking.date} · ${booking.time}`,
    });
  }

  return (
    <div className="mt-8">
      <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
        {(
          [
            { key: "upcoming", label: "Upcoming", count: upcoming.length },
            { key: "past", label: "Past", count: past.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            aria-pressed={filter === tab.key}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
              filter === tab.key
                ? "bg-brand-500 text-[#08090c]"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 space-y-4">
          {visible.map((booking) => {
            const isCancelled = cancelledIds.includes(booking.id);
            const statusLabel = isCancelled
              ? "Cancelled"
              : booking.status === "upcoming"
                ? "Confirmed"
                : "Completed";
            const slug = sportSlugFor(booking.sport);

            return (
              <article key={booking.id} className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-44">
                    <Image
                      src={booking.image}
                      alt={`${booking.venue} — ${booking.sport}`}
                      fill
                      sizes="(min-width: 640px) 176px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r" />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-400">
                          {booking.sport}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            isCancelled
                              ? "border-white/10 bg-white/5 text-muted"
                              : booking.status === "upcoming"
                                ? "border-brand-500/20 bg-brand-500/10 text-brand-400"
                                : "border-white/10 bg-white/5 text-muted"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      <h2 className="mt-1.5 text-lg font-semibold tracking-tight">
                        {booking.venue}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-3.5" />
                          {booking.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          {booking.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" />
                          {booking.location}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-brand-400">
                        {formatPrice(booking.price)}
                        <span className="ml-1.5 text-xs font-normal text-muted">
                          · Booking #{booking.id}
                        </span>
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                      {booking.status === "upcoming" && !isCancelled ? (
                        <button
                          type="button"
                          onClick={() => cancelBooking(booking)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-red-400/40 hover:text-red-300"
                        >
                          <X className="size-3.5" />
                          Cancel
                        </button>
                      ) : null}
                      <Link
                        href={
                          slug ? `/all-sports?sport=${slug}` : "/all-sports"
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-[#08090c] transition-colors hover:bg-brand-400"
                      >
                        Book again
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card mt-6 flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-white/5 text-muted">
            <Calendar className="size-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            {filter === "upcoming"
              ? "No upcoming games yet"
              : "Nothing in your history"}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {filter === "upcoming"
              ? "Your next match is one booking away. Find a venue and lock in a slot."
              : "Completed and cancelled bookings will show up here."}
          </p>
          <Link href="/all-sports" className="btn-primary mt-6">
            Find a venue
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
