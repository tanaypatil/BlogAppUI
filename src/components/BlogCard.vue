<script setup lang="ts">

const props = defineProps<{
  title: string,
  slug: string,
  body: string,
  author: number
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

    <v-card-text class="bg-surface-light pt-4">
      {{ props.body }}
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>