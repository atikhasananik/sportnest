/** What the Add Sports form sends — everything except the DB-generated `_id`. */
export type SportInput = Omit<ISport, "_id">

export interface ISport  {
  _id: string
  name: string
  sport: string
  sportSlug: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  badge: string
  featured: boolean
  slots: string[] | []
}
