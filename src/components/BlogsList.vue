<script setup lang="ts">
import {ref} from 'vue';
import BlogCard from './BlogCard.vue';
import { getBlogs } from '../api/blogsApi.ts';
import type {Blog} from "../interfaces/Blog.ts";
import type {BlogResponse} from "../interfaces/BlogResponse.ts";

const blogsResponse = ref<BlogResponse | null>()
const blogs = ref<Array<Blog>>([])


async function load ({done}: any) {
  // Perform API call
  blogsResponse.value = await getBlogs(blogsResponse.value?.next);
  blogs.value.push(...blogsResponse.value?.results ?? [])
  if (blogsResponse.value?.next === null) {
    done('ok')
  }
}
</script>

<template>
  <v-infinite-scroll :items="blogs" @load="load" mode="manual">
    <BlogCard
      v-for="blog in blogs"
      :key="blog.id"
      :title="blog.title"
      :slug="blog.slug"
      :body="blog.body"
      :author="blog.author"
    />
  </v-infinite-scroll>
</template>

<style scoped>

</style>