<script setup lang="ts">
import {ref} from 'vue';
import BlogCard from './BlogCard.vue';
import {getBlogs} from '../api/blogsApi.ts';
import type {Blog} from "../interfaces/Blog.ts";
import type {BlogResponse} from "../interfaces/BlogResponse.ts";

const blogsResponse = ref<BlogResponse | null>()
const blogs = ref<Array<Blog>>([])

async function load({done}: any) {
  blogsResponse.value = await getBlogs(blogsResponse.value?.next);
  console.log(blogsResponse.value)
  if (blogsResponse.value == null) {
    done('error')
  } else if (!blogsResponse.value.results || blogsResponse.value.results.length === 0) {
    done('empty')
  } else {
    blogs.value.push(...blogsResponse.value.results);
    if (!blogsResponse.value.next) {
      done('empty')
    } else {
      done('ok')
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-infinite-scroll
            :items="blogs"
            @load="load"
            mode="intersect"
        >
          <BlogCard
              v-for="blog in blogs"
              :key="blog.id"
              :title="blog.title"
              :slug="blog.slug"
              :body="blog.body"
              :author="blog.author"
              :profile_picture="blog.profile_picture"
          />
          <template v-slot:loading>
            <v-alert type="info">This is taking a very long time...</v-alert>
          </template>
          <template v-slot:error>
            <v-alert type="error">Error occurred while fetching blogs</v-alert>
          </template>
          <template v-slot:empty>
            <v-alert type="warning">No more items!</v-alert>
          </template>
        </v-infinite-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>