<template>
  <v-container>
    <h1 class="text-portfolio-title">เพิ่มแกลลอรี่</h1>
    <h5 class="text-portfolio">กรุณากรอกข้อมูลให้ครบถ้วน</h5>
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
          <div class="text-subtitle-1 mb-2">
            แสดงแกลลอรี่
          </div>
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
          <div class="text-subtitle-1 mb-2">
            อัปโหลดรูปภาพแกลลอรี่&nbsp;<span class="text-red">*</span>
          </div>
          <v-file-input
            v-model="form.image"
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
          <v-btn color="primary" @click="submit">บันทึกแกลลอรี่</v-btn>
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
import { toast } from "vue3-toastify";
import { useAuthStore } from "~/stores/auth";

export default {
  data() {
    return {
      valid: false,
      autoCloseTime: 3000,
      form: {
        name: "",
        status: false,
        image: null,
      },
      rules: {
        required: (value) => (value && value.trim() ? true : "จำเป็นต้องกรอก"),
      },
    };
  },
  methods: {
    async submit() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;
      if (this.$refs.form.validate()) {
        const isFormIncomplete = Object.keys(this.form).some((key) => {
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
              "http://localhost:5000/api/image/upload_images_gallery",
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
            toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", {
              autoClose: this.autoCloseTime,
            });
            return;
          }
        }

        const data = {
          user_id: userId,
          name: this.form.name,
          status: this.form.status,
          image_url: imageUrl,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/gallery/add_gallery",
            data
          );
          toast.success("เพิ่มข้อมูลแกลลอรี่สำเร็จ", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("addgallery");
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
        status: false,
        image: null,
      };
      this.$refs.form.resetValidation();
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
