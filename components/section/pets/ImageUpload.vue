<template>
    <div>
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        ref="fileInput"
        class="hidden"
      />
      <v-btn @click="triggerFileInput" color="secondary">Upload Image</v-btn>
      <div v-if="previewImage" class="mt-3">
        <img :src="previewImage" alt="Preview" class="w-full h-auto"/>
        <v-btn @click="removeImage" color="red" class="mt-2">Remove</v-btn>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
  
  const fileInput = ref(null)
  const previewImage = ref(null)
  
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      previewImage.value = URL.createObjectURL(newValue)
    } else {
      previewImage.value = null
    }
  })
  
  const triggerFileInput = () => {
    fileInput.value.click()
  }
  
  const onFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      emit('update:modelValue', file)
    }
  }
  
  const removeImage = () => {
    emit('update:modelValue', null)
  }
  </script>
  
  <style scoped>
  .hidden {
    display: none;
  }
  </style>
  