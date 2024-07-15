<template>
  <div class="banner-wrapper">
    <v-carousel
      height="500px"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://www.ktc.co.th/pub/media/Article/06/ktc-dog-1200x630.webp",
        "https://shopee.co.th/blog/wp-content/uploads/2020/07/Shopee-Blog-%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2.jpg",
        "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K4BG1afANvfhsI0uwEO1wESe3ZeLKGyfPL4Ti6DjFSG9nsKQwF.jpg",
        "https://image.springnews.co.th/uploads/images/md/2022/04/XEOAZWPm9n7Y0voVnc7q.webp?x-image-process=style/LG-webp",
      ],
    };
  },
};
</script>

<style>
.banner-wrapper {
  width: 100%;
}

/* กำหนดความสูงของ Carousel */
.v-carousel {
  height: 500px; /* ปรับเป็นค่าที่เหมาะสมกับความต้องการ */
}

/* ปรับขนาดรูปใน Carousel */
.v-carousel-item img {
  height: 100%; /* ให้รูปภาพเต็มความสูงของ Carousel */
  object-fit: cover; /* ปรับให้รูปภาพครอบคลุมพื้นที่ให้เต็ม */
}
</style>
