import { api } from '../api.ts'
import type { BlogResponse } from '../interfaces/BlogResponse.ts'
import type { IBlogForm } from '../interfaces/IBlogForm.ts'

async function fetchBlogs(
  pageUrl: string | null | undefined
): Promise<BlogResponse | null> {
  try {
    const response = await api.get(pageUrl ?? '/blogs/preview/?page=1')
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

async function createBlog(formValues: IBlogForm) {
  const formData = new FormData()
  formData.append('title', formValues.title)
  formData.append('body', formValues.body)
  formData.append('category', formValues.category)
  formValues.tags.forEach(tag => {
    formData.append('tag_names', tag)
  })
  return await api.post('/blogs/', formData)
}

async function deleteBlog(slug: string) {
  return await api.delete(`/blogs/${slug}/`)
}

async function updateBlog(slug: string, formValues: IBlogForm) {
  const formData = new FormData()
  formData.append('title', formValues.title)
  formData.append('body', formValues.body)
  formData.append('category', formValues.category)
  formValues.tags.forEach(tag => {
    formData.append('tag_names', tag)
  })
  return await api.patch(`/blogs/${slug}/`, formData)
}

export { fetchBlogs, fetchBlog, createBlog, deleteBlog, updateBlog }
