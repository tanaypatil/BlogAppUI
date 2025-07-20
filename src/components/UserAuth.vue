<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import {ref} from "vue";
import SignupForm from "./SignupForm.vue";

const tab = ref(null)
</script>

<template>
  <v-card class="pa-8" elevation="8" rounded style="width: 100%; max-width: 400px; position: relative;">
    <v-tabs bg-color="transparent" grow v-model="tab">
      <v-tab>Login</v-tab>
      <v-tab>Signup</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab" class="pa-6">
      <v-tabs-window-item>
        <LoginForm/>
      </v-tabs-window-item>
      <v-tabs-window-item>
        <SignupForm/>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<style scoped>

</style>