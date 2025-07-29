export interface Blog {
  id: number
  title: string
  body: string | null
  slug: string
  author: string
  category: string
  tags: string[]
  created: string
  updated: string
  profile_picture: string | null
  preview_body: string | null
}
