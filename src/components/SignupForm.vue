<script setup lang="ts">
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import {useUserStore} from "../stores/userStore.ts";
import {ref} from "vue";
import type {ISignupForm} from "../interfaces/ISignupForm.ts";

const schema = yup.object({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Email must be valid"),
  profile_picture: yup.mixed().nullable(),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const userStore = useUserStore()
const { signup } = userStore

const signupError = ref<string>('');

const onSubmit = async (values: ISignupForm, { setFieldError }: any) => {
  try {
    await signup(values)
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data;

      if (errorData.password) {
        setFieldError('password', Array.isArray(errorData.password) ? errorData.password[0] : errorData.password);
      }
      if (errorData.username) {
        setFieldError('username', Array.isArray(errorData.username) ? errorData.username[0] : errorData.username);
      }
      if (errorData.email) {
        setFieldError('email', Array.isArray(errorData.email) ? errorData.email[0] : errorData.email);
      }
      if (errorData.profile_picture) {
        setFieldError('profile_picture', Array.isArray(errorData.profile_picture) ? errorData.profile_picture[0] : errorData.profile_picture);
      }

      // Handle non-field errors
      if (errorData.non_field_errors) {
        signupError.value = Array.isArray(errorData.non_field_errors)
            ? errorData.non_field_errors[0]
            : errorData.non_field_errors;
      } else if (errorData.error || errorData.error_description) {
        signupError.value = errorData.error_description || errorData.error;
      } else if (errorData.detail) {
        signupError.value = errorData.detail;
      } else {
        signupError.value = 'Signup failed. Please check your credentials.';
      }
    } else {
      signupError.value = error.message || 'Signup failed. Please try again.';
    }
  }
}
</script>

<template>
  <Form :validation-schema="schema" v-slot="{ meta, isSubmitting, handleSubmit }">
    <v-alert
        v-if="signupError"
        type="error"
        class="mb-4"
        closable
        @click:close="signupError = ''"
    >
      {{ signupError }}
    </v-alert>
    <Field name="username">
      <template #default="slotProps">
        <v-text-field
          v-bind="slotProps.field"
          label="Username"
          variant="outlined"
          :error="!!slotProps.errors.length"
          :error-messages="slotProps.errors"
          class="mb-4"
          required
        />
      </template>
    </Field>
    <Field name="email">
      <template #default="slotProps">
        <v-text-field
          v-bind="slotProps.field"
          label="Email"
          type="email"
          variant="outlined"
          :error="!!slotProps.errors.length"
          :error-messages="slotProps.errors"
          class="mb-4"
          required
        />
      </template>
    </Field>
    <Field name="profile_picture" v-slot="{ field, meta, errors, handleChange }">
      <v-file-input
        label="Profile Picture"
        variant="outlined"
        :error="!!errors.length"
        :error-messages="errors"
        class="mb-4"
        accept="image/*"
        :model-value="field.value"
        @update:model-value="files => handleChange(Array.isArray(files) ? files[0] : files)"
      />
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
    <v-btn @click="handleSubmit(onSubmit as any)" type="submit" color="primary" block :disabled="!meta.valid || isSubmitting"
           :class="{ 'submitting': isSubmitting }">Sign Up
    </v-btn>
  </Form>
</template>

<style scoped>
</style>