<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchBlog } from '../api/blogsApi.ts'
import { useRoute } from 'vue-router'
import type { Blog } from '../interfaces/Blog.ts'

const route = useRoute()

const blog = ref<Blog>()
onMounted(async () => {
  blog.value = await fetchBlog(route.params.slug)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet
          class="mx-auto"
          elevation="10"
        >
          <v-sheet
            class="pa-3 bg-blue-grey-darken-4"
          >
            Author
          </v-sheet>
          <v-img
            v-if="blog?.profile_picture"
            :src="blog.profile_picture"
            cover
          >
          </v-img>
          <v-icon v-else class="profile_picture" size="32">mdi-account-circle</v-icon>
          <div class="text-center">
            {{ blog?.author }}
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <v-card class="pa-3" elevation="8" rounded>
          <div>
            <h1 class="font-weight-black">{{ blog?.title }}</h1>
          </div>

          <v-card-text class="pt-4">
            {{ blog?.body }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-sheet
          class="mx-auto"
          elevation="10"
        >
          <v-sheet
            class="pa-3 bg-blue-grey-darken-4"
          >
            Category
          </v-sheet>
          <div class="pa-4">
            {{ blog?.category }}
          </div>
        </v-sheet>
        <v-sheet
          class="mx-auto"
          elevation="10"
        >
          <v-sheet
            class="pa-3 bg-blue-grey-darken-4"
          >
            Tags
          </v-sheet>

          <div class="pa-4">
            <v-chip-group
              selected-class="text-primary"
              column
            >
              <v-chip
                v-for="tag in blog?.tags"
                :key="tag" class="bg-blue-grey-darken-1"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
