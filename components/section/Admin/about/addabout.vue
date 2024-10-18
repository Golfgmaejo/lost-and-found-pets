<template>
  <v-card>
    <v-card-title>เพิ่มข้อมูลเกี่ยวกับเรา</v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col>
            <v-textarea
              v-model="form.description1"
              label="รายละเอียด 1"
            ></v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              v-model="form.description2"
              label="รายละเอียด 2"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-file-input
              v-model="form.image1"
              label="อัพโหลดรูปภาพ 1"
              accept="image/*"
              prepend-icon="mdi-camera"
              show-size
              variant="outlined"
            ></v-file-input>
          </v-col>
          <v-col>
            <v-file-input
              v-model="form.image2"
              label="อัพโหลดรูปภาพ 2"
              accept="image/*"
              prepend-icon="mdi-camera"
              show-size
              variant="outlined"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submitAbout">บันทึก</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import { useAuthStore } from "~/stores/auth";

export default {
  data() {
    return {
      autoCloseTime: 3000,
      form: {
        description1: "",
        description2: "",
        image1: null,
        image2: null,
      },
    };
  },
  methods: {
    isFormIncomplete() {
      return (
        !this.form.description1 ||
        !this.form.description2 ||
        !this.form.image1 ||
        !this.form.image2
      );
    },

    async submitAbout() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;

      if (this.isFormIncomplete()) {
        toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
          autoClose: this.autoCloseTime,
        });
        return;
      }

      let formData = new FormData();
      formData.append("user_id", userId);
      formData.append("file", this.form.image1);
      formData.append("file", this.form.image2);

      try {
        const response = await axios.post(
          "https://lost-and-found-pets-backend.onrender.com/api/about/upload_images_about",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl1 = response.data.data.imageUrls[0];
        const imageUrl2 = response.data.data.imageUrls[1];
        const data = {
          user_id: userId,
          description1: this.form.description1,
          description2: this.form.description2,
          image1: imageUrl1,
          image2: imageUrl2,
        };
        const saveResponse = await axios.post(
          "https://lost-and-found-pets-backend.onrender.com/api/about/add_about",
          data
        );
        toast.success("เพิ่มข้อมูลเกี่ยวกับสำเร็จ", {
          autoClose: this.autoCloseTime,
        });
        this.$emit("addabout");
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", {
          autoClose: this.autoCloseTime,
        });
      }
    },

    resetForm() {
      this.form.description1 = "";
      this.form.description2 = "";
      this.form.image1 = null;
      this.form.image2 = null;
    },
  },
};
</script>
