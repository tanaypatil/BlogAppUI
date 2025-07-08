<script setup lang="ts">
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "../stores/userStore.ts";
import { ref, type Ref } from "vue";
import type { ISignupForm } from "../interfaces/ISignupForm.ts";

const schema: yup.ObjectSchema<{
  username: string;
  email: string;
  profile_picture: File | null;
  password: string;
}> = yup.object({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Email must be valid"),
  profile_picture: yup.mixed<File>().nullable().notRequired().transform((value) => (value === undefined ? null : value)) as yup.Schema<File | null>,
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const userStore = useUserStore();
const signup: (userdata: ISignupForm) => Promise<void> = userStore.signup;

const signupError: Ref<string> = ref('');
const imagePreview: Ref<string | null> = ref(null);

const handleFileChange = (file: File | null, handleChange: (file: File | null) => void): void => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.value = null;
  }
  handleChange(file);
};

const onSubmit = async (
  values: ISignupForm,
  { setFieldError }: { setFieldError: (field: string, message: string) => void }
): Promise<void> => {
  try {
    await signup(values);
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
};
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
    <Field name="profile_picture" v-slot="{ field, meta, errors, handleChange }">
      <div class="profile-picture-container">
        <div class="circular-upload" @click="$refs.fileInput.click()">
          <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="(e) => handleFileChange(e.target?.files[0], handleChange)"
          />
          <div v-if="imagePreview" class="image-preview">
            <img
                :src="imagePreview"
                alt="Profile picture preview"
                class="preview-image"
            />
          </div>
          <div v-else class="upload-placeholder">
            <v-icon size="48" color="grey">mdi-camera-plus</v-icon>
            <div class="upload-text">Add Photo</div>
          </div>
        </div>
        <div v-if="errors.length" class="error-messages">
          <div v-for="error in errors" :key="error" class="error-text">
            {{ error }}
          </div>
        </div>
      </div>
    </Field>
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
.profile-picture-container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circular-upload {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
}

.circular-upload:hover {
  border-color: #1976d2;
  background-color: #f5f5f5;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.upload-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.image-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.error-messages {
  margin-top: 8px;
  text-align: center;
}

.error-text {
  color: #d32f2f;
  font-size: 12px;
  line-height: 1.2;
}
</style>