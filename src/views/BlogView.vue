<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deleteBlog, fetchBlog } from '../api/blogsApi.ts'
import { useRoute, useRouter } from 'vue-router'
import type { Blog } from '../interfaces/Blog.ts'
import { useUserStore } from '../stores/userStore.ts'

const route = useRoute()
const router = useRouter()
const blog = ref<Blog>()
const isOwner = ref<boolean>(false)
onMounted(async () => {
  blog.value = await fetchBlog(route.params.slug)
  const userStore = useUserStore()
  const { username } = userStore
  console.log(username, blog.value?.author)
  isOwner.value = username == blog.value?.author
})

const deleteDialog = ref(false)

const showAlert = ref<boolean>(false)
const alertMessage = ref<string>('')
const alertType = ref<string>('')

const onConfirmDelete = async () => {
  try {
    showAlert.value = false
    await deleteBlog(route.params.slug)
    await router.push({ name: 'home' })
  } catch (e) {
    console.error(e)
    alertMessage.value = e.message
    alertType.value = 'error'
    showAlert.value = true
  }
}
</script>

<template>
  <v-container>
    <v-row v-show="showAlert">
      <v-alert
        :type="alertType=='error' ? 'error' : 'success'"
        class="mb-4"
        closable
        @click:close="showAlert = false"
      >
        {{ alertMessage }}
      </v-alert>
    </v-row>
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
        <v-sheet
          class="pa-3 text-center"
          v-if="isOwner"
        >
          <v-dialog
            v-model="deleteDialog"
            max-width="400"
            persistent
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn icon="mdi-delete" icon-size="large" v-bind="activatorProps"></v-btn>
            </template>

            <v-card>
              <template v-slot:text>
                Are you sure you want to delete this blog?
              </template>
              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="onConfirmDelete">
                  Yes, delete it
                </v-btn>

                <v-btn @click="deleteDialog = false">
                  Cancel
                </v-btn>
              </template>
            </v-card>
          </v-dialog>
          <v-divider class="border-opacity-100 ml-1 mr-1" color="white" vertical></v-divider>
          <router-link style="text-decoration: none; color: inherit" :to="{ name: 'blogEdit', params: { 'slug': blog?.slug }}"><v-btn icon="mdi-pencil" icon-size="large"></v-btn></router-link>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <v-card class="pa-3" elevation="8" rounded>
          <div class="bg-blue-grey-lighten-5">
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
