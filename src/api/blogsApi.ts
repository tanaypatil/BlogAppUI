import { api } from '../api.ts'
import type { BlogResponse } from '../interfaces/BlogResponse.ts'

async function fetchBlogs(
  pageUrl: string | null | undefined
): Promise<BlogResponse | null> {
  try {
    const response = await api.get(pageUrl ?? '/blogs/?page=1')
    console.log(response.data)
    if (response.status === 200) {
      return response.data as BlogResponse
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

async function fetchBlog(slug: string) {
  const response = await api.get('/blogs/' + slug)
  return response.data
}

export { fetchBlogs, fetchBlog }
