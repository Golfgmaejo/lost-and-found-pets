<template>
  <v-container>
    <h1 class="text-portfolio-title mt-10">ประกาศสัตว์เลี้ยงหาย</h1>
    <h5 class="mt-2">
      กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้ผู้ที่พบสัตว์เลี้ยงของคุณสามารถติดต่อกลับได้
    </h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="*ชื่อ"
            variant="outlined"
            :rules="[rules.required, rules.noNumbers]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="เพศ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="form.age_years"
            label="*อายุ (ปี)"
            variant="outlined"
            :rules="[rules.required, rules.onlyNumbers]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="form.age_month"
            label="*อายุ (เดือน)"
            variant="outlined"
            :rules="[rules.required, rules.onlyNumbers]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.breed"
            label="*สายพันธุ์"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.color"
            label="*สี"
            variant="outlined"
            :rules="[rules.required, rules.noNumbers]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.reward"
            label="*รางวัล(บาท)"
            variant="outlined"
            :rules="[rules.required, rules.onlyNumbers]"
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
                :value="formattedLostDate"
                label="*วันที่หาย"
                prepend-icon="mdi-calendar"
                v-bind="props"
                v-on="on"
                readonly
                variant="outlined"
                persistent-placeholder
              ></v-text-field>
            </template>
            <v-date-picker
              color="primary"
              v-model="form.lostDate"
              @input="logSelectedDate"
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
            <template v-slot:activator="{ on, props }">
              <v-text-field
                v-model="form.lostTime"
                label="*เวลาที่หาย"
                prepend-icon="mdi-clock"
                readonly
                v-bind="props"
                v-on="on"
                @click="menuTime = true"
                variant="outlined"
                persistent-placeholder
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
            label="*สถานที่หาย"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-alert type="info"> สามารถย้ายหมุดได้ </v-alert>
        <LMap
          style="height: 350px"
          width="100%"
          :zoom="zoom"
          :center="center"
          :use-global-leaflet="false"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker
            :lat-lng="[markerLatLng.lat, markerLatLng.lng]"
            draggable
            @moveend="onMarkerMoveEnd"
          />
        </LMap>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="markerLatLng.lat"
            label="ละติจูด"
            variant="outlined"
            readonly
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="markerLatLng.lng"
            label="ลองจิจูด"
            variant="outlined"
            readonly
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.details"
            label="รายละเอียดของสัตว์เลี้ยง"
            variant="outlined"
            :rules="[rules.required]"
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
            :rules="[rules.required]"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.status"
            :items="statuses"
            label="*สถานะ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn color="primary" @click="submit">ประกาศ</v-btn>
          <v-btn color="secondary" class="ml-4" @click="confirmClearForm">ล้างข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menuDate: false,
      menuTime: false,
      valid: false,
      form: {
        name: "",
        gender: "",
        age_years: "",
        age_month: "",
        breed: "",
        color: "",
        reward: "",
        lostDate: null,
        lostTime: null,
        lostPlace: "",
        details: "",
        image: null,
        status: "",
      },
      markerLatLng: {
        lat: "",
        lng: "",
      },
      zoom: 16,
      center: [18.895811354244756, 99.0130001306534],
      genders: ["ผู้", "เมีย", "ไม่ระบุ"],
      statuses: ["หาย", "เจอแล้ว"],
      rules: {
        required: (value) => {
          return value && value.trim() ? true : "จำเป็นต้องกรอก";
        },
        noNumbers: (value) => /^[^\d]+$/.test(value) || "ไม่สามารถมีตัวเลขได้",
        onlyNumbers: (value) =>
          /^[0-9]+$/.test(value) || "ต้องเป็นตัวเลขเท่านั้น",
      },
    };
  },
  methods: {
    async submit() {
      // console.log("Form data before validation:", JSON.stringify(this.form, null, 2));
      if (this.$refs.form.validate()) {
        const isFormIncomplete = Object.values(this.form).some(
          (value) => value === "" || value === null
        );
        if (isFormIncomplete) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }
        let imageUrl = "default";
        if (this.form.image) {
          try {
            const imageData = new FormData();
            imageData.append("file", this.form.image);
            imageData.append("user_id", "e969bea8-5469-499a-baf8-6c896c556e50"); // replace with actual user_id
            const response = await axios.post(
              "http://localhost:5000/api/image/upload_images_pets",
              imageData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            imageUrl = response.data.data.url;
          } catch (error) {
            console.error("Image upload failed:", error);
            alert("มีข้อผิดพลาดในการอัปโหลดรูปภาพ");
            return;
          }
        }
        const data = {
          user_id: "e969bea8-5469-499a-baf8-6c896c556e50",
          name: this.form.name,
          lost_date: this.formattedLostDate,
          lost_time: this.form.lostTime,
          lost_place: this.form.lostPlace,
          detail: this.form.details,
          reward: this.form.reward,
          lat: this.markerLatLng.lat.toString(),
          lng: this.markerLatLng.lng.toString(),
          breed: this.form.breed,
          image_url: imageUrl,
          age_years: this.form.age_years,
          age_month: this.form.age_month,
          gender: this.form.gender,
          color: this.form.color,
          status: this.form.status,
        };
        console.log("Form data:", data);

        try {
          const response = await axios.post(
            "http://localhost:5000/api/lost_pet/add_lost_pets",
            data
          );
          alert("ประกาศสัตว์เลี้ยงหายแล้ว");
          this.$emit("addlostpet");
          this.clearForm();
        } catch (error) {
          alert("มีข้อผิดพลาดในการบันทึกข้อมูล");
        }
      }
    },
    confirmClearForm() {
      if (confirm("คุณแน่ใจหรือว่าต้องการล้างข้อมูลทั้งหมด?")) {
        this.clearForm();
      }
    },
    clearForm() {
      this.form = {
        name: "",
        gender: "",
        age_years: "",
        age_month: "",
        breed: "",
        color: "",
        reward: "",
        lostDate: null,
        lostTime: null,
        lostPlace: "",
        details: "",
        image: null,
        status: "",
      };
      this.markerLatLng = {
        lat: "18.895811354244756",
        lng: "99.0130001306534",
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          this.markerLatLng = { lat: latitude, lng: longitude };
          this.center = [latitude, longitude];
          localStorage.setItem(
            "markerCoords",
            JSON.stringify({ lat: latitude, lng: longitude })
          );
        });
      } else {
        alert("ไม่สามารถดึงข้อมูลตำแหน่งได้");
      }
      this.$refs.form.resetValidation();
    },
    logSelectedDate(selectedDate) {
      if (selectedDate) {
        this.form.lostDate = selectedDate;
        this.menuDate = false;
      }
    },
    onMarkerMoveEnd(event) {
      const { lat, lng } = event.target.getLatLng();
      this.markerLatLng = { lat, lng };
      if (process.client) {
        localStorage.setItem("markerCoords", JSON.stringify({ lat, lng }));
      }
    },
  },
  computed: {
    formattedLostDate() {
      if (this.form.lostDate) {
        const date = new Date(this.form.lostDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear() + 543;
        return `${day}/${month}/${year}`;
      }
      return "";
    },
  },
  created() {
    if (process.client) {
      const storedCoords = localStorage.getItem("markerCoords");
      if (storedCoords) {
        const { lat, lng } = JSON.parse(storedCoords);
        this.center = [lat, lng];
        this.markerLatLng = { lat, lng };
      }
    }
  },
  mounted() {
    if (process.client && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.center = [latitude, longitude];
        this.markerLatLng = { lat: latitude, lng: longitude };
        localStorage.setItem(
          "markerCoords",
          JSON.stringify({ lat: latitude, lng: longitude })
        );
      });
    }
  },
};
</script>

<style scoped></style>
