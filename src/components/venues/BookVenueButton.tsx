"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { formatPrice } from "@/lib/format";
import { storeBooking } from "@/lib/bookings";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Info,
  MapPin,
  X,
} from "@/components/ui/icons";
import { ISport } from "@/types/sports.types";

interface IBookVenueButtonProps {
  venue:ISport
}

export default function BookVenueButton({ venue }: IBookVenueButtonProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(venue.slots[0]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function openModal() {
    setSlot(venue.slots[0]);
    setConfirmed(false);
    setOpen(true);

    if (venue.slots.length === 0) {
      toast({
        variant: "info",
        title: "No open slots today",
        description: `${venue.name} hasn't published slots yet — they usually open at 6 AM.`,
      });
    }
  }

  function confirmBooking() {
    if (!slot) {
      toast({
        variant: "info",
        title: "No open slots today",
        description: `${venue.name} hasn't published slots yet — check back tomorrow.`,
      });
      return;
    }

    storeBooking({
      id: `SN-${String(Date.now()).slice(-5)}`,
      venueId: venue._id,
      venue: venue.name,
      sport: venue.sport,
      location: venue.location,
      date: "Today",
      time: slot,
      price: venue.price,
      status: "upcoming",
      image: venue.image,
    });
    setConfirmed(true);
    toast({
      variant: "success",
      title: "Booking confirmed",
      description: `${venue.name} · Today · ${slot}`,
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-400/50 hover:bg-brand-500 hover:text-[#08090c]"
      >
        Book now
        <ArrowRight className="size-3.5" />
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Book ${venue.name}`}
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
            >
              <button
                type="button"
                aria-label="Close booking dialog"
                onClick={() => setOpen(false)}
                className="absolute inset-0 cursor-default"
              />

              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/60">
                <div className="relative h-40">
                  <Image
                    src={venue.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 448px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/50 text-ink backdrop-blur transition-colors hover:bg-black/70"
                  >
                    <X className="size-4" />
                  </button>

                  <div className="absolute inset-x-5 bottom-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-400">
                      {venue.sport}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">
                      {venue.name}
                    </h2>
                  </div>
                </div>

                {confirmed ? (
                  <div className="p-6 text-center">
                    <CheckCircle className="mx-auto size-12 text-brand-400" />
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      You&apos;re booked!
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {venue.name} · Today · {slot}
                    </p>
                    <div className="mt-6 flex flex-col gap-2">
                      <Link href="/my-bookings" className="btn-primary">
                        View my bookings
                        <ArrowRight className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="btn-secondary"
                      >
                        Keep browsing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4 text-brand-400" />
                        {venue.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4 text-brand-400" />
                        {formatPrice(venue.price)} / hour
                      </span>
                    </div>

                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Pick a slot · Today
                    </p>
                    {venue.slots.length > 0 ? (
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {venue.slots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSlot(time)}
                            aria-pressed={slot === time}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                              slot === time
                                ? "border-brand-400 bg-brand-500/10 text-brand-400"
                                : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-ink"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-muted">
                        <Info className="mt-0.5 size-4 shrink-0 text-brand-300" />
                        No slots published for today. They usually open at 6 AM
                        — check back tomorrow.
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={confirmBooking}
                      disabled={!slot}
                      className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {slot
                        ? `Confirm booking · ${formatPrice(venue.price)}`
                        : "No slots available"}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-muted">
                      Demo booking — no payment is taken.
                    </p>
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
