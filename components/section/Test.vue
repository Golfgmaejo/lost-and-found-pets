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
        <!-- <v-col cols="12" sm="6">
          <v-date-input
            v-model="formattedDate"
            label="วันที่หาย"
            max-width="auto"
            :rules="Rules"
            :max="new Date().toISOString().substr(0, 10)"
          ></v-date-input>
        </v-col> -->
        <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
        
        <!-- <v-col cols="12" sm="6">
          <v-text-field
            v-model="time"
            :active="menu2"
            :focus="menu2"
            label="เวลาที่หาย"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            :rules="Rules"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="true"
              activator="parent"
              transition="scale-transition"
            >
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                format="24hr"
              ></v-time-picker>
            </v-menu>
          </v-text-field>
        </v-col> -->
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

<script>
// export default {
//   data() {
//     return {
//       time: null,
//       menu2: false,
//       model: null,
//     };
//   },
// };
export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }),
  }
</script>

<script setup>
import { ref } from "vue";
import axios from "axios";

const valid = ref(false);
const genders = ["ผู้", "เมีย", "ไม่ระบุ"];
const Rules = [(v) => !!v || "จำเป็นต้องกรอก"];
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
};
</script>
