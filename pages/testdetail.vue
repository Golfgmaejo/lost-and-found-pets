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
            md="9"
          >
            <v-card>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="animal.image_url" class="adopt-image" />
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-title>{{ animal.name }}</v-card-title>
                  <v-card-subtitle>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>เพศ:</strong>
                          {{ animal.gender }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>อายุ:</strong> {{ animal.age_years }} ปี
                          {{ animal.age_month }} เดือน</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>สายพันธุ์:</strong>
                          {{ animal.breed }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>สี:</strong>
                          {{ animal.color }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>รางวัล:</strong>
                          {{ formatCurrency(animal.reward) }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>วันที่หาย:</strong> {{ animal.lost_date }}
                          {{ animal.time }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-chip>ประกาศเมื่อ: {{ animal.created_at }}</v-chip>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="mt-3">
              <v-card-text>
                <v-list-item-title
                  ><strong>รายละเอียดของสัตว์เลี้ยง</strong>
                </v-list-item-title>
                {{ animal.detail }}
              </v-card-text>
            </v-card>

            <v-card class="mt-3">
              <v-list-item>
                <v-list-item-title
                  ><strong>สถานที่หาย</strong>
                </v-list-item-title>
                {{ animal.location }}
              </v-list-item>
              <v-card-text>
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
              </v-card-text>
            </v-card>

            <v-card class="mt-3">
              <v-list-item-title
                ><strong>รูปภาพของสัตว์เลี้ยง</strong>
              </v-list-item-title>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="animal.image_url" height="256" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="sidebar">
              <v-card-title>ผู้ลงประกาศ</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="(step, index) in sidebar.steps"
                    :key="index"
                  >
                    <v-list-item-title>
                      <i :class="step.icon"></i> {{ step.text }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <NuxtLink to="/register">
                  <v-btn color="primary" class="mt-3"
                    >สมัครสมาชิก</v-btn
                  ></NuxtLink
                >
              </v-card-text>
              <v-card-title>สมัครสมาชิกแล้วดียังไง</v-card-title>
              <v-card-text>{{ sidebar.benefits }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      pageTitle: "สัตว์เลี้ยงหาย",
      zoom: 16,
      lostpetsList: [],
      sidebar: {
        steps: [
          { icon: "fa-solid fa-1 mr-2", text: "เพิ่มเพื่อน" },
          { icon: "fa-solid fa-2 mr-2", text: "ลงทะเบียน" },
          { icon: "fa-solid fa-3 mr-2", text: "แจ้งหาย" },
          { icon: "fa-solid fa-4 mr-2", text: "รอรับแจ้งเตือน" },
        ],
        benefits:
          "แจ้งหายง่าย รวดเร็ว ถึงไม่หายก็ลงได้ กรณีมีสัตว์เลี้ยงหายใกล้ท่าน ระบบจะมีแจ้งเตือนไปยังท่าน เพื่อให้ช่วยกันสอดส่องตามหา",
      },
    };
  },
  methods: {
    fetchLostpets() {
      const url = "http://localhost:5000/api/lost_pet/getAll_lost_pets";
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.lostpetsList = response.data.data.map((animal) => ({
            ...animal,
            lat: parseFloat(animal.lat),
            lng: parseFloat(animal.lng),
          }));
        })
        .catch((error) => {
          console.error("Error fetching lost pets:", error);
        });
    },
    formatCurrency(value) {
      const formattedValue = new Intl.NumberFormat("th-TH", {
        currency: "THB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      return `${formattedValue} บาท`;
    },
  },
  mounted() {
    this.fetchLostpets();
  },
};
</script>

<style scoped>
.adopt-image {
  min-height: 250px;
  height: 310px;
}
.sidebar {
  background-color: #f5f5f5;
  height: 100%;
}
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
