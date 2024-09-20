<template>
  <v-container>
    <div class="text-center mb-4">
      <v-col class="d-flex justify-end">
        <v-btn color="red" @click="() => $router.push('/register')" class="mb-4">
          ประกาศหาเจ้าของ
        </v-btn>
      </v-col>
      <div>
        <PetButtons />
      </div>
    </div>

    <v-container class="mt-8">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold mb-6">{{ pageTitle }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(animal, index) in paginatedFindowner"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card class="d-flex mb-4 px-3 bg-light elevation-2">
            <v-row>
              <v-col
                cols="12"
                md="5"
                class="d-flex align-center justify-center"
                style="min-height: 250px"
              >
                <v-img :src="animal.image_url" height="310" contain></v-img>
              </v-col>
              <v-col cols="12" md="7">
                <v-card-text>
                  <div class="mb-4">เพศ: {{ animal.gender }}</div>
                  <div class="mb-4">สายพันธุ์: {{ animal.breed }}</div>
                  <div class="mb-4">สี: {{ animal.color }}</div>
                  <div class="mb-4">
                    วันที่ประกาศ: {{ animal.findowner_date }}
                    {{ animal.findowner_time }}
                  </div>
                  <div class="mb-4">
                    สถานที่พบ: {{ animal.findowner_place }}
                  </div>
                  <div>
                    <template v-if="animal.status === 'กำลังหาเจ้าของ'">
                      <NuxtLink
                        :to="{
                          name: 'find_owner-detail-id',
                          params: { id: animal.id },
                        }"
                      >
                        <v-btn color="primary" class="mt-3">รายละเอียด</v-btn>
                      </NuxtLink>
                    </template>
                    <template v-else>
                      <v-btn class="ribbon mt-3" :disabled="true">
                        พบเจ้าของแล้ว
                      </v-btn>
                    </template>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mt-4">
        <v-pagination
          v-model="page"
          :length="pageCount"
          rounded="circle"
          @input="updatePage"
        ></v-pagination>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import PetButtons from "./PetButtons.vue";

export default {
  components: {
    PetButtons,
  },
  data() {
    return {
      findownersList: [],
      pageTitle: "ประกาศหาเจ้าของ",
      isDialogOpen: false,
      itemsPerPage: 8,
      page: 1,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.findownersList.length / this.itemsPerPage);
    },
    paginatedFindowner() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.findownersList.slice(start, end);
    },
  },
  created() {
    this.fetchFindowners();
  },
  methods: {
    async fetchFindowners() {
      const url = `http://localhost:5000/api/find_owner/getAll_find_owner`;
      try {
        const response = await axios.get(url);
        this.findownersList = response.data.data;
      } catch (error) {
        console.error("Error fetching find owners:", error);
      }
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
  mounted() {
    this.fetchFindowners();
  },
};
</script>

<style scoped>
.text-h3 {
  font-size: 2rem;
}
.text-h5 {
  font-size: 1.5rem;
}
.font-weight-bold {
  font-weight: 700;
}
.elevation-2 {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.bg-light {
  background-color: #f5f5f5;
}
.mt-8 {
  margin-top: 2rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.ribbon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-95%, -50%) rotate(-45deg);
  background-color: rgba(17, 255, 0, 0.85);
  color: white;
  padding: 10px 50px; /* Increased padding for a larger ribbon */
  font-size: 32px; /* Increased font size */
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
  border-radius: 30px; /* Optional: adds rounded corners */
}
</style>
