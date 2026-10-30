import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { MapPin, Star } from "@/components/ui/icons";
import BookVenueButton from "@/components/venues/BookVenueButton";
import { ISport } from "@/types/sports.types";

interface IVenueCardProps {
  venue: ISport
}

export default function VenueCard({ venue }: IVenueCardProps) {
  return (
    <article className="group card overflow-hidden transition-colors duration-300 hover:border-brand-400/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={venue.image}
          alt={`${venue.name} — ${venue.sport} venue in ${venue.location}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
            {venue.sport}
          </span>
          {venue.badge ? (
            <span className="rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-[#08090c]">
              {venue.badge}
            </span>
          ) : null}
        </div>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold backdrop-blur">
          <Star className="size-3.5 text-brand-400" />
          {venue.rating}
          <span className="font-normal text-muted">({venue.reviews})</span>
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{venue.name}</h3>
          <p className="shrink-0 text-right text-sm font-semibold text-brand-400">
            {formatPrice(venue.price)}
            <span className="block text-[11px] font-normal text-muted">
              per hour
            </span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4 shrink-0" />
          {venue.location}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <span className="text-xs text-muted">
            {venue.slots.length > 0
              ? `Next slot · Today ${venue.slots[3] ?? venue.slots[0]}`
              : "Open today · See slots"}
          </span>
          <BookVenueButton venue={venue} />
        </div>
      </div>
    </article>
  );
}
