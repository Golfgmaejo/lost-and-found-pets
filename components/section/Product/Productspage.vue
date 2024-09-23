<template>
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
    <SortButtons @filter="fetchProduct" />
    <v-row class="mt-8">
      <v-col
        v-for="product in paginatedProductList"
        :key="product.id"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card class="portfolio-card overflow-hidden card-shadow">
          <div
            class="portfolio-img"
            style="
              display: flex;
              justify-content: space-around;
              position: relative;
            "
          >
            <div v-if="product.isBestSeller" class="best-seller-ribbon">
              Best seller
            </div>
            <img :src="product.image_url" class="img-fluid" />
          </div>
          <v-card-text class="pa-5">
            <p class="text-card-subtext">สำหรับ{{ product.type }}</p>
            <p class="text-card-title">{{ product.truncatedName }}</p>
            <p class="text-card-subtext-title">
              {{ product.truncatedDetails }}
            </p>
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
    <v-pagination
      v-model="page"
      :length="pageCount"
      rounded="circle"
      @input="updatePage"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";
import SortButtons from "./SortButtons.vue";

export default {
  components: {
    SortButtons,
  },
  data() {
    return {
      productList: [],
      itemsPerPage: 9,
      page: 1,
    };
  },
  created() {
    this.fetchProduct();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.productList.length / this.itemsPerPage);
    },
    paginatedProductList() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.productList.slice(start, end);
    },
  },
  methods: {
    fetchProduct(type = "") {
      const url = "http://localhost:5000/api/product/getAll_product";
      axios
        .get(url)
        .then((response) => {
          let products = response.data.data;
          if (type) {
            products = products.filter((product) => product.type === type);
          }
          products = products.sort((a, b) => b.isBestSeller - a.isBestSeller);
          this.productList = products.map((product) => ({
            ...product,
            truncatedName: this.truncateText(product.name, 30),
            truncatedDetails: this.truncateText(product.details, 40),
          }));
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    },
    truncateText(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    },
  },
};
</script>

<style>
.v-btn {
  border-radius: 30px;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #444;
  font-size: 18px;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}
.text-card-title {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}
.text-card-title:hover {
  color: #d9534f;
}
.text-card-subtext,
.text-card-subtext-title {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
}
.portfolio-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.portfolio-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.portfolio-img img {
  border-radius: 8px;
  max-width: 100%;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.portfolio-img:hover img {
  transform: scale(1.05);
  opacity: 0.9;
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
.btn-sty a {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 8px 20px;
}
.v-btn {
  box-shadow: none;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.v-btn:hover {
  background-color: #ddd;
  transform: scale(1.05);
}
.v-pagination {
  margin-top: 20px;
  justify-content: center;
}
.v-pagination .v-btn {
  border-radius: 50%;
  background-color: #f8f9fa;
}
.v-pagination .v-btn:hover {
  background-color: #f0f0f0;
}
.best-seller-ribbon {
  position: absolute;
  top: 10px;
  left: -25px;
  transform: rotate(-45deg);
  background-color: rgba(255, 69, 0, 0.85);
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  z-index: 1;
}
.team-component {
  background-color: #faf6f0;
}
</style>
