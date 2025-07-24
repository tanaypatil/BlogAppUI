<script setup lang="ts">
import { type Ref, ref } from 'vue'
import AppBar from './components/AppBar.vue'
import AddFab from './components/AddFab.vue'
import { useUserStore } from './stores/userStore.ts'

const theme: Ref<string> = ref('light')

const userStore = useUserStore()
const { userLoggedIn } = userStore
</script>

<template>
  <v-app :theme="theme">
    <AppBar v-model:theme="theme" />

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </transition>
      <AddFab v-if="userLoggedIn" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
