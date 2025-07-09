<script setup lang="ts">

const props = defineProps<{
    title: string,
    slug: string,
    body: string,
    author: number
  }>()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="16" rounded>
          <v-card-item>
            <v-card-title>{{ props.title }}</v-card-title>

            <v-card-subtitle>{{ props.author }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{ props.body }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>