<script setup lang="ts">
import UserAuth from './UserAuth.vue'
import { useAuthDialogStore } from '../stores/authDialogStore.ts'
import { storeToRefs } from 'pinia'

const dialogStore = useAuthDialogStore()
const { isDialogOpen } = storeToRefs(dialogStore)

</script>

<template>
  <v-dialog max-width="500"
  v-model="isDialogOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-login"
        title="Login/Signup"
        v-bind="activatorProps"
        @click="isDialogOpen = true"
      ></v-btn>
    </template>

    <template v-slot:default>
      <UserAuth />
    </template>
  </v-dialog>
</template>

<style scoped></style>
