<template>
  <br />
  <br />
  <br />
  <v-carousel
    height="550px"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/gallery/getAll_gallery"
      );
      const galleryItems = response.data.data;
      this.images = galleryItems
        .filter((item) => item.status === true)
        .map((item) => item.image_url);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  },
};
</script>

<style scoped>
.v-carousel {
  height: 500px;
}
.v-carousel-item img {
  height: 100%;
  object-fit: cover;
}
</style>
