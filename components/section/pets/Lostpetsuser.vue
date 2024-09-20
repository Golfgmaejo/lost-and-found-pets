<template>
  <v-container>
    <div class="text-center mb-4">
      <v-col class="d-flex justify-end">
        <v-btn color="red" @click="openDialog" class="mb-4"
          >ประกาศสัตว์หาย</v-btn
        >
      </v-col>
      <div>
        <PetButtonsuser />
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
          v-for="(animal, index) in paginatedLostpets"
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
                <v-img :src="animal.image_url" height="310" contain></v-img
              ></v-col>
              <v-col cols="12" md="7">
                <v-card-text>
                  <div class="text-h5 font-weight-semibold mb-2">
                    {{ animal.name }}
                  </div>
                  <div class="mb-1">เพศ: {{ animal.gender }}</div>
                  <div class="mb-1">
                    อายุ: {{ animal.age_years }} ปี {{ animal.age_month }} เดือน
                  </div>
                  <div class="mb-1">สายพันธุ์: {{ animal.breed }}</div>
                  <div class="mb-1">สี: {{ animal.color }}</div>
                  <div class="mb-1">
                    รางวัล: {{ formatCurrency(animal.reward) }}
                  </div>
                  <div class="mb-1">
                    หายเมื่อ: {{ animal.lost_date }} {{ animal.time }}
                  </div>
                  <div class="mb-1">สถานที่หาย: {{ animal.lost_place }}</div>
                  <div>
                    <template v-if="animal.status === 'หาย'">
                      <NuxtLink
                        :to="{
                          name: 'lost_pet-detail-id',
                          params: { id: animal.id },
                        }"
                      >
                        <v-btn color="primary" class="mt-3">รายละเอียด</v-btn>
                      </NuxtLink>
                    </template>
                    <template v-else>
                      <v-btn class="ribbon mt-3" :disabled="true">
                        เจอแล้ว
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

    <v-dialog v-model="isDialogOpen" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <Noticelostpets />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import Noticelostpets from "~/components/section/Admin/pets/Noticelostpets.vue";
import PetButtonsuser from "~/components/section/pets/PetButtonsuser.vue";

export default {
  components: {
    PetButtonsuser,
    Noticelostpets,
  },
  data() {
    return {
      lostpetsList: [],
      pageTitle: "ประกาศสัตว์เลี้ยงหาย",
      isDialogOpen: false,
      itemsPerPage: 8, // Number of items to show per page
      page: 1, // Current page
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.lostpetsList.length / this.itemsPerPage);
    },
    paginatedLostpets() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.lostpetsList.slice(start, end);
    },
  },
  created() {
    this.fetchLostpets();
  },
  methods: {
    async fetchLostpets() {
      const url = `http://localhost:5000/api/lost_pet/getAll_lost_pets`;
      try {
        const response = await axios.get(url);
        this.lostpetsList = response.data.data;
      } catch (error) {
        console.error("Error fetching lost pets:", error);
      }
    },
    formatCurrency(value) {
      const formattedValue = new Intl.NumberFormat("th-TH", {
        currency: "THB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      return `${formattedValue} บาท`;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
  mounted() {
    this.fetchLostpets();
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
  transform: translate(-100%, -50%) rotate(-45deg);
  background-color: rgba(17, 255, 0, 0.85);
  color: white;
  padding: 10px 80px; /* Increased padding for a larger ribbon */
  font-size: 32px; /* Increased font size */
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
  border-radius: 30px; /* Optional: adds rounded corners */
}
</style>
