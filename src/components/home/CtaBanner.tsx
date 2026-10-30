import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export default function CtaBanner() {
  return (
    <section className="section my-5 py-5">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/20">
          <Image
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base via-base/85 to-base/20" />
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/20 blur-[90px]"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 px-6 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="eyebrow">For venue owners</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Own a court? Fill the empty hours.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                List your venue for free and reach thousands of players already
                booking on SportNest. Set your slots, set your price, keep
                control.
              </p>
            </div>

            <Link href="/add-sports" className="btn-primary shrink-0">
              List your venue
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
