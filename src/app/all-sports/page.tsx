import type { Metadata } from "next";
import SportsExplorer from "@/components/sports/SportsExplorer";
import { ISport } from "@/types/sports.types";
import { getAllSportsData } from "@/data/sportsData";

export const metadata: Metadata = {
  title: "All Sports",
  description:
    "Browse every sport on SportNest and filter venues by sport, area, or price.",
};

type AllSportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};




export default async function AllSportsPage({
  searchParams,
}: AllSportsPageProps) {

  const sportsData = await getAllSportsData() as ISport[]
  const uniqueSports = new Set(sportsData.map((sport) => sport.sportSlug)).size

  const params = await searchParams;
  const initialSport =
    typeof params.sport === "string" ? params.sport : "all";

  return (
    <div className="relative overflow-hidden my-5 py-5">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 size-[480px] rounded-full bg-brand-500/10 blur-[130px]"
      />

      <div className="shell section relative pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <span className="eyebrow">
            {sportsData.length} venues · {uniqueSports} sports
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            All sports.{" "}
            <span className="text-brand-400">One nest.</span>
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted sm:text-lg">
            Search by venue or neighborhood, filter by sport, and lock in a
            slot. Every listing shows live pricing and today&apos;s availability.
          </p>
        </div>

        <SportsExplorer sportsData = {sportsData} initialSport={initialSport} />
      </div>
    </div>
  );
}
