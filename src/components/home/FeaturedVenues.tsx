import SectionHeading from "@/components/ui/SectionHeading";
import VenueCard from "@/components/venues/VenueCard";
import { ISport } from "@/types/sports.types";

export default async function FeaturedVenues() {

  const res = await fetch('http://localhost:8000/get-sports/8', {
    next: { revalidate: 30 },
  })
    const sportsData = await res.json() as ISport[]

  return (
    <section className="section border-t border-white/5 bg-surface/30">
      <div className="shell">
        <SectionHeading
          eyebrow="Handpicked venues"
          title="Courts worth showing up for"
          description="Top-rated spaces with real photos, honest reviews, and slots you can book today."
          action={{ href: "/all-sports", label: "Browse all venues" }}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sportsData.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  );
}
