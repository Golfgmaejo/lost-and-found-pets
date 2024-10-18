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
  methods: {
    parseTimestamp(timestamp) {
      if (
        timestamp &&
        typeof timestamp === "object" &&
        "seconds" in timestamp
      ) {
        return new Date(
          timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
        );
      }
      console.error("Invalid timestamp:", timestamp);
      return new Date(0);
    },
    async fetchGalleryImages() {
      try {
        const response = await axios.get(
          "https://lost-and-found-pets-backend.onrender.com/api/gallery/getAll_gallery"
        );
        const galleryItems = response.data.data;

        this.images = galleryItems
          .filter((item) => item.status === true)
          .sort((a, b) => {
            const dateA = this.parseTimestamp(a.created_at);
            const dateB = this.parseTimestamp(b.created_at);
            return dateB - dateA;
          })
          .map((item) => item.image_url);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    },
  },
  async mounted() {
    await this.fetchGalleryImages();
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
