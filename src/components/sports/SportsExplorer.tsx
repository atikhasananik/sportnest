"use client";

import { useMemo, useState } from "react";
import VenueCard from "@/components/venues/VenueCard";
import DropdownSelect, {
  type DropdownOption,
} from "@/components/ui/DropdownSelect";
import { Search, X } from "@/components/ui/icons";
import { ISport } from "@/types/sports.types";

interface ISportsExplorerProps {
  initialSport?: string;
  sportsData: ISport[];
}

const SORT_OPTIONS: DropdownOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name: A to Z" },
];

type SortKey = (typeof SORT_OPTIONS)[number]["value"];

type SportChip = {
  slug: string;
  name: string;
  count: number;
};

function sortResults(results: ISport[], sort: SortKey) {
  const sorted = [...results];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      // Recommended: featured venues first, then highest rated.
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || b.rating - a.rating,
      );
  }
}

export default function SportsExplorer({
  initialSport = "all",
  sportsData,
}: ISportsExplorerProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [sportFilter, setSportFilter] = useState(() =>
    sportsData.some((sport) => sport.sportSlug === initialSport)
      ? initialSport
      : "all",
  );

  // One chip per unique sport, with how many venues it has.
  const sportChips = useMemo<SportChip[]>(() => {
    const bySlug = new Map<string, SportChip>();

    for (const venue of sportsData) {
      const existing = bySlug.get(venue.sportSlug);
      if (existing) {
        existing.count += 1;
      } else {
        bySlug.set(venue.sportSlug, {
          slug: venue.sportSlug,
          name: venue.sport,
          count: 1,
        });
      }
    }

    return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [sportsData]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = sportsData.filter((venue) => {
      const matchesSport =
        sportFilter === "all" || venue.sportSlug === sportFilter;
      const matchesQuery =
        term.length === 0 ||
        `${venue.name} ${venue.sport} ${venue.location}`
          .toLowerCase()
          .includes(term);

      return matchesSport && matchesQuery;
    });

    return sortResults(filtered, sort);
  }, [sportsData, query, sportFilter, sort]);

  const hasActiveFilters = query.trim().length > 0 || sportFilter !== "all";

  function resetFilters() {
    setQuery("");
    setSportFilter("all");
    setSort("recommended");
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <label htmlFor="venue-search" className="sr-only">
            Search venues
          </label>
          <input
            id="venue-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search venue, sport, or area…"
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand-400/60 focus:bg-white/[0.07] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-ink"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {results.length} {results.length === 1 ? "venue" : "venues"} found
          </p>

          <DropdownSelect
            id="venue-sort"
            label="Sort venues"
            prefix="Sort"
            variant="pill"
            placeholder="Recommended"
            options={SORT_OPTIONS}
            value={sort}
            onChange={setSort}
          />
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSportFilter("all")}
          aria-pressed={sportFilter === "all"}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
            sportFilter === "all"
              ? "border-brand-400 bg-brand-500 text-[#08090c]"
              : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-ink"
          }`}
        >
          All sports ({sportsData.length})
        </button>
        {sportChips.map((chip) => (
          <button
            key={chip.slug}
            type="button"
            onClick={() => setSportFilter(chip.slug)}
            aria-pressed={sportFilter === chip.slug}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              sportFilter === chip.slug
                ? "border-brand-400 bg-brand-500 text-[#08090c]"
                : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-ink"
            }`}
          >
            {chip.name} ({chip.count})
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="card mt-8 flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-white/5 text-muted">
            <Search className="size-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            No venues found
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Nothing matches that search yet. Try another sport, area, or clear
            your filters.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="btn-secondary mt-6"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
