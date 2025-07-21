import {defineStore} from "pinia";
import {ref} from "vue";
import type {Blog} from "../interfaces/Blog.ts";
import type {BlogResponse} from "../interfaces/BlogResponse.ts";
import {fetchBlogs} from "../api/blogsApi.ts";


export const useBlogStore = defineStore('blogStore', () => {
    const blogs = ref<Array<Blog>>([])
    const blogsResponse = ref<BlogResponse | null>()

    const getBlogs = async () : Promise<string> => {
        blogsResponse.value = await fetchBlogs(blogsResponse.value?.next)
        if (blogsResponse.value) {
            if(blogsResponse.value?.results) {
                blogs.value.push(...blogsResponse.value.results)
            }
            if (!blogsResponse.value.next) {
                return 'empty'
            } else {
                return 'ok'
            }
        } else {
            return 'error'
        }
    }

    return { blogs, getBlogs }

})