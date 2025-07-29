<script setup>
import { ref } from 'vue'

const emit = defineEmits(['post'])

const comment = ref('')

function emitPost() {
  if (!comment.value.trim()) return
  emit('post', comment.value.trim())
  comment.value = ''
}
</script>

<template>
  <v-row align="center" no-gutters class="pa-3">
    <v-col cols="4" offset="4">
      <div class="pa-2 rounded bg-blue-grey-lighten-1">
        <v-text-field
          v-model="comment"
          dense
          variant="underlined"
          label="Add a comment"
          clearable
          hide-details
          @keyup.enter="emitPost"
        />
      </div>
    </v-col>
    <v-col cols="1">
      <div class="pa-2 rounded">
        <v-btn
          color="primary"
          icon
          :disabled="!comment.trim()"
          @click="emitPost"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
