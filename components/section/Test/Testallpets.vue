<template>
  <v-container>
    <v-main>
      <div class="text-center">
        <v-col class="d-flex justify-end">
          <v-btn color="red" @click="openDialog">ประกาศสัตว์หาย</v-btn>
        </v-col>
        <div>
          <PetButtons />
        </div>
      </div>

      <v-container class="mt-16">
        <v-row>
          <v-col cols="12">
            <h1 class="text-5xl mb-8">{{ pageTitle }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="(animal, index) in paginatedPets"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card class="d-flex mb-5 px-3 bg-light">
              <v-row>
                <v-col
                  cols="12"
                  md="5"
                  class="d-flex flex-wrap align-items-center"
                  style="min-height: 250px"
                >
                  <v-img :src="animal.image_url" height="310"></v-img
                ></v-col>
                <v-col cols="12" md="7">
                  <v-card-text>
                    <div class="text-h5 mb-2">{{ animal.name }}</div>
                    <div>เพศ: {{ animal.gender }}</div>
                    <div v-if="animal.source === 'lost_pet'">
                      อายุ: {{ animal.age_years || "-" }} ปี
                      {{ animal.age_month || "-" }} เดือน
                    </div>
                    <div>สายพันธุ์: {{ animal.breed }}</div>
                    <div>สี: {{ animal.color }}</div>
                    <div v-if="animal.source === 'lost_pet'">
                      รางวัล: {{ formatCurrency(animal.reward || 0) }}
                    </div>
                    <div>
                      <span v-if="animal.source === 'lost_pet'"
                        >วันที่หาย:</span
                      >
                      <span v-if="animal.source === 'find_owner'"
                        >วันที่พบ:</span
                      >
                      <span v-if="animal.source === 'adopt_pet'"
                        >วันที่ประกาศ:</span
                      >
                      {{ animal.date || "-" }} {{ animal.time || "-" }}
                    </div>
                    <div>สถานที่: {{ animal.location }}</div>
                    <div>
                      <NuxtLink :to="`/${animal.source}/detail/${animal.id}`">
                        <v-btn color="warning" class="mt-3">รายละเอียด</v-btn>
                      </NuxtLink>
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
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
import PetButtons from "../pets/PetButtons.vue";
import Noticelostpets from "~/components/section/Admin/pets/Noticelostpets.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    PetButtons,
    Noticelostpets,
  },
  data() {
    return {
      allPetsList: [],
      pageTitle: "ประกาศสัตว์เลี้ยงทั้งหมด",
      isDialogOpen: false,
      page: 1, // Tracks the current page
      itemsPerPage: 8, // Number of cards per page
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
        // Fetch lost pets
        const lostPetsResponse = await axios.get(
          "http://localhost:5000/api/lost_pet/getAll_lost_pets"
        );
        const lostPets = lostPetsResponse.data.data.map((pet) => ({
          ...pet,
          source: "lost_pet",
          date: pet.lost_date,
        }));

        // Fetch find owner
        const findOwnerResponse = await axios.get(
          "http://localhost:5000/api/find_owner/getAll_find_owner"
        );
        const findOwners = findOwnerResponse.data.data.map((pet) => ({
          ...pet,
          source: "find_owner",
          date: pet.find_date,
        }));

        // Fetch adopt pet
        const adoptPetResponse = await axios.get(
          "http://localhost:5000/api/adopt_pet/getAll_adopt_pet"
        );
        const adoptPets = adoptPetResponse.data.data.map((pet) => ({
          ...pet,
          source: "adopt_pet",
          date: pet.notice_date,
        }));

        // Merge all pets together
        this.allPetsList = [...lostPets, ...findOwners, ...adoptPets];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(value);
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
