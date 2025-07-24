import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthDialogStore = defineStore("authDialogStore", () => {
  const isDialogOpen = ref<boolean>(false)

  const openDialog = () => {
    isDialogOpen.value = true
  }

  const closeDialog = () => {
    isDialogOpen.value = false
  }

  return  { isDialogOpen, openDialog, closeDialog }
})