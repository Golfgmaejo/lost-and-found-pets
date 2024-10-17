<template>
  <v-container>
    <h1 class="text-portfolio-title">ประกาศหาบ้าน</h1>
    <h5 class="text-portfolio">
      กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้ผู้ที่สนใจสัตว์เลี้ยงจะสามารถติดต่อกลับได้
    </h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="text-form my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            เพศ&nbsp;<span class="text-red">*</span>
          </div>
          <v-select
            v-model="form.gender"
            :items="genders"
            placeholder="เพศ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ประเภทสัตว์&nbsp;<span class="text-red">*</span>
          </div>
          <v-select
            v-model="form.types"
            :items="types"
            placeholder="ประเภทสัตว์"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            สายพันธุ์&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.breed"
            placeholder="สายพันธุ์"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            สี&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.color"
            placeholder="สี"
            variant="outlined"
            :rules="[rules.required, rules.noNumbers]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            วันที่ประกาศ&nbsp;<span class="text-red">*</span>
          </div>
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
                :value="formattedAdoptDate"
                placeholder="วันที่ประกาศ"
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
              v-model="form.adoptDate"
              @input="logSelectedDate"
              :max="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            เวลาประกาศ&nbsp;<span class="text-red">*</span>
          </div>
          <v-menu
            v-model="menuTime"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, props }">
              <v-text-field
                v-model="form.adoptTime"
                placeholder="เวลาประกาศ"
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
              v-model="form.adoptTime"
              @input="menuTime = false"
              scrollable
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            ที่อยู่&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.adoptPlace"
            placeholder="ที่อยู่"
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
          <div class="text-subtitle-1 mb-2">
            ละติจูด
          </div>
          <v-text-field
            v-model="markerLatLng.lat"
            placeholder="ละติจูด"
            variant="outlined"
            readonly
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ลองจิจูด
          </div>
          <v-text-field
            v-model="markerLatLng.lng"
            placeholder="ลองจิจูด"
            variant="outlined"
            readonly
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            รายละเอียดของสัตว์&nbsp;<span class="text-red">*</span>
          </div>
          <v-textarea
            v-model="form.details"
            placeholder="รายละเอียดของสัตว์"
            variant="outlined"
            :rules="[rules.required]"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพ&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            v-model="form.image"
            prepend-icon="mdi-camera"
            placeholder="อัปโหลดรูปภาพ"
            accept="image/*"
            show-size
            variant="outlined"
            :rules="[rules.required]"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            สถานะ&nbsp;<span class="text-red">*</span>
          </div>
          <v-select
            v-model="form.status"
            placeholder="สถานะ"
            variant="outlined"
            :rules="[rules.required]"
            disabled
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" @click="submit">ประกาศ</v-btn>
          <v-btn color="secondary" class="ml-4" @click="confirmClearForm">ล้างข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from '~/stores/auth';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      menuDate: false,
      menuTime: false,
      valid: false,
      autoCloseTime: 3000,
      form: {
        gender: null,
        breed: "",
        color: "",
        adoptDate: null,
        adoptTime: null,
        adoptPlace: "",
        details: "",
        image: null,
        status: "กำลังหาบ้าน",
        types: null,
      },
      markerLatLng: {
        lat: "",
        lng: "",
      },
      zoom: 16,
      center: [18.895811354244756, 99.0130001306534],
      genders: ["ผู้", "เมีย", "ไม่ระบุ"],
      types: ["สุนัข", "แมว", "สัตว์เลี้ยงอื่นๆ"],
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
  
  computed: {
    formattedAdoptDate() {
      if (this.form.adoptDate) {
        const date = new Date(this.form.adoptDate);
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
  methods: {
    async submit() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;
      if (this.$refs.form.validate()) {
        const isFormIncomplete = Object.values(this.form).some(
          (value) => value === "" || value === null
        );
        if (isFormIncomplete) {
          toast.warning('กรุณากรอกข้อมูลให้ครบถ้วน',{autoClose: this.autoCloseTime});
          return;
        }
        let imageUrl = "default";
        if (this.form.image) {
          try {
            const imageData = new FormData();
            imageData.append("file", this.form.image);
            imageData.append("user_id", userId);
            const response = await axios.post(
              "http://localhost:5000/api/image/upload_images_adopt_pet",
              imageData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            imageUrl = response.data.data.url;
          } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", { autoClose: this.autoCloseTime });
            return;
          }
        }
        const data = {
          user_id: userId,
          adopt_date: this.formattedAdoptDate,
          adopt_time: this.form.adoptTime,
          adopt_place: this.form.adoptPlace,
          detail: this.form.details,
          lat: this.markerLatLng.lat.toString(),
          lng: this.markerLatLng.lng.toString(),
          breed: this.form.breed,
          image_url: imageUrl,
          gender: this.form.gender,
          color: this.form.color,
          status: this.form.status,
          types: this.form.types,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/adopt_pet/add_adopt_pet",
            data
          );
          toast.success("ประกาศสัตว์หาบ้านสำเร็จ", { autoClose: this.autoCloseTime });
          this.$emit("addadoptpet");
        } catch (error) {
          toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", { autoClose: this.autoCloseTime });
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
        gender: null,
        breed: "",
        color: "",
        adoptDate: null,
        adoptTime: null,
        adoptPlace: "",
        details: "",
        image: null,
        status: "กำลังหาบ้าน",
        types: null,
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
        toast.error("ไม่สามารถดึงข้อมูลตำแหน่งได้", { autoClose: this.autoCloseTime });
      }
      this.$refs.form.resetValidation();
    },
    logSelectedDate(selectedDate) {
      if (selectedDate) {
        this.form.adoptDate = selectedDate;
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
};
</script>
<style scoped>
.text-form {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.v-btn {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.text-red {
  color: red;
  font-family: "Prompt", sans-serif;
}
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.text-subtitle-1 {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 16px !important;
  font-weight: 500;
}
</style>
