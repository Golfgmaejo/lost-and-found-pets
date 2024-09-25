<template>
  <v-container>
    <h1 class="text-portfolio-title">แก้ไขข้อมูลแกลลอรี่</h1>
    <h5 class="text-portfolio">กรุณาแก้ไขข้อมูลแกลลอรี่ให้ครบถ้วน</h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="text-form my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ชื่อแกลลอรี่&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.name"
            placeholder="ชื่อแกลลอรี่"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-switch
            v-model="form.status"
            placeholder="แสดงแกลลอรี่"
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
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพแกลลอรี่&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput"
            v-model="newImage"
            prepend-icon="mdi-camera"
            placeholder="อัปโหลดรูปภาพแกลลอรี่"
            accept="image/*"
            show-size
            variant="outlined"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
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
import { toast } from "vue3-toastify";

export default {
  props: {
    galleryData: Object,
  },
  data() {
    return {
      valid: false,
      autoCloseTime: 3000,
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
        toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", {
          autoClose: this.autoCloseTime,
        });
        return false;
      }
    },
    async submit() {
      this.$refs.form.validate();
      if (!this.valid) {
        toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
          autoClose: this.autoCloseTime,
        });
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
        toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
          autoClose: this.autoCloseTime,
        });
        return;
      }

      axios
        .put(
          `http://localhost:5000/api/gallery/update_gallery/${this.galleryData.id}`,
          this.form
        )
        .then(() => {
          toast.success("อัปเดตข้อมูลสำเร็จ", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("updategallery");
        })
        .catch((error) => {
          console.error(error);
          toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", {
            autoClose: this.autoCloseTime,
          });
        });
    },
    confirmResetForm() {
      if (confirm("คุณแน่ใจหรือว่าต้องการคืนค่าข้อมูลทั้งหมด?")) {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = this.galleryData ? { ...this.galleryData } : {};
      this.newImage = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.reset();
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

