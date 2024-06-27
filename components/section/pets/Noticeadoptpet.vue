<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="เพศ"
            :rules="genderRules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.breed"
            label="สายพันธุ์"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.color"
            label="สี"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.lostDate"
            label="วันที่หาย"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.lostTime"
            label="เวลาที่หาย"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.lostPlace"
            label="สถานที่หาย"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.latitude"
            label="ละติจูด"
            :rules="Rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.longitude"
            label="ลองจิจูด"
            :rules="Rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.details"
            label="รายละเอียดเพิ่มเติม"
            :rules="Rules"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="form.image"
            label="อัปโหลดรูปภาพ"
            accept="image/*"
            :rules="Rules"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" type="submit">ประกาศ</v-btn>
          <v-btn color="secondary" @click="clearForm">ล้างข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      genders: ["ผู้", "เมีย", "ไม่ระบุ"],
      form: {
        name: "",
        gender: "",
        age: "",
        breed: "",
        color: "",
        reward: "",
        type: "",
        lostDate: "",
        lostTime: "",
        lostPlace: "",
        latitude: "",
        longitude: "",
        details: "",
        image: null,
      },
      Rules: [v => !!v || 'จำเป็นต้องกรอก'],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
        // Perform the API call to submit the form
        axios
          .post("http://localhost:5000/api/lost_pet/create", formData)
          .then((response) => {
            console.log("Form submitted:", response.data);
            this.$emit("formSubmitted");
            this.clearForm();
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      }
    },
    clearForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.v-file-input {
  margin-top: 1rem;
}
</style>