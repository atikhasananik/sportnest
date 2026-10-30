import type { Metadata } from "next";
import Link from "next/link";
import BookingsList from "@/components/bookings/BookingsList";
import { Plus } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "My Bookings",
  description:
    "See your upcoming games, past bookings, and cancel or rebook in one tap.",
};

export default function MyBookingsPage() {
  return (
    <div className="shell section pt-14 sm:pt-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Your schedule</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            My bookings
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Every game you&apos;ve locked in, in one place. Cancel a slot or
            book the same venue again.
          </p>
        </div>

        <Link href="/all-sports" className="btn-primary shrink-0">
          <Plus className="size-4" />
          Book another game
        </Link>
      </div>

      <BookingsList />
    </div>
  );
}
