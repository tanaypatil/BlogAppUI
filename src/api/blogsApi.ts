import {api} from "../api.ts";
import type {BlogResponse} from "../interfaces/BlogResponse.ts";


async function fetchBlogs(pageUrl: string | null | undefined): Promise<BlogResponse | null> {
    try {
        const response = await api.get(pageUrl??"/blogs/?page=1")
        console.log(response.data);
        if (response.status === 200) {
            return response.data as BlogResponse
        }
        return null;
    } catch (error) {
        console.error(error)
        return null
    }
}

export { fetchBlogs }