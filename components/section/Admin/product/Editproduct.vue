<template>
  <v-container>
    <h1 class="text-portfolio-title mt-10">แก้ไขข้อมูลสินค้า</h1>
    <h5 class="mt-2">กรุณาแก้ไขข้อมูลสินค้าให้ครบถ้วน</h5>
    <h5 class="text-red">*กรุณากรอกข้อมูล</h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="*ชื่อสินค้า"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.type"
            :items="types"
            label="*ประเภทสินค้า"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.details"
            label="รายละเอียดสินค้า"
            variant="outlined"
            :rules="[rules.required]"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.link_Shopee"
            label="ลิงก์ Shopee"
            variant="outlined"
            :rules="[rules.urlOptional]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.link_Lazada"
            label="ลิงก์ Lazada"
            variant="outlined"
            :rules="[rules.urlOptional]"
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
          <v-file-input
            v-model="newImage"
            prepend-icon="mdi-camera"
            label="อัปโหลดรูปภาพสินค้า"
            accept="image/*"
            show-size
            variant="outlined"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-switch
            v-model="form.isBestSeller"
            label="สินค้าขายดี"
            inset
            color="green"
          ></v-switch>
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
    productData: Object,
  },
  data() {
    return {
      valid: false,
      form: this.productData
        ? { ...this.productData }
        : {
            name: "",
            type: "",
            details: "",
            link_Shopee: "",
            link_Lazada: "",
            image_url: null,
            isBestSeller: false,
          },
      newImage: null,
      types: ["สุนัข", "แมว", "สัตว์เลี้ยงอื่นๆ"],
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
    productData(newData) {
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
          `http://localhost:5000/api/image/update_images_products`,
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
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        throw error;
      }
    },
    async submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const isFormIncomplete = Object.keys(this.form).some((key) => {
          if (key === "link_Shopee" || key === "link_Lazada") return false;
          return this.form[key] === "" || this.form[key] === null;
        });
        if (isFormIncomplete) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }
        try {
          if (this.newImage) {
            await this.handleFileUpload();
          }
          await axios.put(
            `http://localhost:5000/api/product/update_product/${this.productData.id}`,
            this.form
          );
          alert("อัปเดตข้อมูลสำเร็จ");
          this.$emit("updateproduct");
        } catch (error) {
          console.error("Error updating product:", error);
          alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }
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
      this.form = this.productData ? { ...this.productData } : {};
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
