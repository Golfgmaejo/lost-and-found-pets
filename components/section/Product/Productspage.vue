<template>
  <v-container style="margin-top: 95px">
    <v-row>
      <v-col style="display: flex">
        <v-img
          :width="1050"
          aspect-ratio="16/9"
          cover
          src="/images/pets/สินค้า.png"
          class="rounded-img"
          style="border: 10px solid rgba(233, 121, 49, 0.1)"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          hide-slider
          height="50"
          class="custom-tabs"
          grow
          show-arrows
        >
          <v-tab
            v-for="type in productTypes"
            :key="type.value"
            :value="type.value"
            :class="{
              [`tab-${type.value}`]: true,
              'active-tab': tab === type.value,
            }"
            style="margin-left: 10px; margin-right: 10px"
          >
            <span class="text-portfolio-tab">{{ type.label }}</span>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item
            v-for="(type, index) in productTypes"
            :key="index"
            :value="type.value"
          >
            <div style="margin-top: 32px">
              <p class="centered-text-with-lines">สินค้า{{ type.label }}</p>
            </div>
            <v-row class="mt-8">
              <v-col
                v-for="product in paginatedProducts"
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
                    <p class="text-card-subtext">สำหรับ {{ product.type }}</p>
                    <p class="text-card-title">{{ product.truncatedName }}</p>
                    <p class="text-card-subtext-title">
                      {{ product.truncatedDetails }}
                    </p>
                    <div class="btn-sty">
                      <v-btn
                        :disabled="!product.link_Shopee"
                        variant="tonal"
                        style="margin-right: 12px"
                        color="#ee4d2d"
                      >
                        <a
                          :href="product.link_Shopee"
                          class="text-theme-Shopee linking text-decoration-none d-flex align-center"
                          >Shopee</a
                        >
                      </v-btn>
                      <v-btn
                        :disabled="!product.link_Lazada"
                        variant="tonal"
                        color="#151b69"
                      >
                        <a
                          :href="product.link_Lazada || '#'"
                          class="text-theme-Lazada linking text-decoration-none d-flex align-center"
                          >Lazada</a
                        >
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>

        <v-divider
          :thickness="3"
          color="#582e2c"
          style="margin: 22px 0"
        ></v-divider>

        <div class="text-center mt-4">
          <v-pagination
            v-model="page"
            :length="pageCount"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            active-color="#e97931"
            rounded="circle"
            @input="updatePage"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const productList = ref([]);
const productTypes = ref([
  { value: "สุนัข", label: "สุนัข" },
  { value: "แมว", label: "แมว" },
  { value: "สัตว์เลี้ยงอื่นๆ", label: "สัตว์เลี้ยงอื่นๆ" },
  { value: "", label: "ทั้งหมด" },
]);
const itemsPerPage = ref(6);
const page = ref(1);
const tab = ref(productTypes.value[0].value);

const route = useRoute();
const router = useRouter();

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const filteredProducts = (type) => {
  return type
    ? productList.value.filter((product) => product.type === type)
    : productList.value;
};

const paginatedProducts = computed(() => {
  const products = filteredProducts(tab.value);
  const start = (page.value - 1) * itemsPerPage.value;
  return products.slice(start, start + itemsPerPage.value);
});

const pageCount = computed(() => {
  return Math.ceil(filteredProducts(tab.value).length / itemsPerPage.value);
});

const updatePage = (newPage) => {
  page.value = newPage;
};

watch(route, (newRoute) => {
  if (newRoute.query.tab) {
    const foundType = productTypes.value.find(
      (type) => type.value === newRoute.query.tab
    );
    if (foundType) {
      tab.value = foundType.value;
    }
  }
});

watch(tab, () => {
  page.value = 1;
});

onMounted(() => {
  fetchProduct();
  if (route.query.tab) {
    const foundType = productTypes.value.find(
      (type) => type.value === route.query.tab
    );
    if (foundType) {
      tab.value = foundType.value;
    }
  }
});

const parseTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp === "object" && "seconds" in timestamp) {
    return new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
    );
  }
  console.error("Invalid timestamp:", timestamp);
  return new Date(0);
};

const fetchProduct = async () => {
  const url = "http://localhost:5000/api/product/getAll_product";
  try {
    const response = await axios.get(url);
    let products = response.data.data;

    products = products.map((product) => ({
      ...product,
      parsedCreatedAt: parseTimestamp(product.created_at),
      truncatedName: truncateText(product.name, 30),
      truncatedDetails: truncateText(product.details, 40),
    }));
    products.sort((a, b) => {
      if (b.isBestSeller !== a.isBestSeller) {
        return b.isBestSeller - a.isBestSeller;
      }
      return b.parsedCreatedAt - a.parsedCreatedAt;
    });

    productList.value = products;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

</script>

<style scoped>
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 32px;
  font-weight: 700;
}
.text-portfolio-tab {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 18px;
  font-weight: 500;
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
.v-tab.v-tab.v-btn {
  border-radius: 45px;
  min-width: 90px;
}
.v-slide-group__container {
  background-color: #faf6f0;
  border-radius: 50px;
}
.custom-tabs {
  background-color: #faf6f0;
  border-radius: 40px;
}

.active-tab {
  background-color: #ffca7a;
  box-shadow: 0px 2px 4px 0 rgba(96, 97, 112, 0.16),
    0px 0px 1px 0 rgba(40, 41, 61, 0.04);
}
.text-tab-dog {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.centered-text {
  text-align: center;
}
.centered-text-with-lines {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Prompt", sans-serif;
  color: #e48245;
  font-size: 24px;
  font-weight: 500;
}

.centered-text-with-lines::before,
.centered-text-with-lines::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc; /* เปลี่ยนสีและความหนาของเส้นได้ตามต้องการ */
  margin: 0 10px; /* ระยะห่างระหว่างเส้นกับข้อความ */
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
</style>
