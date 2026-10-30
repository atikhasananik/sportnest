import Image from "next/image";
import Link from "next/link";
import { siteStats } from "@/data/site";
import { ArrowRight, MapPin, Star } from "@/components/ui/icons";

const heroImage =
  "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=80";

export default function Hero() {
  return (
    <section className="section relative overflow-hidden pt-14 my-5 py-5 sm:pt-20 lg:pt-28">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-brand-500/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[420px] rounded-full bg-brand-700/10 blur-[120px]"
      />

      <div className="shell relative grid items-center gap-14 sm:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="eyebrow">
            <span className="size-1.5 animate-pulse rounded-full bg-brand-400" />
            170+ venues live across Dhaka
          </span>

          <h1 className="mt-6 max-w-xl text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl xl:text-7xl">
            Find your game.
            <br />
            Book the{" "}
            <span className="relative inline-block text-brand-400">
              court.
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                fill="none"
                className="absolute -bottom-2 left-0 w-full text-brand-500/60"
              >
                <path
                  d="M2 9c40-7 120-8 196-3"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            From floodlit football turfs to rooftop basketball hoops —
            discover, compare, and lock in your slot in under a minute.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/all-sports" className="btn-primary">
              Explore sports
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/add-sports" className="btn-secondary">
              List your venue
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {siteStats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-ink">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent blur-2xl"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-square lg:aspect-[4/4.5]">
            <Image
              src={heroImage}
              alt="Badminton player mid-smash on an indoor court"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <Star className="size-3.5 text-brand-400" />
              4.9
              <span className="font-normal text-muted">(2.1k reviews)</span>
            </span>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-400">
                    Next available today
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Smash Point · Court 2
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-[#08090c]">
                  6:30 PM
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brand-400" />
                  Dhanmondi, Dhaka
                </span>
                <span>৳800 / hr</span>
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-4 py-2 text-xs font-medium shadow-xl backdrop-blur sm:inline-flex">
            <span className="grid size-5 place-items-center rounded-full bg-brand-500 text-[#08090c]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            Instant confirmation
          </div>
        </div>
      </div>
    </section>
  );
}
