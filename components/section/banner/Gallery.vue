<template>
  <div class="banner-wrapper">
    <v-carousel
      height="500"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
    <v-carousel-item
      src="https://www.ktc.co.th/pub/media/Article/06/ktc-dog-1200x630.webp"
      cover
    ></v-carousel-item>
    <v-carousel-item
      src="https://shopee.co.th/blog/wp-content/uploads/2020/07/Shopee-Blog-%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2.jpg"
      cover
    ></v-carousel-item>
    <v-carousel-item
      src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K4BG1afANvfhsI0uwEO1wESe3ZeLKGyfPL4Ti6DjFSG9nsKQwF.jpg"
      cover
    ></v-carousel-item>
    <v-carousel-item
      src="https://image.springnews.co.th/uploads/images/md/2022/04/XEOAZWPm9n7Y0voVnc7q.webp?x-image-process=style/LG-webp"
      cover
    ></v-carousel-item>
      <!-- <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </div>
        </v-sheet>
      </v-carousel-item> -->
    </v-carousel>
  </div>
</template>
<script>
export default {
  data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
}
</script>
<style>

</style>
