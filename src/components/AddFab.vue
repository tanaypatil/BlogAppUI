<script setup lang="ts">
import { shallowRef, watch } from 'vue'

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
    <v-icon>mdi-plus</v-icon>
    <!--    <v-icon>{{ open ? 'mdi-close' : 'mdi-crown' }}</v-icon>-->
    <!--    <v-speed-dial v-model="open" :location="menuLocation" :transition="transition" activator="parent">-->
    <!--      <v-btn key="1" color="success" icon>-->
    <!--        <v-icon size="24">$success</v-icon>-->
    <!--      </v-btn>-->

    <!--      <v-btn key="2" color="info" icon>-->
    <!--        <v-icon size="24">$info</v-icon>-->
    <!--      </v-btn>-->

    <!--      <v-btn key="3" color="warning" icon>-->
    <!--        <v-icon size="24">$warning</v-icon>-->
    <!--      </v-btn>-->

    <!--      <v-btn key="4" color="error" icon>-->
    <!--        <v-icon size="24">$error</v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-speed-dial>-->
  </v-fab>
</template>

<style>
.v-fab--bottom .v-fab__container {
  bottom: 32px !important;
  right: 32px !important;
}
</style>
