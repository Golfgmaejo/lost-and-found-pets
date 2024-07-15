<script setup>
import PetButtons from "./PetButtons.vue";
import Noticefindowner from "@/components/section/pets/Noticefindowner.vue";
</script>
<template>
  <v-container>
    <v-main>
      <div class="text-center">
        <v-col class="d-flex justify-end">
          <v-btn color="red" @click="openDialog">ประกาศหาเจ้าของ</v-btn>
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
        </v-row>
      </v-container>
      <v-dialog v-model="isDialogOpen" max-width="1200px" persistent>
        <v-card>
          <v-card-title class="headline">ประกาศหาเจ้าของ</v-card-title>
          <v-card-text>
            <Noticefindowner />
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
import Noticefindowner from "@/components/section/pets/Noticefindowner.vue";
export default {
  components: {
    Noticefindowner,
  },
  data() {
    return {
      findownerList: [],
      pageTitle: "ประกาศหาเจ้าของ",
      isDialogOpen: false,
    };
  },
  created() {
    this.fetchFindowner();
  },
  methods: {
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
