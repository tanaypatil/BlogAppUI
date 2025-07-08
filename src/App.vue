<script setup lang="ts">
import { ref } from 'vue'
import {useUserStore} from "./stores/userStore.ts";

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const userStore = useUserStore()
const { userLoggedIn, logout } = userStore
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" color="blue-grey-darken-4">
      <v-toolbar-title>My Blogs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="userLoggedIn" @click="logout">Logout</v-btn>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        slim
        @click="onClick"
      ></v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
