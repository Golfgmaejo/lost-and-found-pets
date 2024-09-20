<template>
  <v-container>
    <h1 class="text-portfolio-title mt-10">แก้ไขข้อมูลแกลอรี่</h1>
    <h5 class="mt-2">กรุณาแก้ไขข้อมูลแกลอรี่ให้ครบถ้วน</h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="*ชื่อแกลอรี่"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-switch
            v-model="form.status"
            label="แสดงแกลอรี่"
            inset
            color="green"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-img
            v-if="form.image_url"
            :src="form.image_url"
            max-width="400"
            max-height="400"
            class="mb-4"
          ></v-img>
          <v-file-input
            v-model="newImage"
            prepend-icon="mdi-camera"
            label="อัปโหลดรูปภาพแกลอรี่"
            accept="image/*"
            show-size
            variant="outlined"
          ></v-file-input>
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
    galleryData: Object,
  },
  data() {
    return {
      valid: false,
      form: this.galleryData
        ? { ...this.galleryData }
        : {
            name: "",
            status: false,
            image_url: null,
          },
      newImage: null,
      rules: {
        required: (value) => (value && value.trim() ? true : "จำเป็นต้องกรอก"),
      },
    };
  },
  watch: {
    galleryData(newData) {
      this.form = newData ? { ...newData } : {};
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
          `http://localhost:5000/api/image/update_images_gallery`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.form.image_url = response.data.data.url;
        this.newImage = null;
        return true;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        return false;
      }
    },
    async submit() {
      this.$refs.form.validate();
      if (!this.valid) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      if (this.newImage) {
        const uploadSuccess = await this.handleFileUpload();
        if (!uploadSuccess) {
          return;
        }
      }

      const isFormIncomplete = Object.keys(this.form).some((key) => {
        return this.form[key] === "" || this.form[key] === null;
      });
      if (isFormIncomplete) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      axios
        .put(
          `http://localhost:5000/api/gallery/update_gallery/${this.galleryData.id}`,
          this.form
        )
        .then(() => {
          alert("อัปเดตข้อมูลสำเร็จ");
          this.$emit("updategallery");
        })
        .catch((error) => {
          console.error(error);
          alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        });
    },
    confirmResetForm() {
      if (confirm("คุณแน่ใจหรือว่าต้องการคืนค่าข้อมูลทั้งหมด?")) {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = this.galleryData ? { ...this.galleryData } : {};
    },
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
