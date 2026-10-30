import Link from "next/link";
import { MapPin, Zap } from "@/components/ui/icons";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { getAllSportsData, getSportCategories } from "@/data/sportsData";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/all-sports", label: "All Sports" },
  { href: "/add-sports", label: "Add Sports" },
  { href: "/my-bookings", label: "My Bookings" },
];

const sports = getSportCategories(await getAllSportsData())

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-surface/40">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-[#08090c]">
                <Zap className="size-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Sport<span className="text-brand-400">Nest</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              The easiest way to find, compare, and book sports venues around
              you. Less calling, more playing.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin className="size-4 text-brand-400" />
              Gulshan 1, Dhaka, Bangladesh
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              Popular sports
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {sports.slice(0, 5).map((sport) => (
                <li key={sport.slug}>
                  <Link
                    href={`/all-sports?sport=${sport.slug}`}
                    className="text-muted transition-colors hover:text-brand-400"
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              Stay in the game
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              New venues and weekend slots, straight to your inbox. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SportNest. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
            <span className="cursor-default">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
