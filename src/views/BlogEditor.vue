<script setup lang="ts">

import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  category: yup.string().required('Category is required'),
  tags: yup.string().required('Tags are required')
})

const submitError = ref<string>('')

const onSubmit = () => {
  console.log('Form Submitted')
}
</script>

<template>
  <Form
    :validation-schema="schema"
    v-slot="{ meta, handleSubmit, isSubmitting }"
  >
    <v-container>
      <v-sheet class="pa-6" elevation="8">
        <v-row class="pa-3">
          <h1>Create a Blog</h1>
        </v-row>
        <v-divider class="border-opacity-25 ma-3"></v-divider>
        <v-row class="pa-3" v-if="submitError">
          <v-alert
            type="error"
            class="mb-4"
            closable
            @click:close="submitError = ''"
          >
            {{ submitError }}
          </v-alert>
        </v-row>
        <v-row class="pa-3 mt-1">
          <Field name="title">
            <template #default="slotProps">
              <v-text-field
                v-bind="slotProps.field"
                label="Title"
                type="text"
                variant="outlined"
                :error="!!slotProps.errors.length"
                :error-messages="slotProps.errors"
                required
              />
            </template>
          </Field>
        </v-row>
        <v-row class="pa-3">
          <Field name="body">
            <template #default="slotProps">
              <v-textarea
                v-bind="slotProps.field"
                type="text"
                :error="!!slotProps.errors.length"
                :error-messages="slotProps.errors"
                required
                clearable
                label="Blog body"
                variant="outlined"
              ></v-textarea>
            </template>
          </Field>
        </v-row>
        <v-row class="pa-3">
          <v-col cols="6">
            <Field name="category">
              <template #default="slotProps">
                <v-select
                  v-bind="slotProps.field"
                  :error="!!slotProps.errors.length"
                  :error-messages="slotProps.errors"
                  required
                  clearable
                  label="Category"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                ></v-select>
              </template>
            </Field>
          </v-col>
          <v-col cols="6">
            <Field name="tags">
              <template #default="slotProps">
                <v-combobox
                  v-bind="slotProps.field"
                  :error="!!slotProps.errors.length"
                  :error-messages="slotProps.errors"
                  required
                  clearable
                  chips
                  multiple
                  label="Tags"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                ></v-combobox>
              </template>
            </Field>
          </v-col>
        </v-row>
        <v-row class="pa-3">
          <v-btn
            @click="handleSubmit(onSubmit)"
            type="submit"
            color="primary"
            block
            :disabled="!meta.valid || isSubmitting"
            :class="{ submitting: isSubmitting }"
          >Create
          </v-btn>
        </v-row>
      </v-sheet>
    </v-container>
  </Form>
</template>

<style scoped>

</style>