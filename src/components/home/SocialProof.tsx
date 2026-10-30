import { siteStats, testimonials } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "@/components/ui/icons";

export default function SocialProof() {
  return (
    <section className="section my-5 py-5">
      <div className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-4">
          {siteStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface px-4 py-7 text-center sm:px-6 sm:py-8"
            >
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Loved by players"
            title="Game plans, sorted"
            description="Join thousands of players who stopped calling around and started playing more."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="card p-6">
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 text-brand-400" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-400">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
