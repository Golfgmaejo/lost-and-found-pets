<template>
  <v-container>
    <h1 class="text-portfolio-title">ประกาศสัตว์เลี้ยงหาย</h1>
    <h5 class="text-portfolio">
      กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้ผู้ที่พบสัตว์เลี้ยงของคุณสามารถติดต่อกลับได้
    </h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>

    <v-form v-model="valid" ref="form" class="text-form my-5">
      <!-- Pet Name & years -->
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ชื่อ&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.name"
            placeholder="ชื่อ"
            variant="outlined"
            :rules="[rules.required, rules.noNumbers]"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <div class="text-subtitle-1 mb-2">
            อายุ (ปี)&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.age_years"
            placeholder="อายุ (ปี)"
            variant="outlined"
            :rules="[rules.required, rules.onlyNumbers]"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <div class="text-subtitle-1 mb-2">
            อายุ (เดือน)&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.age_month"
            placeholder="อายุ (เดือน)"
            variant="outlined"
            :rules="[rules.required, rules.onlyNumbers]"
          />
        </v-col>
      </v-row>

      <!-- Pet Gender & Type -->
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
          />
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

      <!-- Pet Breed & Color -->
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
          />
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
          />
        </v-col>
      </v-row>

      <!-- Lost Date & Time -->
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            วันที่หาย&nbsp;<span class="text-red">*</span>
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
                :value="formattedLostDate"
                placeholder="วันที่หาย"
                prepend-icon="mdi-calendar"
                v-bind="props"
                v-on="on"
                readonly
                variant="outlined"
                persistent-placeholder
              />
            </template>
            <v-date-picker
              color="primary"
              v-model="form.lostDate"
              @input="logSelectedDate"
              :max="new Date().toISOString().substr(0, 10)"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            เวลาที่หาย&nbsp;<span class="text-red">*</span>
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
                v-model="form.lostTime"
                placeholder="เวลาที่หาย"
                prepend-icon="mdi-clock"
                readonly
                v-bind="props"
                v-on="on"
                @click="menuTime = true"
                variant="outlined"
                persistent-placeholder
              />
            </template>
            <v-time-picker
              v-model="form.lostTime"
              @input="menuTime = false"
              scrollable
              format="24hr"
            />
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            รางวัล(บาท)&nbsp;<span class="text-red"></span>
          </div>
          <v-text-field
            v-model="form.reward"
            placeholder="รางวัล(บาท)"
            variant="outlined"
            :rules="[rules.reward]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            สถานที่หาย&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.lostPlace"
            placeholder="สถานที่หาย"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <!-- Map and Coordinates -->
      <v-row>
        <v-alert type="info">สามารถย้ายหมุดได้</v-alert>
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
          />
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
          />
        </v-col>
      </v-row>

      <!-- Pet Details -->
      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            รายละเอียดของสัตว์เลี้ยง&nbsp;<span class="text-red">*</span>
          </div>
          <v-textarea
            v-model="form.details"
            placeholder="รายละเอียดของสัตว์เลี้ยง"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <!-- Upload Image & Status -->
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
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            สถานะ&nbsp;<span class="text-red">*</span>
          </div>
          <v-select
            v-model="form.status"
            :items="statuses"
            placeholder="สถานะ"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <!-- Buttons -->
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" @click="submit">ประกาศ</v-btn>
          <v-btn color="secondary" class="ml-4" @click="confirmClearForm"
            >ล้างข้อมูล</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      menuDate: false,
      menuTime: false,
      valid: false,
      autoCloseTime: 3000,
      form: {
        name: "",
        gender: null,
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
        status: null,
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
      statuses: ["หาย", "เจอแล้ว"],
      rules: {
        required: (value) => {
          return value && value.trim() ? true : "จำเป็นต้องกรอก";
        },
        noNumbers: (value) => /^[^\d]+$/.test(value) || "ไม่สามารถมีตัวเลขได้",
        onlyNumbers: (value) =>
          /^[0-9]+$/.test(value) || "ต้องเป็นตัวเลขเท่านั้น",
        reward: (value) => {
          return (
            value === "" || /^[0-9]+$/.test(value) || "ต้องเป็นตัวเลขเท่านั้น"
          );
        },
      },
    };
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
  methods: {
    async submit() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;
      if (this.$refs.form.validate()) {
        const isFormIncomplete = Object.keys(this.form).some((key) => {
          if (key === "reward") return false;
          return this.form[key] === "" || this.form[key] === null;
        });
        if (isFormIncomplete) {
          toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
            autoClose: this.autoCloseTime,
          });
          return;
        }
        let imageUrl = "default";
        if (this.form.image) {
          try {
            const imageData = new FormData();
            imageData.append("file", this.form.image);
            imageData.append("user_id", userId);
            const response = await axios.post(
              "http://localhost:5000/api/image/upload_images_lostpets",
              imageData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            imageUrl = response.data.data.url;
          } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", {
              autoClose: this.autoCloseTime,
            });
            return;
          }
        }
        const data = {
          user_id: userId,
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
          types: this.form.types,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/lost_pet/add_lost_pets",
            data
          );
          toast.success("ประกาศสัตว์เลี้ยงหายสำเร็จ", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("addlostpet");
        } catch (error) {
          toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", {
            autoClose: this.autoCloseTime,
          });
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
        gender: null,
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
        status: null,
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
        toast.error("ไม่สามารถดึงข้อมูลตำแหน่งได้", {
          autoClose: this.autoCloseTime,
        });
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
