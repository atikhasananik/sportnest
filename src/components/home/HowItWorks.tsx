import { steps } from "@/data/site";
import { Calendar, Search, Zap } from "@/components/ui/icons";

const stepIcons = {
  search: Search,
  calendar: Calendar,
  zap: Zap,
};

export default function HowItWorks() {
  return (
    <section className="section my-5 py-5">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-surface/60 p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/10 blur-[100px]"
          />

          <div className="relative max-w-2xl">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From &ldquo;anyone free?&rdquo; to game on.
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              No group-chat chaos, no phone calls. Three steps and you&apos;re
              on the court.
            </p>
          </div>

          <div className="relative mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => {
              const StepIcon = stepIcons[step.icon as keyof typeof stepIcons] ?? Zap;

              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-white/8 bg-base/60 p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-4 text-4xl font-bold text-white/5"
                  >
                    0{index + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                    <StepIcon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
