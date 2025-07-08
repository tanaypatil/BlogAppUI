<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import {useUserStore} from "../stores/userStore.ts";
import type {ILoginForm} from "../interfaces/ILoginForm.ts";
import {ref} from "vue";

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const userStore = useUserStore()
const { login } = userStore

const loginError = ref<string>('');

const onSubmit = async (values: ILoginForm, { setFieldError }: any) => {
  try {
    await login(values)
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data;

      if (errorData.password) {
        setFieldError('password', Array.isArray(errorData.password) ? errorData.password[0] : errorData.password);
      }
      if (errorData.username) {
        setFieldError('username', Array.isArray(errorData.username) ? errorData.username[0] : errorData.username);
      }

      // Handle non-field errors
      if (errorData.non_field_errors) {
        loginError.value = Array.isArray(errorData.non_field_errors)
            ? errorData.non_field_errors[0]
            : errorData.non_field_errors;
      } else if (errorData.error || errorData.error_description) {
        loginError.value = errorData.error_description || errorData.error;
      } else if (errorData.detail) {
        loginError.value = errorData.detail;
      } else {
        loginError.value = 'Login failed. Please check your credentials.';
      }
    } else {
      loginError.value = error.message || 'Login failed. Please try again.';
    }
  }
}
</script>

<template>
  <Form :validation-schema="schema" v-slot="{ meta, handleSubmit, isSubmitting }">
    <v-alert
        v-if="loginError"
        type="error"
        class="mb-4"
        closable
        @click:close="loginError = ''"
    >
      {{ loginError }}
    </v-alert>
    <Field name="username">
      <template #default="slotProps">
        <v-text-field
          v-bind="slotProps.field"
          label="Username"
          type="text"
          variant="outlined"
          :error="!!slotProps.errors.length"
          :error-messages="slotProps.errors"
          class="mb-4"
          required
        />
      </template>
    </Field>
    <Field name="password">
      <template #default="slotProps">
        <v-text-field
          v-bind="slotProps.field"
          label="Password"
          type="password"
          variant="outlined"
          :error="!!slotProps.errors.length"
          :error-messages="slotProps.errors"
          class="mb-4"
          required
        />
      </template>
    </Field>
    <v-btn @click="handleSubmit(onSubmit)" type="submit" color="primary" block :disabled="!meta.valid || isSubmitting"
           :class="{ 'submitting': isSubmitting }">Login
    </v-btn>
  </Form>
</template>

<style scoped>

</style>