<template>
  <v-container>
    <h1 class="text-portfolio-title mt-10">เพิ่มบทความ</h1>
    <h5 class="mt-2">กรุณากรอกข้อมูลให้ครบถ้วน</h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="*ชื่อบทความ"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.details"
            label="รายละเอียดบทความ"
            variant="outlined"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.link"
            label="ลิงก์บทความ"
            variant="outlined"
            :rules="[rules.urlOptional]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="form.image"
            prepend-icon="mdi-camera"
            label="อัปโหลดรูปภาพบทความ"
            accept="image/*"
            show-size
            variant="outlined"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn color="primary" @click="submit">บันทึกบทความ</v-btn>
          <v-btn color="secondary" class="ml-4" @click="confirmClearForm">ล้างข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: false,
      form: {
        name: "",
        details: "",
        link: "",
        image: null,
      },
      rules: {
        required: (value) => (value && value.trim() ? true : "จำเป็นต้องกรอก"),
        urlOptional: (value) => {
          return (
            value === "" ||
            /^(ftp|http|https):\/\/[^ "]+$/.test(value) ||
            "ต้องเป็น URL ที่ถูกต้อง"
          );
        },
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const isFormIncomplete = Object.keys(this.form).some((key) => {
          if (key === "link") return false;
          return this.form[key] === "" || this.form[key] === null;
        });

        if (isFormIncomplete) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }

        let imageUrl = "default";
        if (this.form.image) {
          try {
            const imageData = new FormData();
            imageData.append("file", this.form.image);
            imageData.append("user_id", "e969bea8-5469-499a-baf8-6c896c556e50");
            const response = await axios.post(
              "http://localhost:5000/api/image/upload_images_article",
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
            alert("มีข้อผิดพลาดในการอัปโหลดรูปภาพ");
            return;
          }
        }
        const data = {
          user_id: "e969bea8-5469-499a-baf8-6c896c556e50",
          name: this.form.name,
          details: this.form.details,
          link: this.form.link || "",
          image_url: imageUrl,
        };
        try {
          const response = await axios.post(
            "http://localhost:5000/api/article/add_article",
            data
          );
          alert("เพิ่มบทความสำเร็จ");
          this.$emit("addarticle");
          this.clearForm();
        } catch (error) {
          alert("มีข้อผิดพลาดในการบันทึกข้อมูล");
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
        details: "",
        link: "",
        image: null,
      };
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped></style>
