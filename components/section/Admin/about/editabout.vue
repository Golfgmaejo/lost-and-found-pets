<template>
  <v-container>
    <h1>แก้ไขข้อมูลเกี่ยวกับเรา</h1>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col>
          <v-img
            v-if="form.image1"
            :src="form.image1"
            max-width="300px"
            class="mb-2"
          />
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพ 1&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput1"
            v-model="newImage1"
            placeholder="อัพโหลดรูปภาพ 1"
            accept="image/*"
            show-size
            variant="outlined"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 mb-2">
            ข้อมูลรายละเอียด 1&nbsp;<span class="text-red">*</span>
          </div>
          <v-textarea
            v-model="form.description1"
            placeholder="กรอกข้อมูลรายละเอียด 1"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <div
        style="flex-grow: 2; height: 2px; background-color: #b4511a"
        class="mb-12"
      ></div>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 mb-2">
            ข้อมูลรายละเอียด 2&nbsp;<span class="text-red">*</span>
          </div>
          <v-textarea
            v-model="form.description2"
            placeholder="กรอกข้อมูลรายละเอียด 2"
            required
          ></v-textarea>
        </v-col>
        <v-col>
          <v-img
            v-if="form.image2"
            :src="form.image2"
            max-width="300px"
            class="mb-2"
          />
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพ 2&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput2"
            v-model="newImage2"
            placeholder="อัปโหลดรูปภาพ 2"
            accept="image/*"
            show-size
            variant="outlined"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" @click="submitEdit">บันทึก</v-btn>
          <v-btn color="secondary" class="ml-4" @click="resetForm"
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
    aboutData: Object,
  },
  data() {
    return {
      valid: false,
      form: {
        id: this.aboutData ? this.aboutData.id : null,
        description1: this.aboutData ? this.aboutData.description1 : "",
        description2: this.aboutData ? this.aboutData.description2 : "",
        image1: this.aboutData ? this.aboutData.image1 : null,
        image2: this.aboutData ? this.aboutData.image2 : null,
      },
      newImage1: null,
      newImage2: null,
      autoCloseTime: 3000,
    };
  },
  watch: {
    aboutData(newData) {
      this.form = newData ? { ...newData } : {};
    },
  },
  methods: {
    async handleFileUpload(imageFile, oldImageURL) {
      if (!imageFile) {
        console.log("No image to upload");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("image1", imageFile1);
        formData.append("old_image_url1", oldImageURL1 || "");
        formData.append("image2", imageFile2);
        formData.append("old_image_url2", oldImageURL2 || "");

        const response = await axios.put(
          `https://lost-and-found-pets-backend.onrender.com/api/about/update_images_about`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data.data.image1;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", {
          autoClose: this.autoCloseTime,
        });
        return null;
      }
    },

    async submitEdit() {
  this.$refs.form.validate();
  if (!this.valid) {
    toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
      autoClose: this.autoCloseTime,
    });
    return;
  }

  const imageUrl1 = await this.handleFileUpload(
    this.newImage1,
    this.form.image1
  );
  this.form.image1 = imageUrl1; 

  const imageUrl2 = await this.handleFileUpload(
    this.newImage2,
    this.form.image2 
  );
  this.form.image2 = imageUrl2;

  try {
    const response = await axios.put(
      `https://lost-and-found-pets-backend.onrender.com/api/about/update_about/${this.form.id}`,
      {
        description1: this.form.description1,
        description2: this.form.description2,
        image1: this.form.image1,
        image2: this.form.image2,
      }
    );

    if (response.data.status === "success") {
      toast.success("ข้อมูลถูกอัปเดตเรียบร้อย", {
        autoClose: this.autoCloseTime,
      });
    }
    this.$emit("updateabout");
  } catch (error) {
    console.error("Error updating about data:", error);
    toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", {
      autoClose: this.autoCloseTime,
    });
  }
},

    resetForm() {
      this.form = this.aboutData ? { ...this.aboutData } : {};
      this.newImage1 = null;
      this.newImage2 = null;
      if (this.$refs.fileInput1) {
        this.$refs.fileInput1.reset();
      }
      if (this.$refs.fileInput2) {
        this.$refs.fileInput2.reset();
      }
    },
  },
};
</script>
