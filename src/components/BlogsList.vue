<script setup lang="ts">
import BlogCard from './BlogCard.vue'
import { fetchBlogs } from '../api/blogsApi.ts'
import { ref } from 'vue'
import type { Blog } from '../interfaces/Blog.ts'
import type { BlogResponse } from '../interfaces/BlogResponse.ts'

const blogs = ref<Array<Blog>>([])
const blogsResponse = ref<BlogResponse | null>()

const getBlogs = async (): Promise<string> => {
  blogsResponse.value = await fetchBlogs(blogsResponse.value?.next)
  if (blogsResponse.value) {
    if (blogsResponse.value?.results) {
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

async function load({ done }: any) {
  done(await getBlogs())
}
</script>

<template>
  <v-infinite-scroll :items="blogs" @load="load" mode="intersect">
    <v-container>
      <v-row>
        <v-col cols="4" v-for="blog in blogs" :key="blog.id">
          <BlogCard
            :title="blog.title"
            :slug="blog.slug"
            :body="blog.body"
            :author="blog.author"
            :profile_picture="blog.profile_picture"
            :tags="blog.tags"
          />
        </v-col>
      </v-row>
    </v-container>
    <template v-slot:loading>
      <v-alert type="info">This is taking a very long time...</v-alert>
    </template>
    <template v-slot:error>
      <v-alert type="error">Error occurred while fetching blogs</v-alert>
    </template>
  </v-infinite-scroll>
</template>

<style scoped></style>
