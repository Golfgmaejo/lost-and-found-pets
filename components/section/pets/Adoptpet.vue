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
          ประกาศหาบ้าน
          </v-btn>
          <v-btn v-else color="red" @click="openDialog" class="mb-4">
            ประกาศหาบ้าน
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
          v-for="(animal, index) in paginatedAdoptpet"
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
                    วันที่ประกาศ: {{ animal.adopt_date }}
                    {{ animal.adopt_time }}
                  </div>
                  <div class="mb-4">สถานที่พบ: {{ animal.adopt_place }}</div>
                  <div>
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
                      <v-btn class="ribbon mt-3" :disabled="true">
                        ได้บ้านแล้ว
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
          <Noticeadoptpet @addadoptpet="closeDialog"/>
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
import { ref, computed, onMounted, watchEffect } from "vue";
import { useAuthStore } from "~/stores/auth";
import axios from "axios";
import PetButtons from "./PetButtons.vue";
import Noticeadoptpet from "../Admin/pets/Noticeadoptpet.vue";

const pageTitle = ref("ประกาศหาบ้าน");
const adoptpetList = ref([]);
const isDialogOpen = ref(false);
const itemsPerPage = ref(8);
const page = ref(1);

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
  fetchAdoptpet();
};

const updatePage = (newPage) => {
  page.value = newPage;
};

const pageCount = computed(() => {
  return Math.ceil(adoptpetList.value.length / itemsPerPage.value);
});

const paginatedAdoptpet = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return adoptpetList.value.slice(start, end);
});

const fetchAdoptpet = async () => {
  const url = `http://localhost:5000/api/adopt_pet/getAll_adopt_pet`;
  try {
    const response = await axios.get(url);
    adoptpetList.value = response.data.data;
  } catch (error) {
    console.error("Error fetching adopt pets:", error);
  }
};

onMounted(() => {
  fetchAdoptpet();
});
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
  padding: 10px 50px;
  font-size: 32px;
  font-weight: bold;
  white-space: nowrap;
  z-index: 1;
  border-radius: 30px;
}
</style>
