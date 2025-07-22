<script setup lang="ts">
import { useUserStore } from '../stores/userStore.ts'
import AuthDialog from './AuthDialog.vue'

const props = defineProps<{
  theme: string
}>()

const emit = defineEmits<{
  'update:theme': [theme: string]
}>()

function updateTheme() {
  const newTheme = props.theme === 'light' ? 'dark' : 'light'
  emit('update:theme', newTheme)
}

const userStore = useUserStore()
const { userLoggedIn, logout } = userStore
</script>

<template>
  <v-app-bar class="px-3" color="blue-grey-darken-4">
    <v-toolbar-title class="text-amber">Only Blogs</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      title="Toggle Theme"
      :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      slim
      @click="updateTheme"
    ></v-btn>
    <v-btn
      v-if="userLoggedIn"
      @click="logout"
      icon="mdi-logout"
      title="Logout"
    ></v-btn>
    <AuthDialog v-else />
  </v-app-bar>
</template>

<style scoped></style>
