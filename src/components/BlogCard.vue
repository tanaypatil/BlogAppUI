<script setup lang="ts">

const props = defineProps<{
  title: string,
  slug: string,
  body: string,
  author: number,
  profile_picture: string,
}>()
</script>

<template>

  <v-card
      class="mx-auto"
      :subtitle="props.author"
      rounded elevation="32"
      border
  >
    <template v-slot:title>
      <span class="font-weight-black">{{ props.title }}</span>
    </template>
    <template v-slot:subtitle>
      <span class="subtitle-flex">
        <v-img class="profile_picture" :src="props.profile_picture" width="32" height="32" cover></v-img>
        <span class="author-text">{{ props.author }}</span>
      </span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      {{ props.body }}
    </v-card-text>
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
}
</style>