<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string,
  slug: string,
  body: string,
  author: number,
  profile_picture: string,
  tags: string[]
}>()

const WORD_LIMIT = 80;
const words = props.body.split(/\s+/);
const previewText = computed(() =>
  words.slice(0, WORD_LIMIT).join(' ')
);
</script>

<template>

  <v-card
      class="mx-auto"
      :subtitle="props.author"
      rounded elevation="24"
      border
  >
    <template v-slot:title>
      <span class="font-weight-black">{{ props.title }}</span>
      <span class="subtitle-flex">
        <template v-if="props.profile_picture">
          <v-img class="profile_picture" :src="props.profile_picture" width="32" height="32" cover></v-img>
        </template>
        <template v-else>
          <v-icon class="profile_picture" size="32">mdi-account-circle</v-icon>
        </template>
        <span class="author-text">{{ props.author }}</span>
      </span>
    </template>
    <template v-slot:subtitle>
      <div class="bg-amber mt-1 rounded">
        <v-chip class="ma-2" variant="elevated" v-for="tag in props.tags">
          {{ tag }}
        </v-chip>
      </div>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      {{ previewText }}
    </v-card-text>

    <v-card-actions>
      <router-link :to="{ name: 'blog', params: { slug: props.slug }}" class="read-more-link">Read more</router-link>
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