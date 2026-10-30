import { ISport, SportInput } from "@/types/sports.types"

export const getAllSportsData = async ()=>{
    // The API data is live and changes without a redeploy — never cache it
    // beyond a short window, or `next build` keeps serving an old snapshot.
    const res = await fetch('http://localhost:8000/all-sports', {
        next: { revalidate: 30 },
    })
    const data = await res.json() as ISport[]
    return data
}

/**
 * Creates a venue through the backend. The API must expose
 * `POST /add-sports` (JSON, CORS enabled for the browser origin).
 */
export const createSport = async (sport: SportInput) => {
    const res = await fetch('http://localhost:8000/add-sports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sport),
    })

    if (!res.ok) {
        throw new Error(`POST /add-sports returned ${res.status}`)
    }

    return res.json().catch(() => null) as Promise<ISport | null>
}

export type SportCategory = {
    slug: string
    name: string
}

/**
 * The API returns venue documents, so unique sports have to be derived:
 * one entry per `sportSlug`, labelled with its display `sport` name.
 */
export const getSportCategories = (sports: ISport[]): SportCategory[] => {
    const categories = new Map<string, SportCategory>()

    for (const sport of sports) {
        if (!categories.has(sport.sportSlug)) {
            categories.set(sport.sportSlug, {
                slug: sport.sportSlug,
                name: sport.sport,
            })
        }
    }

    return [...categories.values()].sort((a, b) => a.name.localeCompare(b.name))
}
