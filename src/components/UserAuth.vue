<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import {ref} from "vue";
import SignupForm from "./SignupForm.vue";

const tab = ref(null)
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row class="fill-height d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="4" class="d-flex justify-center">
        <v-card class="pa-8" elevation="8" rounded style="width: 100%; max-width: 400px;">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>