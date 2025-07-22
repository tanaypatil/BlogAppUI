<script setup lang="ts">
import BlogCard from './BlogCard.vue'
import { useBlogStore } from '../stores/blogStore.ts'
import { storeToRefs } from 'pinia'

const blogStore = useBlogStore()
const { blogs } = storeToRefs(blogStore)
const { getBlogs } = blogStore

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
