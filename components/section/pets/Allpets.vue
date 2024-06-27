<script setup>
import PetButtons from "./PetButtons.vue";
import Noticelostpets from "@/components/section/pets/Noticelostpets.vue";
</script>
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
            v-for="(animal, index) in lostpetsList"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <v-card>
              <v-img :src="animal.image_url" height="200px"></v-img>
              <v-card-title>{{ animal.name }}</v-card-title>

              <v-card-subtitle>
                เพศ: {{ animal.gender }} | อายุ: {{ animal.age }}
              </v-card-subtitle>
              <v-card-subtitle>สายพันธุ์: {{ animal.breed }}</v-card-subtitle>
              <v-card-subtitle>สี: {{ animal.color }}</v-card-subtitle>
              <v-card-text>
                <div>รางวัล: {{ formatCurrency(animal.reward) }}</div>
                <div>วันที่หาย: {{ animal.lost_date }}</div>
                <div>สถานที่หาย: {{ animal.location }}</div>
              </v-card-text>
              <v-card-actions>
                <NuxtLink :to="`/pets/${animal.id}`">
                  <v-btn text color="primary">รายละเอียด</v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            v-for="(animal, index) in findownerList"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <v-card>
              <v-img :src="animal.image_url" height="200px"></v-img>
              <v-card-subtitle> เพศ: {{ animal.gender }} </v-card-subtitle>
              <v-card-subtitle>สายพันธุ์: {{ animal.breed }}</v-card-subtitle>
              <v-card-subtitle>สี: {{ animal.color }}</v-card-subtitle>
              <v-card-text>
                <div>รายละเอียด: {{ animal.detail }}</div>
                <div>วันที่พบ: {{ animal.find_date }}</div>
                <div>สถานที่พบ: {{ animal.location }}</div>
              </v-card-text>
              <v-card-actions>
                <NuxtLink :to="`/pets/${animal.id}`">
                  <v-btn text color="primary">รายละเอียด</v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            v-for="(animal, index) in adoptpetList"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <v-card>
              <v-img :src="animal.image_url" height="200px"></v-img>
              <v-card-subtitle> เพศ: {{ animal.gender }} </v-card-subtitle>
              <v-card-subtitle>สายพันธุ์: {{ animal.breed }}</v-card-subtitle>
              <v-card-subtitle>สี: {{ animal.color }}</v-card-subtitle>
              <v-card-text>
                <div>รายละเอียด: {{ animal.detail }}</div>
                <div>วันที่ประกาศ: {{ animal.notice_date }}</div>
                <div>สถานที่พบ: {{ animal.location }}</div>
              </v-card-text>
              <v-card-actions>
                <NuxtLink :to="`/pets/${animal.id}`">
                  <v-btn text color="primary">รายละเอียด</v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="isDialogOpen" max-width="600px" persistent>
        <v-card>
          <v-card-title class="headline">ประกาศสัตว์หาย</v-card-title>
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
import axios from "axios";
import Noticelostpets from "@/components/section/pets/Noticelostpets.vue";
export default {
  components: {
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
  created() {
    this.fetchLostpets();
    this.fetchFindowner();
    this.fetchAdoptpet();
  },
  methods: {
    fetchLostpets() {
      const url = "http://localhost:5000/api/lost_pet/getAll_lost_pets";
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.lostpetsList = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching lost pets:", error);
        });
    },
    fetchFindowner() {
      const url = "http://localhost:5000/api/find_owner/getAll_find_owner";
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.findownerList = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching find owner:", error);
        });
    },
    fetchAdoptpet() {
      const url = "http://localhost:5000/api/adopt_pet/getAll_adopt_pet";
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.adoptpetList = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching adoptpet:", error);
        });
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
.mt-16 {
  margin-top: 4rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
</style>
