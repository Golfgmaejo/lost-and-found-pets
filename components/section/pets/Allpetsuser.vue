<template>
  <v-container>
    <v-main>
      <div class="text-center mb-4">
        <v-col class="d-flex justify-end">
          <v-btn color="red" class="mb-4" @click="openDialog">ประกาศสัตว์หาย</v-btn>
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
            v-for="(animal, index) in paginatedPets"
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
                  <v-img :src="animal.image_url" height="310"></v-img
                ></v-col>
                <v-col cols="12" md="7">
                  <v-card-text>
                    <div class="text-h5 font-weight-semibold mb-2">{{ animal.name }}</div>
                    <div class="mb-1">เพศ: {{ animal.gender }}</div>
                    <div class="mb-1">สายพันธุ์: {{ animal.breed }}</div>
                    <div class="mb-1">สี: {{ animal.color }}</div>

                    <template v-if="animal.source === 'lost_pet'">
                      <div class="mb-1">
                        อายุ: {{ animal.age_years || "-" }} ปี
                        {{ animal.age_month || "-" }} เดือน
                      </div>
                      <div class="mb-1">
                        รางวัล: {{ formatCurrency(animal.reward || 0) }}
                      </div>
                      <div class="mb-1">
                        วันที่: {{ animal.lost_date || "-" }}
                        {{ animal.lost_time || "-" }}
                      </div>
                      <div class="mb-1">สถานที่หาย: {{ animal.lost_place || "-" }}</div>
                    </template>

                    <template v-if="animal.source === 'find_owner'">
                      <div class="mb-1">
                        วันที่ประกาศ: {{ animal.findowner_date || "-" }}
                        {{ animal.findowner_time || "-" }}
                      </div>
                      <div class="mb-1">สถานที่พบ: {{ animal.findowner_place || "-" }}</div>
                    </template>

                    <template v-if="animal.source === 'adopt_pet'">
                      <div class="mb-1">
                        วันที่ประกาศ: {{ animal.adopt_date || "-" }}
                        {{ animal.adopt_time || "-" }}
                      </div>
                      <div class="mb-1">สถานที่พบ: {{ animal.adopt_place || "-" }}</div>
                    </template>

                    <template v-if="animal.source === 'lost_pet'">
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
                        <v-btn class="mt-3 ribbon" :disabled="true"
                          >เจอแล้ว</v-btn
                        >
                      </template>
                    </template>

                    <template v-if="animal.source === 'find_owner'">
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
                        <v-btn class="mt-3 ribbon" :disabled="true"
                          >พบเจ้าของแล้ว</v-btn
                        >
                      </template>
                    </template>

                    <template v-if="animal.source === 'adopt_pet'">
                      <template v-if="animal.status === 'กำลังหาบ้าน'">
                        <NuxtLink
                          :to="{
                            name: 'adopt_pet-detail-id',
                            params: { id: animal.id },
                          }"
                        >
                          <v-btn color="primary" class="mt-3">รายละเอียด</v-btn>
                        </NuxtLink>
                      </template>
                      <template v-else>
                        <v-btn class="mt-3 ribbon" :disabled="true"
                          >ได้บ้านแล้ว</v-btn
                        >
                      </template>
                    </template>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center mt-4">
          <v-pagination
            v-model="page"
            :length="totalPages"
            rounded="circle"
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
            <v-btn color="blue darken-1" text @click="closeDialog"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-container>
</template>

<script>
import Noticelostpets from "~/components/section/Admin/pets/Noticelostpets.vue";
import { ref } from "vue";
import axios from "axios";
import PetButtonsuser from "~/components/section/pets/PetButtonsuser.vue";

export default {
  components: {
    PetButtonsuser,
    Noticelostpets,
  },
  data() {
    return {
      allPetsList: [],
      pageTitle: "ประกาศสัตว์เลี้ยงทั้งหมด",
      isDialogOpen: false,
      page: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    paginatedPets() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allPetsList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.allPetsList.length / this.itemsPerPage);
    },
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const lostPetsResponse = await axios.get(
          "http://localhost:5000/api/lost_pet/getAll_lost_pets"
        );
        const lostPets = lostPetsResponse.data.data.map((pet) => ({
          ...pet,
          source: "lost_pet",
          date: pet.lost_date,
        }));

        const findOwnerResponse = await axios.get(
          "http://localhost:5000/api/find_owner/getAll_find_owner"
        );
        const findOwners = findOwnerResponse.data.data.map((pet) => ({
          ...pet,
          source: "find_owner",
          date: pet.find_date,
        }));

        const adoptPetResponse = await axios.get(
          "http://localhost:5000/api/adopt_pet/getAll_adopt_pet"
        );
        const adoptPets = adoptPetResponse.data.data.map((pet) => ({
          ...pet,
          source: "adopt_pet",
          date: pet.notice_date,
        }));

        this.allPetsList = [...lostPets, ...findOwners, ...adoptPets];
      } catch (error) {
        console.error("Error fetching data:", error);
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
  color: rgb(255, 255, 255);
  padding: 10px 50px; /* Increased padding for a larger ribbon */
  font-size: 32px; /* Increased font size */
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
  border-radius: 30px; /* Optional: adds rounded corners */
}
</style>