<script setup lang="ts">
import { type Ref, ref } from 'vue'
import AppBar from './components/AppBar.vue'
import AddFab from './components/AddFab.vue'

const theme: Ref<string> = ref('light')
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
      <AddFab />
    </v-main>
  </v-app>
</template>

<style scoped></style>
