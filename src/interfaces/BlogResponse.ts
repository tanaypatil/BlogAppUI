import type { PaginatedResponse } from './PaginatedResponse.ts'
import type { Blog } from './Blog.ts'

export interface BlogResponse extends PaginatedResponse {
  results: Array<Blog>
}
