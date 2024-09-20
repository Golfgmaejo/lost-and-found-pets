<template>
    <v-container>
      <v-main>
        <div class="text-center">
          <v-col class="d-flex justify-end">
            <v-btn color="red" @click="openDialog">ประกาศสัตว์หาย</v-btn>
          </v-col>
          <div>
            <PetButtons/>
          </div>
        </div>
  
        <v-container class="mt-16">
          <v-row>
            <v-col cols="12">
              <h1 class="text-5xl mb-8">{{ pageTitle }}</h1>
            </v-col>
          </v-row>
  
          <section>
            <h2 class="text-4xl mb-4">สัตว์เลี้ยงหาย</h2>
            <v-row>
              <v-col
                v-for="(animal, index) in lostpetsList"
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
                        <div>
                          อายุ: {{ animal.age_years }} ปี
                          {{ animal.age_month }} เดือน
                        </div>
                        <div>สายพันธุ์: {{ animal.breed }}</div>
                        <div>สี: {{ animal.color }}</div>
                        <div>รางวัล: {{ formatCurrency(animal.reward) }}</div>
                        <div>
                          หายเมื่อ: {{ animal.lost_date }} {{ animal.time }}
                        </div>
                        <div>สถานที่หาย: {{ animal.location }}</div>
                        <div>
                          <NuxtLink :to="`lost_pet/detail/${animal.id}`">
                            <v-btn color="warning" class="mt-3">รายละเอียด</v-btn>
                          </NuxtLink>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </section>
  
          <section>
            <h2 class="text-4xl mb-4">หาเจ้าของ</h2>
            <v-row>
              <v-col
                v-for="(animal, index) in findownerList"
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
                        <div>เพศ: {{ animal.gender }}</div>
                        <div>สายพันธุ์: {{ animal.breed }}</div>
                        <div>สี: {{ animal.color }}</div>
                        <div>
                          วันที่พบ: {{ animal.find_date }} {{ animal.time }}
                        </div>
                        <div>สถานที่พบ: {{ animal.location }}</div>
                        <div>
                          <NuxtLink :to="`find_owner/detail/${animal.id}`">
                            <v-btn color="warning" class="mt-3">รายละเอียด</v-btn>
                          </NuxtLink>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </section>
  
          <section>
            <h2 class="text-4xl mb-4">หาบ้าน</h2>
            <v-row>
              <v-col
                v-for="(animal, index) in adoptpetList"
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
                        <div>เพศ: {{ animal.gender }}</div>
                        <div>สายพันธุ์: {{ animal.breed }}</div>
                        <div>สี: {{ animal.color }}</div>
                        <div>
                          วันที่ประกาศ: {{ animal.notice_date }} {{ animal.time }}
                        </div>
                        <div>สถานที่พบ: {{ animal.location }}</div>
                        <div>
                          <NuxtLink :to="`adopt_pet/detail/${animal.id}`">
                            <v-btn color="warning" class="mt-3">รายละเอียด</v-btn>
                          </NuxtLink>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </section>
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
  import PetButtons from "./PetButtons.vue";
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
        lostpetsList: [],
        findownerList: [],
        adoptpetList: [],
        pageTitle: "ประกาศสัตว์เลี้ยงทั้งหมด",
        isDialogOpen: false,
      };
    },
    mounted() {
      this.fetchLostpets();
      this.fetchFindowner();
      this.fetchAdoptpet();
    },
    methods: {
      async fetchLostpets() {
        const url = "http://localhost:5000/api/lost_pet/getAll_lost_pets";
        try {
          const response = await axios.get(url);
          this.lostpetsList = response.data.data.map((pet) => ({
            ...pet,
            source: "lost_pet",
          }));
        } catch (error) {
          console.error("Error fetching lost pets:", error);
        }
      },
      async fetchFindowner() {
        const url = "http://localhost:5000/api/find_owner/getAll_find_owner";
        try {
          const response = await axios.get(url);
          this.findownerList = response.data.data.map((pet) => ({
            ...pet,
            source: "find_owner",
          }));
        } catch (error) {
          console.error("Error fetching find owner:", error);
        }
      },
      async fetchAdoptpet() {
        const url = "http://localhost:5000/api/adopt_pet/getAll_adopt_pet";
        try {
          const response = await axios.get(url);
          this.adoptpetList = response.data.data.map((pet) => ({
            ...pet,
            source: "adopt_pet",
          }));
        } catch (error) {
          console.error("Error fetching adoptpet:", error);
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
  
  <style scoped>
  .text-5xl {
    font-size: 3rem;
  }
  .text-4xl {
    font-size: 2.5rem;
  }
  .mt-16 {
    margin-top: 4rem;
  }
  .mb-8 {
    margin-bottom: 2rem;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  </style>
  