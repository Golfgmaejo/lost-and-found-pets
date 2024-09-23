<template>
  <v-container class="my-16">
    <h1 class="text-portfolio-title mt-10">สมัครสมาชิก</h1>
    <h5 class="mt-2">
      กรุณากรอกข้อมูลที่ใช้งานจริง เพื่อความสะดวกในกรณีที่ต้องมีการติดต่อ
      และการประกาศช่วยตามหา
    </h5>
    <h5 class="text-red">
      *ข้อมูลจะถูกเปิดเผยกรณีที่อนุญาติให้ติดต่อในการลงประกาศ
    </h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        
        <v-col cols="12" md="12">
          <h5 class="text-red">*กรุณากรอก</h5>
          <v-select
            label="คำนำหน้า"
            v-model="prefix"
            :items="prefixOptions"
            :rules="[rules.required]"
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="ชื่อจริง"
            v-model="firstName"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="นามสกุล"
            v-model="lastName"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="เบอร์โทรศัพท์"
            v-model="phone"
            :rules="[rules.required, rules.phone]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Facebook"
            v-model="Facebook"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Line ID" v-model="Line_id" variant="outlined" />
        </v-col>
        <v-col cols="12">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="ที่อยู่"
            v-model="address"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="4">
          <h5 class="text-red">*</h5>
          <v-autocomplete
            label="จังหวัด"
            v-model="province"
            :items="provinces"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <h5 class="text-red">*</h5>
          <v-autocomplete
            label="อำเภอ"
            v-model="district"
            :items="districts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <h5 class="text-red">*</h5>
          <v-autocomplete
            label="ตำบล"
            v-model="subdistrict"
            :items="subdistricts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <h5 class="text-red">*</h5>
          <v-autocomplete
            label="รหัสไปรษณีย์"
            v-model="postalCode"
            :items="postalcodes"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col md="6"></v-col>
        <v-col cols="12">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="Email address"
            v-model="email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="Password"
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :rules="[rules.required]"
            variant="outlined"
            @click:append-inner="visible = !visible"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h5 class="text-red">*</h5>
          <v-text-field
            label="Confirm password"
            v-model="confirmPassword"
            :type="'password'"
            :rules="[rules.required, rules.matchPassword]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" style="display: flex; justify-content: space-evenly">
          <v-checkbox
            v-model="agree"
            :rules="[rules.requiredAgreement]"
            label="ฉันเห็นด้วยกับข้อกำหนดและเงื่อนไข"
          />
        </v-col>
        <v-alert v-if="emailError" type="error" class="mt-3">
          {{ emailError }}
        </v-alert>
        <v-alert v-if="success" type="success" class="mt-3" >สมัครสมาชิกสำเร็จ!</v-alert>
        <v-col cols="12" style="display: flex; justify-content: space-evenly">
          <v-btn color="primary" :disabled="!valid" @click="submit">สมัครสมาชิก</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
//import authApi from "../../api/auth"

export default {
  data() {
    return {
      visible: false,
      valid: false,
      prefix: "",
      firstName: "",
      lastName: "",
      phone: "",
      Facebook: "",
      Line_id: "",
      address: "",
      province: null,
      district: null,
      subdistrict: null,
      postalCode: null,
      email: "",
      emailError: "",
      password: "",
      confirmPassword: "",
      agree: false,
      success: false,
      prefixOptions: ["นาย", "นาง", "นางสาว"],
      provinces: [],
      districts: [],
      subdistricts: [],
      postalcodes: [],
      rules: {
        required: (value) => !!value || "จำเป็นต้องกรอก",
        requiredAgreement: (value) =>
          !!value || "กรุณายินยอมเห็นด้วยกับข้อกำหนดและเงื่อนไข",
        email: (value) => /.+@.+\..+/.test(value) || "อีเมลต้องถูกต้อง",
        phone: (value) =>
          /^\d{10}$/.test(value) || "หมายเลขโทรศัพท์ต้องเป็น 10 หลัก",
        matchPassword: (value) =>
          value === this.password || "รหัสผ่านต้องตรงกัน",
      },
    };
  },
  created() {
    this.fetchProvinces();
    this.fetchDistricts();
    this.fetchSubdistricts();
    this.fetchPostalcodes();
  },
  methods: {
    fetchProvinces() {
      const url =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
      axios
        .get(url)
        .then((response) => {
          this.provinces = response.data.map((province) => province.name_th);
        })

        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });
    },
    fetchDistricts() {
      const url =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
      axios
        .get(url)
        .then((response) => {
          this.districts = response.data.map((district) => district.name_th);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    },
    fetchSubdistricts() {
      const url =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";
      axios
        .get(url)
        .then((response) => {
          const subdistrictNames = new Set();
          response.data.forEach((subdistrict) => {
            subdistrictNames.add(subdistrict.name_th);
          });
          this.subdistricts = Array.from(subdistrictNames);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    },
    fetchPostalcodes() {
      const url =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";
      axios
        .get(url)
        .then((response) => {
          const uniquePostalCodes = [
            ...new Set(
              response.data.map((postalcodes) => postalcodes.zip_code)
            ),
          ];
          this.postalcodes = uniquePostalCodes;
        })
        .catch((error) => {
          console.error("Error fetching postalcodes:", error);
        });
    },
    submit() {
      if (this.$refs.form.validate()) {
        const data = {
          prefix: this.prefix,
          first_name: this.firstName,
          last_name: this.lastName,
          phone: this.phone,
          Facebook: this.Facebook || "",
          Line_id: this.Line_id || "",
          address: this.address,
          province: this.province,
          district: this.district,
          subdistrict: this.subdistrict,
          postal_code: this.postalCode,
          email: this.email,
          password: this.password,
          username: this.email,
        };
        axios
          .post("http://localhost:5000/api/user/create", data)
          .then((response) => {
            this.emailError = "";
            this.success = true;
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error response from server:", error.response.data);

              if (error.response.data.error === "Email already exists") {
                this.emailError = "อีเมลนี้มีอยู่ในระบบแล้ว";
              } else {
                this.emailError = "เกิดข้อผิดพลาดในการสมัครสมาชิก";
              }
            } else {
              console.error("Error submitting form:", error);
            }
          });
      } else {
      }
    },
  },
};
</script>

<style scoped></style>
