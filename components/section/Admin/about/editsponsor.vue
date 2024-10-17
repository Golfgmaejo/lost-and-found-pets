<template>
  <v-container>
    <h1>แก้ไขข้อมูลผู้สนับสนุน</h1>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.sponsorname1"
            label="ผู้สนับสนุน 1"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.sponsorname2"
            label="ผู้สนับสนุน 2"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.sponsorname3"
            label="ผู้สนับสนุน 3"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-img
            v-if="form.sponsorImage1"
            :src="form.sponsorImage1"
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
          <v-img
            v-if="form.sponsorImage2"
            :src="form.sponsorImage2"
            max-width="300px"
            class="mb-2"
          />
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพ 2&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput2"
            v-model="newImage2"
            placeholder="อัพโหลดรูปภาพ 2"
            accept="image/*"
            show-size
            variant="outlined"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
        <v-col>
          <v-img
            v-if="form.sponsorImage3"
            :src="form.sponsorImage3"
            max-width="300px"
            class="mb-2"
          />
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพ 3&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            ref="fileInput3"
            v-model="newImage3"
            placeholder="อัพโหลดรูปภาพ 3"
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
    sponsorData: Object,
  },
  data() {
    return {
      valid: false,
      form: {
        id: this.sponsorData ? this.sponsorData.id : null,
        sponsorname1: this.sponsorData ? this.sponsorData.sponsorname1 : "",
        sponsorname2: this.sponsorData ? this.sponsorData.sponsorname2 : "",
        sponsorname3: this.sponsorData ? this.sponsorData.sponsorname3 : "",
        sponsorImage1: this.sponsorData ? this.sponsorData.sponsorImage1 : null,
        sponsorImage2: this.sponsorData ? this.sponsorData.sponsorImage2 : null,
        sponsorImage3: this.sponsorData ? this.sponsorData.sponsorImage3 : null,
      },
      newImage1: null,
      newImage2: null,
      newImage3: null,
      autoCloseTime: 3000,
    };
  },
  watch: {
    sponsorData(newData) {
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
        formData.append("image1", imageFile);
        formData.append("old_image_url", oldImageURL || "");

        const response = await axios.put(
          `http://localhost:5000/api/about/update_images_sponsors`,
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

      const promises = [];
      if (this.newImage1) {
        promises.push(
          this.handleFileUpload(this.newImage1, this.form.sponsorImage1)
        );
      }

      if (this.newImage2) {
        promises.push(
          this.handleFileUpload(this.newImage2, this.form.sponsorImage2)
        );
      }

      if (this.newImage3) {
        promises.push(
          this.handleFileUpload(this.newImage3, this.form.sponsorImage3)
        );
      }
      const updatedImages = await Promise.all(promises);
      if (updatedImages[0]) this.form.sponsorImage1 = updatedImages[0];
      if (updatedImages[1]) this.form.sponsorImage2 = updatedImages[1];
      if (updatedImages[2]) this.form.sponsorImage3 = updatedImages[2];
      try {
        const response = await axios.put(
          `http://localhost:5000/api/about/update_sponsor/${this.form.id}`,
          {
            sponsorname1: this.form.sponsorname1,
            sponsorname2: this.form.sponsorname2,
            sponsorname3: this.form.sponsorname3,
            sponsorImage1: this.form.sponsorImage1,
            sponsorImage2: this.form.sponsorImage2,
            sponsorImage3: this.form.sponsorImage3,
          }
        );

        if (response.data.status === "success") {
          toast.success("ข้อมูลผู้สนับสนุนถูกอัปเดตเรียบร้อย", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("updateSponsor");
        }
      } catch (error) {
        console.error("Error updating sponsor data:", error);
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลผู้สนับสนุน", {
          autoClose: this.autoCloseTime,
        });
      }
    },
    resetForm() {
      this.form = this.sponsorData ? { ...this.sponsorData } : {};
      this.newImage1 = null;
      this.newImage2 = null;
      this.newImage3 = null;
      if (this.$refs.fileInput1) {
        this.$refs.fileInput1.reset();
      }
      if (this.$refs.fileInput2) {
        this.$refs.fileInput2.reset();
      }
      if (this.$refs.fileInput3) {
        this.$refs.fileInput3.reset();
      }
    },
  },
};
</script>
