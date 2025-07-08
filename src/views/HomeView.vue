<script setup lang="ts">
import UserAuth from "../components/UserAuth.vue";
import {useUserStore} from "../stores/userStore.ts";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const { userLoggedIn } = storeToRefs(userStore)
</script>

<template>

  <UserAuth v-if="!userLoggedIn"/>
  <p v-else>Blog Home page</p>
</template>

<style scoped>

</style>