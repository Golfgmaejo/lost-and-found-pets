<template>
    <v-card>
      <v-card-title>เพิ่มข้อมูลผู้สนับสนุน</v-card-title>
      <v-card-text>
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
              <v-file-input
                v-model="form.sponsorImage1"
                label="อัพโหลดรูปภาพ 1"
                accept="image/*"
                prepend-icon="mdi-camera"
                show-size
                variant="outlined"
                required
              ></v-file-input>
            </v-col>
            <v-col>
              <v-file-input
                v-model="form.sponsorImage2"
                label="อัพโหลดรูปภาพ 2"
                accept="image/*"
                prepend-icon="mdi-camera"
                show-size
                variant="outlined"
                required
              ></v-file-input>
            </v-col>
            <v-col>
              <v-file-input
                v-model="form.sponsorImage3"
                label="อัพโหลดรูปภาพ 3"
                accept="image/*"
                prepend-icon="mdi-camera"
                show-size
                variant="outlined"
                required
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitSponsors">บันทึก</v-btn>
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
            sponsorname1: "",
            sponsorname2: "",
            sponsorname3: "",
          sponsorImage1: null,
          sponsorImage2: null,
          sponsorImage3: null,
        },
      };
    },
    methods: {
      isFormIncomplete() {
        return (
          !this.form.sponsorname1 ||
          !this.form.sponsorname2 ||
          !this.form.sponsorname3 ||
          !this.form.sponsorImage1 ||
          !this.form.sponsorImage2 ||
          !this.form.sponsorImage3
        );
      },
  
      async submitSponsors() {
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
        formData.append("file", this.form.sponsorImage1);
        formData.append("file", this.form.sponsorImage2);
        formData.append("file", this.form.sponsorImage3);
  
        try {
          const response = await axios.post(
            "http://localhost:5000/api/about/upload_images_sponsors",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          const imageUrl1 = response.data.data.imageUrls[0];
          const imageUrl2 = response.data.data.imageUrls[1];
          const imageUrl3 = response.data.data.imageUrls[2];
  
          const data = {
            user_id: userId,
            sponsorname1: this.form.sponsorname1,
            sponsorname2: this.form.sponsorname2,
            sponsorname3: this.form.sponsorname3,
            sponsorImage1: imageUrl1,
            sponsorImage2: imageUrl2,
            sponsorImage3: imageUrl3,
          };
  
          await axios.post("http://localhost:5000/api/about/add_sponsor", data);
          toast.success("เพิ่มข้อมูลผู้สนับสนุนสำเร็จ", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("addsponsor");
          this.resetForm();
        } catch (error) {
          toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", {
            autoClose: this.autoCloseTime,
          });
        }
      },
  
      resetForm() {
        this.form.sponsorname1 = "";
        this.form.sponsorname2 = "";
        this.form.sponsorname3 = "";
        this.form.sponsorImage1 = null;
        this.form.sponsorImage2 = null;
        this.form.sponsorImage3 = null;
      },
    },
  };
  </script>
  