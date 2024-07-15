<template>
  <v-container fluid>
    <v-main>
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
            class="mb-8"
          >
            <v-card>
              <v-img :src="animal.image_url" height="500px" class="full-width-image"></v-img>
              <v-card-title>{{ animal.name }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <p><strong>เพศ:</strong> {{ animal.gender }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <p><strong>อายุ:</strong> {{ animal.age }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <p><strong>สายพันธุ์:</strong> {{ animal.breed }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <p><strong>สี:</strong> {{ animal.color }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <p><strong>รางวัล:</strong> {{ formatCurrency(animal.reward) }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <p><strong>วันที่หาย:</strong> {{ animal.lost_date }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p><strong>สถานที่หาย:</strong> {{ animal.location }}</p>
                  </v-col>
                  <v-col cols="12">
                    <LMap
                      :zoom="zoom"
                      :center="[animal.lat, animal.lng]"
                      style="height: 350px; width: 100%"
                    >
                      <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LMarker
                        :lat-lng="[animal.lat, animal.lng]"
                        :draggable="false"
                      ></LMarker>
                    </LMap>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const pageTitle = "สัตว์เลี้ยงหาย";
const zoom = ref(16);
const lostpetsList = ref([]);

const fetchLostpets = () => {
  const url = "http://localhost:5000/api/lost_pet/getAll_lost_pets";
  axios.get(url)
    .then((response) => {
      console.log(response.data.data);
      lostpetsList.value = response.data.data.map((animal) => ({
        ...animal,
        lat: parseFloat(animal.lat),
        lng: parseFloat(animal.lng),
      }));
    })
    .catch((error) => {
      console.error("Error fetching lost pets:", error);
    });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(value);
};

fetchLostpets();
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
.full-width-image {
  width: 100%;
  object-fit: cover;
}
.v-card {
  padding: 1rem;
}
</style>
