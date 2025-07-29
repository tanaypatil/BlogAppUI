<script setup lang="ts">

import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { onMounted, ref } from 'vue'
import type { IBlogForm } from '../interfaces/IBlogForm.ts'
import { createBlog, fetchBlog, updateBlog } from '../api/blogsApi.ts'
import { getTags } from '../api/tagsApi.ts'
import { fetchCategories } from '../api/categoriesApi.ts'
import type { Blog } from '../interfaces/Blog.ts'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const schema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()).required('At least one tag is required')
})

const tags = ref<string[]>([])
const categories = ref<string[]>([])
const isLoading = ref(true)
const blogData = ref<IBlogForm | null>(null)
const formKey = ref(0)

// Simple initial values object
const initialValues = {
  title: "",
  body: "",
  category: "",
  tags: []
}

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

  if (route.params.slug) {
    const fetchedBlog = await fetchBlog(route.params.slug)
    blogData.value = {
      title: fetchedBlog.title,
      body: fetchedBlog.body,
      category: fetchedBlog.category,
      tags: fetchedBlog.tags
    }
  }

  isLoading.value = false
})

const submitError = ref<string>('')

const onSubmit = async (values: IBlogForm, { setFieldError }: any) => {
  try {
    let response
    if(route.params.slug) {
      response = await updateBlog(route.params.slug, values)
    } else {
      response = await createBlog(values)
    }
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
  <div v-if="isLoading">Loading...</div>
  <Form
    v-else
    :key="formKey"
    :validation-schema="schema"
    :initial-values="blogData || initialValues"
    v-slot="{ meta, handleSubmit, isSubmitting }"
  >
    <v-container>
      <v-sheet class="pa-6" elevation="8">
        <v-row class="pa-3">
          <h1>{{ route.params.slug ? 'Edit Blog' : 'Create a Blog' }}</h1>
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
          <Field name="title" v-slot="{ field, errors }">
            <v-text-field
              :model-value="field.value"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              label="Title"
              type="text"
              variant="outlined"
              :error="!!errors.length"
              :error-messages="errors"
              required
            />
          </Field>
        </v-row>
        <v-row class="pa-3">
          <Field name="body" v-slot="{ field, errors }">
            <v-textarea
              :model-value="field.value"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              type="text"
              :error="!!errors.length"
              :error-messages="errors"
              required
              clearable
              label="Blog body"
              variant="outlined"
            />
          </Field>
        </v-row>
        <v-row class="pa-3">
          <v-col cols="6">
            <Field name="category" v-slot="{ field, errors }">
              <v-select
                :model-value="field.value"
                @update:model-value="field.onChange"
                @blur="field.onBlur"
                :error="!!errors.length"
                :error-messages="errors"
                required
                clearable
                label="Category"
                :items="categories"
                variant="outlined"
              />
            </Field>
          </v-col>
          <v-col cols="6">
            <Field name="tags" v-slot="{ field, errors }">
              <v-combobox
                :model-value="field.value"
                @update:model-value="field.onChange"
                @blur="field.onBlur"
                :error="!!errors.length"
                :error-messages="errors"
                required
                clearable
                chips
                multiple
                label="Tags"
                :items="tags"
                variant="outlined"
              />
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
          >{{ route.params.slug ? 'Update' : 'Create' }}
          </v-btn>
        </v-row>
      </v-sheet>
    </v-container>
  </Form>
</template>

<style scoped>

</style>