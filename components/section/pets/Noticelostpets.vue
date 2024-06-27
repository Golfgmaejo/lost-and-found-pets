<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="ชื่อ"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="เพศ"
            :rules="Rules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.age"
            label="อายุ"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.breed"
            label="สายพันธุ์"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.color"
            label="สี"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.reward"
            label="รางวัล"
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
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.latitude"
            label="ละติจูด"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.longitude"
            label="ลองจิจูด"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.details"
            label="รายละเอียดเพิ่มเติม"
            :rules="Rules"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="form.image"
            label="อัปโหลดรูปภาพ"
            accept="image/*"
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
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

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

//format form.lostDate
const formattedLostDate = computed(() => {
  if (form.value.lostDate) {
    const date = new Date(form.value.lostDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return '';
});

const submitForm = () => {
  if (valid.value) {
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
    latitude: "",
    longitude: "",
    details: "",
    image: null,
  };
  valid.value = false;
};
</script>
