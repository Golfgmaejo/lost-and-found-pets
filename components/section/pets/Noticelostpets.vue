<template>
  <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.name"
              label="ชื่อ"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.gender"
              :items="genders"
              label="เพศ"
              variant="outlined"
              :rules="Rules"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.age"
              label="อายุ"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.breed"
              label="สายพันธุ์"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.color"
              label="สี"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.reward"
              label="รางวัล"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, props }">
                <v-text-field
                  v-model="form.lostDate"
                  label="วันที่หาย"
                  prepend-icon="mdi-calendar"
                  v-bind="props"
                  v-on="on"
                  variant="outlined"
                  :rules="Rules"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary"
                v-model="form.lostDate"
                @click="logSelectedDate(form.lostDate)"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6">
            <v-menu
              v-model="menuTime"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.lostTime"
                  label="เวลาที่หาย"
                  prepend-icon="mdi-clock"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="Rules"
                  @click="menuTime = true"
                  variant="outlined"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="form.lostTime"
                @input="menuTime = false"
                scrollable
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.lostPlace"
              label="สถานที่หาย"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-alert type="info"> สามารถย้ายหมุดได้ </v-alert>
          <LMap
            :zoom="zoom"
            :center="center"
            style="height: 350px; width: 100%"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LMarker
              :lat-lng="[markerLatLng.lat, markerLatLng.lng]"
              draggable
              @moveend="onMarkerMoveEnd"
            >
            </LMarker>
          </LMap>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="markerLatLng.lat"
              label="ละติจูด"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="markerLatLng.lng"
              label="ลองจิจูด"
              variant="outlined"
              :rules="Rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="form.details"
              label="รายละเอียดเพิ่มเติม"
              variant="outlined"
              :rules="Rules"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="form.image"
              prepend-icon="mdi-camera"
              label="อัปโหลดรูปภาพ"
              accept="image/*"
              show-size
              variant="outlined"
              :rules="Rules"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" type="submit">ประกาศ</v-btn>
            <v-btn color="secondary" @click="clearForm">ล้างข้อมูล</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import axios from "axios";

const zoom = ref(16);
const center = ref([15.87, 100.9925]);
const markerLatLng = ref({ lat: 15.87, lng: 100.9925 });

const onMarkerMoveEnd = (event) => {
  const { lat, lng } = event.target.getLatLng();
  markerLatLng.value = { lat, lng };
  localStorage.setItem("markerCoords", JSON.stringify({ lat, lng }));
};

onBeforeMount(() => {
  const storedCoords = localStorage.getItem("markerCoords");
  if (storedCoords) {
    const { lat, lng } = JSON.parse(storedCoords);
    center.value = [lat, lng];
    markerLatLng.value = { lat, lng };
  }
});

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      center.value = [latitude, longitude];
      markerLatLng.value = { lat: latitude, lng: longitude };
      localStorage.setItem(
        "markerCoords",
        JSON.stringify({ lat: latitude, lng: longitude })
      );
    });
  }
});

const valid = ref(false);
const genders = ["ผู้", "เมีย", "ไม่ระบุ"];
let checkdate = null;
const form = ref({
  name: "",
  gender: "",
  age: "",
  breed: "",
  color: "",
  reward: "",
  lostDate: null,
  lostTime: null,
  lostPlace: "",
  latitude: "",
  longitude: "",
  details: "",
  image: null,
});
const Rules = [(v) => !!v || "จำเป็นต้องกรอก"];
const menuDate = ref(false);
const menuTime = ref(false);
const logSelectedDate = (selectedDate) => {
  console.log("Selected Date:", selectedDate);
  if (selectedDate && selectedDate !== checkdate) {
    checkdate = selectedDate;
    menuDate.value = false;
  }
};

const formattedLostDate = computed(() => {
  if (form.value.lostDate) {
    const date = new Date(form.value.lostDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
});

const submitForm = () => {
  if (valid.value) {
    form.value.latitude = markerLatLng.value.lat;
    form.value.longitude = markerLatLng.value.lng;

    const formData = new FormData();
    for (let key in form.value) {
      formData.append(key, form.value[key]);
    }
    axios
      .post("http://localhost:5000/api/lost_pet/create", formData)
      .then((response) => {
        console.log("Form submitted:", response.data);
        clearForm();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  }
};

const clearForm = () => {
  form.value = {
    name: "",
    gender: "",
    age: "",
    breed: "",
    color: "",
    reward: "",
    lostDate: null,
    lostTime: null,
    lostPlace: "",
    latitude: markerLatLng.value.lat,
    longitude: markerLatLng.value.lng,
    details: "",
    image: null,
  };
  valid.value = false;
};
</script>
