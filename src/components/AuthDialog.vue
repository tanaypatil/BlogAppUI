<script setup lang="ts">

import UserAuth from "./UserAuth.vue";


</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps">Signup/Login</v-btn>
    </template>

    <template v-slot:default>
      <UserAuth />
    </template>
  </v-dialog>
</template>

<style scoped>

</style>