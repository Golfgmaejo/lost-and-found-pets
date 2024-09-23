<template>
  <v-container>
    <h1 class="text-portfolio-title mt-10">แก้ไขข้อมูลสัตว์เลี้ยง</h1>
    <h5 class="mt-2">
      กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้ผู้ที่พบสัตว์เลี้ยงของคุณสามารถติดต่อกลับได้
    </h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="เพศ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
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
                :value="formattedAdoptDate"
                label="*วันที่ประกาศ"
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
              v-model="selectedDate"
              @input="updateAdoptDate"
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
                :value="formattedAdoptTime"
                label="*เวลาประกาศ"
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
              v-model="form.adopt_time"
              @input="updateAdoptTime"
              scrollable
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.adopt_place"
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
            v-model="form.detail"
            label="รายละเอียดของสัตว์"
            variant="outlined"
            :rules="[rules.required]"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-img
            v-if="form.image_url"
            :src="form.image_url"
            max-width="250"
            max-height="250"
            class="mb-4"
          ></v-img>
          <v-file-input
            v-model="newImage"
            prepend-icon="mdi-camera"
            label="อัปโหลดรูปภาพใหม่"
            accept="image/*"
            show-size
            variant="outlined"
            @change="handleFileUpload"
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
          <v-btn color="primary" @click="submit">บันทึก</v-btn>
          <v-btn color="secondary" class="ml-4" @click="confirmResetForm"
            >คืนค่าข้อมูล</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    petData: Object,
  },
  data() {
    return {
      menuDate: false,
      menuTime: false,
      valid: false,
      selectedDate: this.formatDate(this.petData?.adopt_date) || null,
      form: this.petData
        ? { ...this.petData }
        : {
            gender: "",
            breed: "",
            color: "",
            adopt_date: null,
            adopt_time: null,
            adopt_place: "",
            detail: "",
            image_url: null,
            status: "",
          },
      newImage: null,
      markerLatLng: {
        lat: this.petData?.lat || 18.895811354244756,
        lng: this.petData?.lng || 99.0130001306534,
      },
      zoom: 16,
      center: [
        this.petData?.lat || 18.895811354244756,
        this.petData?.lng || 99.0130001306534,
      ],
      genders: ["ผู้", "เมีย", "ไม่ระบุ"],
      statuses: ["กำลังหาบ้าน", "ได้บ้านแล้ว"],
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
  watch: {
    petData(newData) {
      this.form = newData
        ? { ...newData }
        : {
            gender: "",
            breed: "",
            color: "",
            adopt_date: null,
            adopt_time: null,
            adopt_place: "",
            detail: "",
            image_url: null,
            status: "",
          };
      this.selectedDate = this.formatDate(newData?.adopt_date) || null;
      this.markerLatLng.lat = newData?.lat || 18.895811354244756;
      this.markerLatLng.lng = newData?.lng || 99.0130001306534;
      this.center = [this.markerLatLng.lat, this.markerLatLng.lng];
    },
  },
  methods: {
    async handleFileUpload() {
      if (!this.newImage) return;
      try {
        const formData = new FormData();
        formData.append("image", this.newImage);
        formData.append("old_image_url", this.form.image_url || "");
        const response = await axios.put(
          `http://localhost:5000/api/image/update_images_adopt_pet`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.form.image_url = response.data.data.url;
        this.newImage = null;
        alert("รูปภาพอัปเดตสำเร็จ");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
      }
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const data = {
          ...this.form,
          adopt_time: this.formattedAdoptTime,
          adopt_date: this.formattedAdoptDate,
          lat: this.markerLatLng.lat.toString(),
          lng: this.markerLatLng.lng.toString(),
          image_url: this.form.image_url,
        };
        axios
          .put(
            `http://localhost:5000/api/adopt_pet/update_adopt_pet/${this.petData.id}`,
            data
          )
          .then((response) => {
            alert("อัปเดตข้อมูลสำเร็จ");
            this.$emit("updateadoptpet");
          })
          .catch((error) => {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    },
    confirmResetForm() {
      if (confirm("คุณแน่ใจหรือว่าต้องการคืนค่าข้อมูลทั้งหมด?")) {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = this.petData ? { ...this.petData } : {};
      this.markerLatLng.lat = this.petData?.lat || 18.895811354244756;
      this.markerLatLng.lng = this.petData?.lng || 99.0130001306534;
      this.center = [this.markerLatLng.lat, this.markerLatLng.lng];
      this.selectedDate = this.formatDate(this.petData?.adopt_date) || null;
      this.form.adopt_time = this.petData?.adopt_time || null;
      this.form.image_url = this.petData?.image_url || null;
    },
    updateAdoptTime(time) {
      this.form.adopt_time = time;
      this.menuTime = false;
    },
    updateAdoptDate() {
      if (this.selectedDate) {
        this.form.adopt_date = this.formattedAdoptDate;
        this.menuDate = false;
      }
    },
    formatDate(dateStr) {
      if (dateStr) {
        const [day, month, year] = dateStr.split("/").map(Number);
        const gregorianYear = year - 543;
        return new Date(
          `${gregorianYear}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`
        );
      }
      return null;
    },
    onMarkerMoveEnd(event) {
      const latLng = event.target.getLatLng();
      this.markerLatLng.lat = latLng.lat;
      this.markerLatLng.lng = latLng.lng;
    },
  },
  computed: {
    formattedAdoptDate() {
      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear() + 543;
        return `${day}/${month}/${year}`;
      }
      return "";
    },
    formattedAdoptTime() {
      if (this.form.adopt_time) {
        const [hours, minutes] = this.form.adopt_time.split(":");
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
      }
      return "00:00";
    },
  },
  mounted() {
    if (!this.petData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.markerLatLng.lat = position.coords.latitude;
          this.markerLatLng.lng = position.coords.longitude;
          this.center = [this.markerLatLng.lat, this.markerLatLng.lng];
        },
        (error) => {
          console.error(error);
        }
      );
    }
  },
};
</script>

<style scoped>
.text-portfolio-title {
  font-size: 2rem;
  font-weight: bold;
}
.text-red {
  color: red;
}
</style>
