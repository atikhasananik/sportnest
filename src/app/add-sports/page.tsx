import type { Metadata } from "next";
import AddSportForm from "@/components/add-sport/AddSportForm";
import { Calendar, ShieldCheck, Users } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Add Sports",
  description:
    "List your court, pitch, or pool on SportNest and turn empty hours into bookings.",
};

const perks = [
  {
    icon: Users,
    title: "Reach local players",
    description:
      "Thousands of players search SportNest every week looking for exactly what you offer.",
  },
  {
    icon: Calendar,
    title: "Own your schedule",
    description:
      "Set your open hours, block maintenance days, and adjust pricing whenever you need.",
  },
  {
    icon: ShieldCheck,
    title: "Free to list",
    description:
      "No setup fee and no commission for 30 days. You only pay when you start earning.",
  },
];

export default function AddSportsPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 size-[420px] rounded-full bg-brand-500/10 blur-[130px]"
      />

      <div className="shell section relative pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <span className="eyebrow">For venue owners</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Turn empty hours into{" "}
            <span className="text-brand-400">booked courts.</span>
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted sm:text-lg">
            Add your facility in a few minutes. We handle discovery, slots, and
            confirmations — you just keep the lights on.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-4">
            {perks.map((perk) => {
              const PerkIcon = perk.icon;
              return (
                <div key={perk.title} className="card flex gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                    <PerkIcon className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold tracking-tight">
                      {perk.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5">
              <p className="text-3xl font-bold tracking-tight text-brand-400">
                92%
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                of venues on SportNest fill their weekday slots within the first
                month of listing.
              </p>
            </div>
          </aside>

          <AddSportForm />
        </div>
      </div>
    </div>
  );
}
