import Link from "next/link";
import { ISport } from "@/types/sports.types";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight, SportIcon } from "@/components/ui/icons";




export default async function SportGrid() {
const res = await fetch('http://localhost:8000/get-sports/8', {
    next: { revalidate: 30 },
  })
  const sportsData = await res.json() as ISport[]
  return (
    <section className="section my-5 py-5">
      <div className="shell">
        <SectionHeading
          eyebrow="Browse by sport"
          title="Pick your playground"
          description="Eight sports, one booking flow. Every venue is verified, every slot is live."
          action={{ href: "/all-sports", label: "View all sports" }}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sportsData.map((sport) => (
            <Link
              key={sport.sportSlug}
              href={`/all-sports?sport=${sport.sportSlug}`}
              className="group card relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-brand-500/0 blur-2xl transition-colors duration-300 group-hover:bg-brand-500/15"
              />

              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-surface-2 text-brand-400 transition-colors duration-300 group-hover:border-brand-400/40 group-hover:bg-brand-500 group-hover:text-[#08090c]">
                  <SportIcon name={sport.name} className="size-6" />
                </span>
                <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400" />
              </div>

              <h3 className="relative mt-5 font-semibold tracking-tight">
                {sport.name}
              </h3>
              <p className="relative mt-1 text-sm text-muted">
                {sport.sport}
              </p>
              <p className="relative mt-4 text-xs font-medium text-muted">
                <span className="text-brand-400">{sport.reviews}</span> venues
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
