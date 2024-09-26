<template>
  <v-container>
    <h1 class="text-portfolio-title">แก้ไขบทความ</h1>
    <h5 class="text-portfolio">กรุณาแก้ไขบทความให้ครบถ้วน</h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="text-form my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ชื่อบทความ&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.name"
            placeholder="ชื่อบทความ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            รายละเอียดบทความ&nbsp;<span class="text-red">*</span>
          </div>
          <v-textarea
            v-model="form.details"
            placeholder="รายละเอียดบทความ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            ลิงก์บทความ&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            v-model="form.link"
            placeholder="ลิงก์บทความ"
            variant="outlined"
            :rules="[rules.urlOptional]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-1 mb-2">
            อ้างอิง&nbsp;<span class="text-red"></span>
          </div>
          <v-text-field
            v-model="form.reference"
            placeholder="อ้างอิง"
            variant="outlined"
          ></v-text-field>
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
            อัปโหลดรูปภาพบทความ&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput"
            v-model="newImage"
            prepend-icon="mdi-camera"
            placeholder="อัปโหลดรูปภาพบทความ"
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
import { toast } from 'vue3-toastify';

export default {
  props: {
    articleData: Object,
  },
  data() {
    return {
      valid: false,
      autoCloseTime: 3000,
      form: this.articleData
        ? { ...this.articleData }
        : {
            name: "",
            details: "",
            link: "",
            image_url: null,
            reference: "",
          },
      newImage: null,
      rules: {
        required: (value) => (value && value.trim() ? true : "จำเป็นต้องกรอก"),
        urlOptional: (value) =>
          !value ||
          /^(ftp|http|https):\/\/[^ "]+$/.test(value) ||
          "ต้องเป็น URL ที่ถูกต้อง",
      },
    };
  },
  watch: {
    articleData(newData) {
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
          `http://localhost:5000/api/image/update_images_article`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.form.image_url = response.data.data.url;
        this.newImage = null;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", { autoClose: this.autoCloseTime });
        throw error;
      }
    },
    async submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const isFormIncomplete = Object.keys(this.form).some((key) => {
          if (key === "link" || key === "reference") return false;
          return this.form[key] === "" || this.form[key] === null;
        });
        if (isFormIncomplete) {
          toast.warning('กรุณากรอกข้อมูลให้ครบถ้วน',{autoClose: this.autoCloseTime});
          return;
        }
        try {
          if (this.newImage) {
            await this.handleFileUpload();
          }
          await axios.put(
            `http://localhost:5000/api/article/update_article/${this.articleData.id}`,
            this.form
          );
          toast.success("อัปเดตข้อมูลสำเร็จ", { autoClose: this.autoCloseTime });
          this.$emit("updatearticle");
        } catch (error) {
          console.error("Error updating article:", error);
          toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", { autoClose: this.autoCloseTime });
        }
      } else {
        toast.warning('กรุณากรอกข้อมูลให้ครบถ้วน',{autoClose: this.autoCloseTime});
      }
    },
    confirmResetForm() {
      if (confirm("คุณแน่ใจหรือว่าต้องการคืนค่าข้อมูลทั้งหมด?")) {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = this.articleData ? { ...this.articleData } : {};
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


