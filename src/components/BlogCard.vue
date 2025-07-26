<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  slug: string
  body: string
  author: string
  profile_picture: string | null
  tags: string[],
  category: string
}>()

const WORD_LIMIT = 80
const words = props.body.split(/\s+/)
const previewText = computed(() => words.slice(0, WORD_LIMIT).join(' '))
</script>

<template>
  <v-card
    class="mx-auto"
    :subtitle="props.author"
    rounded
    elevation="24"
    border
  >
    <template v-slot:title>
      {{ props.title }}
      <v-divider class="mb-4"></v-divider>
    </template>
    <v-divider class="mb-4"></v-divider>
    <template v-slot:subtitle>
      <template v-if="props.profile_picture">
        <v-img
          class="profile_picture"
          :src="props.profile_picture"
          width="32"
          height="32"
          cover
        ></v-img>
      </template>
      <template v-else>
        <v-icon class="profile_picture" size="32">mdi-account-circle</v-icon>
      </template>
      <span class="author-text">{{ props.author }}</span> | <span class="author-text">{{ props.category }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      {{ previewText }}
    </v-card-text>
    <v-card-actions>
      <div>
        <router-link
          :to="{ name: 'blog', params: { slug: props.slug } }"
          class="read-more-link text-button"
        >
          <v-btn variant="tonal" color="blue-grey-darken-1">Read more</v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-sheet class="pa-2">
        <v-chip-group
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="tag in props.tags"
            :key="tag" class="bg-blue-grey-darken-1"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-card-actions>
  </v-card>
</template>

<style>
.subtitle-flex {
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile_picture {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  border-radius: 50%;
  display: inline-block !important;
  flex-shrink: 0;
}

.author-text {
  display: inline-block;
  vertical-align: middle;
  font-size: smaller;
}

.read-more-link {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
  font-weight: 500;
}
</style>
