import { api } from '../api.ts'

async function getTags() {
  try {
    const response = await api.get('/tags/')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export { getTags }
