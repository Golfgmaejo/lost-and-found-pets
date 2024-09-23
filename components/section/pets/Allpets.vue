<template>
  <v-container>
    <div class="text-center mb-4">
      <v-col class="d-flex justify-end">
        <v-btn
          v-if="!isLoggedIn"
          color="red"
          @click="() => $router.push('/register')"
          class="mb-4"
        >
          ประกาศสัตว์เลี้ยงหาย
        </v-btn>
        <v-btn v-else color="red" @click="openDialog" class="mb-4">
          ประกาศสัตว์เลี้ยงหาย
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
                <v-img :src="animal.image_url" height="310"></v-img>
              </v-col>
              <v-col cols="12" md="7">
                <v-card-text>
                  <div class="text-h5 font-weight-semibold mb-2">
                    {{ animal.name }}
                  </div>
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
                    <div class="mb-1">
                      สถานที่หาย: {{ animal.lost_place || "-" }}
                    </div>
                  </template>

                  <template v-if="animal.source === 'find_owner'">
                    <div class="mb-1">
                      วันที่ประกาศ: {{ animal.findowner_date || "-" }}
                      {{ animal.findowner_time || "-" }}
                    </div>
                    <div class="mb-1">
                      สถานที่พบ: {{ animal.findowner_place || "-" }}
                    </div>
                  </template>

                  <template v-if="animal.source === 'adopt_pet'">
                    <div class="mb-1">
                      วันที่ประกาศ: {{ animal.adopt_date || "-" }}
                      {{ animal.adopt_time || "-" }}
                    </div>
                    <div class="mb-1">
                      สถานที่พบ: {{ animal.adopt_place || "-" }}
                    </div>
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
          <Noticelostpets @addlostpet="closeDialog" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import axios from "axios";
import PetButtons from "../pets/PetButtons.vue";
import Noticelostpets from "../Admin/pets/Noticelostpets.vue";

const pageTitle = ref("ประกาศสัตว์เลี้ยงทั้งหมด");
const allPetsList = ref([]);
const page = ref(1);
const itemsPerPage = ref(8);
const isDialogOpen = ref(false);

const authStore = useAuthStore();
const isLoggedIn = ref(authStore.isLoggedIn());
const user = ref(authStore.user);
const isAdmin = ref(authStore.isAdmin);
watchEffect(() => {
  isLoggedIn.value = authStore.isLoggedIn();
  user.value = authStore.user;
  isAdmin.value = authStore.isAdmin;
});

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  fetchAllpets();
};

const paginatedPets = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allPetsList.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(allPetsList.value.length / itemsPerPage.value)
);

const formatCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("th-TH", {
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `${formattedValue} บาท`;
};

const fetchAllpets = async () => {
  try {
    const lostPetsResponse = await axios.get(
      "http://localhost:5000/api/lost_pet/getAll_lost_pets"
    );
    const lostPets = lostPetsResponse.data.data.map((pet) => ({
      ...pet,
      source: "lost_pet",
    }));

    const findOwnerResponse = await axios.get(
      "http://localhost:5000/api/find_owner/getAll_find_owner"
    );
    const findOwners = findOwnerResponse.data.data.map((pet) => ({
      ...pet,
      source: "find_owner",
    }));

    const adoptPetResponse = await axios.get(
      "http://localhost:5000/api/adopt_pet/getAll_adopt_pet"
    );
    const adoptPets = adoptPetResponse.data.data.map((pet) => ({
      ...pet,
      source: "adopt_pet",
    }));

    allPetsList.value = [...lostPets, ...findOwners, ...adoptPets];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchAllpets);
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
  padding: 10px 50px;
  font-size: 32px;
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
  border-radius: 30px;
}
</style>
