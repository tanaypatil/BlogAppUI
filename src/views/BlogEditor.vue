<script setup lang="ts">

import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { onMounted, ref } from 'vue'
import type { IBlogForm } from '../interfaces/IBlogForm.ts'
import { createBlog } from '../api/blogsApi.ts'
import { getTags } from '../api/tagsApi.ts'
import { fetchCategories } from '../api/categoriesApi.ts'
import type { Blog } from '../interfaces/Blog.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const schema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()).required('At least one tag is required')
})

const tags = ref<string[]>([])
const categories = ref<string[]>([])

const getTagsList = async () => {
  const tagsJson = await getTags()
  for (const tag of tagsJson) {
    tags.value.push(tag['name'])
  }
}

const getCategories = async () => {
  categories.value = await fetchCategories()
}

onMounted(async () => {
  await getTagsList()
  await getCategories()
})

const submitError = ref<string>('')

const onSubmit = async (values: IBlogForm, { setFieldError }: any) => {
  try {
    const response = await createBlog(values)
    console.log(response.data)
    const blog = response.data as Blog
    await router.push({ name: 'blog', params: { 'slug': blog.slug } })
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data

      if (errorData.title) {
        setFieldError(
          'title',
          Array.isArray(errorData.title)
            ? errorData.title[0]
            : errorData.title
        )
      }
      if (errorData.body) {
        setFieldError(
          'body',
          Array.isArray(errorData.body)
            ? errorData.body[0]
            : errorData.body
        )
      }

      if (errorData.category) {
        setFieldError(
          'category',
          Array.isArray(errorData.category)
            ? errorData.category[0]
            : errorData.category
        )
      }

      if (errorData.tags) {
        setFieldError(
          'tags',
          Array.isArray(errorData.tags)
            ? errorData.tags[0]
            : errorData.tags
        )
      }

      // Handle non-field errors
      if (errorData.non_field_errors) {
        submitError.value = Array.isArray(errorData.non_field_errors)
          ? errorData.non_field_errors[0]
          : errorData.non_field_errors
      } else if (errorData.error || errorData.error_description) {
        submitError.value = errorData.error_description || errorData.error
      } else if (errorData.detail) {
        submitError.value = errorData.detail
      } else {
        submitError.value = 'Error creating blog.'
      }
    } else {
      submitError.value = error.message || 'Login failed. Please try again.'
    }
  }
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
                  :items="categories"
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
                  :items="tags"
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