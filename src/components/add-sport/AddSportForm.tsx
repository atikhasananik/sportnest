"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle,
  ImageIcon,
  Plus,
} from "@/components/ui/icons";
import SportSelect from "@/components/add-sport/SportSelect";
import { useToast } from "@/components/ui/Toast";
import {
  createSport,
  getAllSportsData,
  getSportCategories,
} from "@/data/sportsData";

const sports = getSportCategories(await getAllSportsData())

function parseImageUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-brand-400/60 focus:bg-white/[0.07] focus:outline-none";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted";

export default function AddSportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [sport, setSport] = useState("");
  const [sportError, setSportError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const parsedImageUrl = parseImageUrl(imageUrl);
  const canPreview = parsedImageUrl?.hostname === "images.unsplash.com";
  const selectedSport = sports.find((item) => item.slug === sport);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!sport) {
      setSportError(true);
      return;
    }

    setSportError(false);
    setSubmitError("");

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "Your venue");

    setSubmitting(true);

    try {
      await createSport({
        name,
        sport: selectedSport?.name ?? String(data.get("sport") ?? ""),
        sportSlug: sport,
        location: String(data.get("location") ?? ""),
        price: Number(data.get("price") ?? 0),
        rating: Number(data.get("rating") ?? 0),
        reviews: Number(data.get("reviews") ?? 0),
        image: String(data.get("image") ?? ""),
        badge: String(data.get("badge") ?? ""),
        featured,
        slots: [],
      });

      setSubmittedName(name);
      setSubmitted(true);
      toast({
        variant: "success",
        title: "Venue submitted",
        description: `${name} is in review — we'll email you when it goes live.`,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? `Couldn't save — ${error.message}. Add the route on localhost:8000 and try again.`
          : "Couldn't save your venue. Please try again.";

      setSubmitError(message);
      toast({
        variant: "danger",
        title: "Couldn't submit your venue",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong — please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function listAnother() {
    formRef.current?.reset();
    setSport("");
    setSportError(false);
    setImageUrl("");
    setImageFailed(false);
    setFeatured(false);
    setSubmitError("");
    setSubmittedName("");
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="card flex flex-col items-center px-6 py-14 text-center">
        <CheckCircle className="size-14 text-brand-400" />
        <h2 className="mt-5 text-2xl font-bold tracking-tight">
          {submittedName} is in review
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thanks for listing with SportNest. Our team reviews new venues within
          24 hours and will email you the moment your slots go live.
        </p>
        <div className="mt-7 flex w-full max-w-xs flex-col gap-2">
          <Link href="/all-sports" className="btn-primary">
            Browse venues
            <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={listAnother}
            className="btn-secondary"
          >
            List another venue
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Venue details
        </h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-muted">
          Takes ~2 minutes
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="venue-name" className={labelClass}>
            Venue name
          </label>
          <input
            id="venue-name"
            name="name"
            type="text"
            required
            placeholder="e.g. The Court House"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="venue-sport" className={labelClass}>
            Sport
          </label>
          <SportSelect
            id="venue-sport"
            name="sportSlug"
            options={sports}
            value={sport}
            onChange={(value) => {
              setSport(value);
              setSportError(false);
            }}
            invalid={sportError}
          />
          <input
            type="hidden"
            name="sport"
            value={selectedSport?.name ?? ""}
          />
          {sportError ? (
            <p className="mt-2 text-xs text-red-300">
              Pick a sport to continue.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="venue-price" className={labelClass}>
            Price per hour (৳)
          </label>
          <input
            id="venue-price"
            name="price"
            type="number"
            min={1}
            step={1}
            required
            placeholder="1200"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="venue-location" className={labelClass}>
            Location
          </label>
          <input
            id="venue-location"
            name="location"
            type="text"
            required
            placeholder="Area, city — e.g. Gulshan 2, Dhaka"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="venue-rating" className={labelClass}>
            Rating
          </label>
          <input
            id="venue-rating"
            name="rating"
            type="number"
            min={0}
            max={5}
            step={0.1}
            placeholder="4.5"
            className={fieldClass}
          />
          <p className="mt-1.5 text-[11px] text-muted">
            0–5 · defaults to 0 for a brand-new venue.
          </p>
        </div>

        <div>
          <label htmlFor="venue-reviews" className={labelClass}>
            Reviews
          </label>
          <input
            id="venue-reviews"
            name="reviews"
            type="number"
            min={0}
            step={1}
            placeholder="0"
            className={fieldClass}
          />
          <p className="mt-1.5 text-[11px] text-muted">
            Number of player reviews so far.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="venue-image" className={labelClass}>
            Image URL
          </label>
          <input
            id="venue-image"
            name="image"
            type="url"
            required
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
              setImageFailed(false);
            }}
            placeholder="https://images.unsplash.com/photo-…"
            className={fieldClass}
          />
          <p className="mt-2 text-[11px] text-muted">
            Paste a direct link to a venue photo — Unsplash links preview
            instantly.
          </p>

          {parsedImageUrl ? (
            canPreview && !imageFailed ? (
              <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={imageUrl}
                  alt="Venue image preview"
                  fill
                  sizes="(min-width: 640px) 560px, 100vw"
                  className="object-cover"
                  onError={() => setImageFailed(true)}
                />
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-muted">
                <ImageIcon className="size-4 shrink-0 text-brand-400" />
                {imageFailed
                  ? "Couldn't load that image. Check the URL and try again."
                  : "Preview isn't available for this host — use an images.unsplash.com link."}
              </div>
            )
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="venue-badge" className={labelClass}>
            Badge
          </label>
          <input
            id="venue-badge"
            name="badge"
            type="text"
            placeholder="e.g. Most booked"
            className={fieldClass}
          />
          <p className="mt-1.5 text-[11px] text-muted">
            Optional — a short highlight shown on the card. Leave blank for
            none.
          </p>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">Featured venue</p>
              <p className="mt-0.5 text-[11px] text-muted">
                Featured venues are picked first by the Recommended sort.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={featured}
              onClick={() => setFeatured((current) => !current)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 ${
                featured
                  ? "border-brand-400 bg-brand-500"
                  : "border-white/15 bg-white/10"
              }`}
            >
              <span className="sr-only">Featured venue</span>
              <span
                className={`absolute size-4 rounded-full bg-white transition-transform ${
                  featured ? "translate-x-[22px]" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit venue for review"}
        <Plus className="size-4" />
      </button>

      {submitError ? (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-xs text-red-200"
        >
          {submitError}
        </p>
      ) : null}

      <p className="mt-3 text-center text-[11px] text-muted">
        Free to list. No commission for your first 30 days.
      </p>
    </form>
  );
}
