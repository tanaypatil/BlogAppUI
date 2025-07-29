<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'

const open = shallowRef(false)
const fabPosition = shallowRef('fixed')
const menuLocation = shallowRef('left center')
const fabLocation = shallowRef('right bottom')
const transition = shallowRef('slide-y-reverse-transition')

watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => (open.value = false))
watch(fabPosition, () => (open.value = false))

function reopen() {
  open.value = false
  setTimeout(() => (open.value = true), 400)
}

const router = useRouter()

const createBlog = () => {
  router.push('/blog/create')
}
</script>

<template>
  <v-fab
    :key="fabPosition"
    :absolute="fabPosition === 'absolute'"
    :app="fabPosition === 'fixed'"
    :color="open ? '' : 'primary'"
    :location="fabLocation"
    size="large"
    icon
    class="pa-4"
  >
    <!--    <v-icon>mdi-plus</v-icon>-->
    <v-icon>{{ open ? 'mdi-close' : 'mdi-plus' }}</v-icon>
    <v-speed-dial
      v-model="open"
      :location="menuLocation"
      :transition="transition"
      activator="parent"
    >
      <v-btn
        key="1"
        title="Create Blog"
        color="success"
        icon
        @click="createBlog"
      >
        <v-icon size="24">mdi-plus</v-icon>
      </v-btn>

      <v-btn title="Edit Blog" key="2" color="info" icon @click="createBlog">
        <v-icon size="24">mdi-pencil</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab>
</template>

<style>
.v-fab--bottom .v-fab__container {
  bottom: 32px !important;
  right: 32px !important;
}
</style>
