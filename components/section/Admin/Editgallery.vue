<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn @click="addItem">Add New Item</v-btn>
        </v-col>
      </v-row>
      <v-row v-for="(item, index) in galleryItems" :key="item.id" align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="item.title"
            label="Title"
            @change="updateItem(index, 'title', item.title)"
          />
          <v-file-input
            label="Upload Image"
            @change="uploadImage($event, index)"
          />
          <v-text-field
            v-model="item.externalLink"
            label="External Link"
            @change="updateItem(index, 'externalLink', item.externalLink)"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-img :src="item.imageUrl" height="200px"></v-img>
        </v-col>
        <v-col cols="12">
          <v-btn @click="removeItem(index)">Remove</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="saveGallery">Save Gallery</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Simulating the ID generation and initial data
  let idCounter = 1;
  const generateId = () => idCounter++;
  
  const galleryItems = ref([
    { id: generateId(), title: '', imageUrl: '', externalLink: '' }
  ]);
  
  const addItem = () => {
    galleryItems.value.push({ id: generateId(), title: '', imageUrl: '', externalLink: '' });
  };
  
  const removeItem = (index) => {
    galleryItems.value.splice(index, 1);
  };
  
  const updateItem = (index, field, value) => {
    galleryItems.value[index][field] = value;
  };
  
  const uploadImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        galleryItems.value[index].imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveGallery = () => {
    // Implement the save functionality, e.g., sending the data to the server
    console.log('Saving gallery:', galleryItems.value);
  };
  </script>
  
  <style scoped>
  .v-img {
    border: 1px solid #ccc;
    margin-bottom: 16px;
  }
  </style>
  