<template>
  <v-container style="margin-top: 95px">
    <v-row>
      <v-col style="display: flex">
        <v-img
          :width="1050"
          aspect-ratio="16/9"
          cover
          src="/images/pets/หาบ้าน.png"
          class="rounded-img"
          style="border: 10px solid rgba(233, 121, 49, 0.1)"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div style="display: flex; align-items: center">
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
          <span
            class="text-title-lost"
            style="padding: 0 10px; font-weight: bold"
            >ประกาศหาบ้าน</span
          >
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-6 mb-6">
      <v-col>
        <div class="text-center">
          <div>
            <PetButtons />
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="auto" lg="6" style="display: flex; align-items: center">
        <h1 class="text-title-lost">ประกาศหาบ้าน</h1>
      </v-col>
      <v-col cols="auto" lg="6" class="d-flex justify-end">
        <v-btn
          class="btn-notice"
          v-if="!isLoggedIn"
          color="#FF1744"
          @click="() => $router.push('/register')"
        >
          ประกาศหาบ้าน
        </v-btn>
        <v-btn v-else color="#FF1744" @click="openDialog" class="btn-notice">
          ประกาศหาบ้าน
        </v-btn>
      </v-col>
      <v-divider
        class="border-opacity-100"
        :thickness="3"
        color="#ef9b65"
      ></v-divider>
    </v-row>

    <v-row>
      <v-col
        v-for="(animal, index) in paginatedAdoptpet"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card class="card-pet-all" elevation="2">
          <v-row>
            <v-col>
              <div width="80px" class="card-img">
                <v-img :src="animal.image_url" height="310" contain></v-img>
              </div>
            </v-col>
            <v-col style="margin: 12px; margin-left: -12px">
              <div class="text-1">ประกาศหาบ้าน</div>
              <v-divider
                class="border-opacity-100"
                :thickness="1"
                color="#d69d6b"
                style="margin-bottom: 8px"
              ></v-divider>
              <div class="text-2">
                เพศ:&nbsp;<span class="span-1">{{ animal.gender }}</span>
              </div>
              <div class="text-2">
                สายพันธุ์:&nbsp;<span class="span-1">{{ animal.breed }}</span>
              </div>
              <div class="text-2">
                สี:&nbsp;<span class="span-1">{{ animal.color }}</span>
              </div>
              <div class="text-2">
                วันที่ประกาศ:&nbsp;<span class="span-1"
                  >{{ animal.adopt_date }}, {{ animal.adopt_time }}</span
                >
              </div>
              <div class="text-2">
                ที่อยู่:&nbsp;<span class="span-1">{{
                  animal.adopt_place
                }}</span>
              </div>
              <v-divider
                class="border-opacity-100"
                :thickness="1"
                color="#d69d6b"
                style="margin-bottom: 8px"
              ></v-divider>
              <div>
                <div v-if="animal.status === 'กำลังหาบ้าน'">
                  <v-btn
                    :to="{
                      name: 'adopt_pet-detail-id',
                      params: { id: animal.id },
                    }"
                    color="#f4bb64"
                    class="btn-1"
                    >รายละเอียด
                  </v-btn>
                </div>
                <div v-else>
                  <div>
                    <v-btn class="ribbon"> ได้บ้านแล้ว </v-btn>
                  </div>
                  <div style="display: flex; justify-content: center">
                    <v-btn
                      width="248px"
                      color="#FAFAFA"
                      class="btn-disabled"
                      :disabled="!isDialogOpen"
                      >รายละเอียด
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-4">
      <v-pagination
            v-model="page"
            :length="pageCount"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            active-color="#e97931"
            rounded="circle"
            @input="updatePage"
          ></v-pagination>
    </div>

    <v-dialog v-model="isDialogOpen" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <Noticeadoptpet @addadoptpet="closeDialog" />
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

const parseTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp === "object" && "seconds" in timestamp) {
    return new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
    );
  }
  console.error("Invalid timestamp:", timestamp);
  return new Date(0);
};

const fetchAdoptpet = async () => {
  const url = `http://localhost:5000/api/adopt_pet/getAll_adopt_pet`;
  try {
    const response = await axios.get(url);
    adoptpetList.value = response.data.data.sort((a, b) => {
      const dateA = parseTimestamp(a.created_at);
      const dateB = parseTimestamp(b.created_at);
      return dateB - dateA;
    });
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
  top: 45%;
  left: 65%;
  transform: translate(-100%, -50%) rotate(-45deg);
  background-color: #ffdc8b;
  color: #582e2c;
  padding: 5px 200px;
  font-size: 28px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1;
  border-radius: 20px;
  font-family: "Prompt", sans-serif;
}
.text-title-lost {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
}
.btn-notice {
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  color: #fff9ee !important;
  font-weight: 500;
}
.rounded-img {
  border-radius: 20px; /* ปรับค่าตามที่ต้องการ */
}
.card-pet-all {
  background-color: #fffdfc;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
}
.card-img[data-v-8774a975] {
  border: 2px solid rgb(233, 120, 49);
  width: 255px;
  height: 285px;
  margin: 12px;
  border-radius: 12px;
}
.text-1 {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  color: #582e2c;
}
.text-2 {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #582e2c;
  margin-bottom: 8px;
}
.span-1 {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
}
.btn-1 {
  display: flex;
  justify-content: center;
  color: #582e2c !important;
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px !important;
}
.btn-disabled {
  display: flex !important;
  justify-content: center !important;
  color: #adadad !important;
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-top: 8px;
}
</style>
