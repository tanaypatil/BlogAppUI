import { api } from '../api.ts'

async function fetchCategories() {
  try {
    const response = await api.get('/categories/')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export { fetchCategories }
