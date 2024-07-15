<script setup>
import SortButtons from "./SortButtons.vue";
</script>
<template>
  <div>
    <div class="portfolio-component mini-spacer">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="text-portfolio-title">สินค้าสัตว์เลี้ยง</h2>
              <p class="text-portfolio">
                สินค้าสัตว์เลี้ยงคุณภาพสูงครบครันสำหรับการดูแลและพัฒนาสุขภาพของสัตว์เลี้ยงที่คุณรักให้มีชีวิตที่มีความสุขและสุขภาพดี.
              </p>
            </div>
          </v-col>
        </v-row>
        <SortButtons />
        <v-row class="mt-8">
          <v-col
            v-for="product in productList"
            :key="product.id"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card class="portfolio-card overflow-hidden card-shadow">
              <div
                class="portfolio-img"
                style="display: flex; justify-content: space-around"
              >
                <img :src="product.image_url" class="img-fluid" />
              </div>
              <v-card-text class="pa-5">
                <p class="text-card-subtext">{{ product.type }}</p>
                <p class="text-card-title">{{ product.name }}</p>
                <p class="text-card-subtext-title">{{ product.details }}</p>
                <div class="btn-sty">
                  <v-btn
                    :disabled="!product.link_Shopee"
                    variant="tonal"
                    class="d-flex"
                    style="margin-right: 12px"
                    color="#ee4d2d"
                  >
                    <a
                      :href="product.link_Shopee"
                      class="text-theme-Shopee linking text-decoration-none d-flex align-center"
                    >
                      Shopee
                    </a>
                  </v-btn>
                  <v-btn
                    :disabled="!product.link_Lazada"
                    variant="tonal"
                    class="d-flex"
                    color="#151b69"
                  >
                    <a
                      :href="product.link_Lazada || '#'"
                      class="text-theme-Lazada linking text-decoration-none d-flex align-center"
                    >
                      Lazada
                    </a>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      productList: [],
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      const url = "http://localhost:5000/api/product/getAll_product";
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.productList = response.data.data;
        })

        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    },
  },
};
</script>

<style>
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 36px;
  font-weight: 700;
}
.text-card-title {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 18px;
  font-weight: 500;
  /* margin: 5px; */
}
.text-card-subtext {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.text-theme-Shopee {
  font-family: "Prompt", sans-serif;
  color: #ee4d2d;
  font-size: 16px;
  font-weight: 400;
}
.text-theme-Lazada {
  font-family: "Prompt", sans-serif;
  color: #151b69;
  font-size: 16px;
  font-weight: 400;
}
.btn-sty {
  margin-top: 12px;
  display: flex;
}
.text-card-subtext-title {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 14px;
  /* font-weight: 400; */
}
</style>
