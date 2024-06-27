<template>
    <v-container class="my-16">
      <h1 class="text-portfolio-title mt-10">สมัครสมาชิก</h1>
      <h5 class="mt-2">
        กรุณากรอกข้อมูลที่ใช้งานจริง เพื่อความสะดวกในกรณีที่ต้องมีการติดต่อ
        และการประกาศช่วยตามหา
      </h5>
      <v-form v-model="valid" ref="form" class="my-5">
        <h5 class="text-red">
          *ข้อมูลจะถูกเปิดเผยกรณีที่อนุญาติให้ติดต่อในการลงประกาศ
        </h5>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="คำนำหน้า"
              v-model="prefix"
              :items="prefixOptions"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="ชื่อจริง"
              v-model="firstName"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="นามสกุล"
              v-model="lastName"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="เบอร์โทรศัพท์"
              v-model="phone"
              :rules="[rules.required, rules.phone]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Facebook" v-model="facebook" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Line" v-model="line" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="ที่อยู่"
              v-model="address"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              label="จังหวัด"
              v-model="province"
              :items="provinces"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              label="อำเภอ"
              v-model="district"
              :items="districts"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              label="ตำบล"
              v-model="subdistrict"
              :items="subdistricts"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              label="รหัสไปรษณีย์"
              v-model="postalCode"
              :items="postalcodes"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col md="6"></v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Email address"
              v-model="email"
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Password"
              v-model="password"
              :type="'password'"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Confirm password"
              v-model="confirmPassword"
              :type="'password'"
              :rules="[rules.required, rules.matchPassword]"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="agree"
              :rules="[rules.requiredAgreement]"
              label="ฉันเห็นด้วยกับข้อกำหนดและเงื่อนไข"
            />
          </v-col>
          <v-col cols="12">
            <v-btn :disabled="!valid" @click="submit">สมัครสมาชิก</v-btn>
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
        valid: false,
        prefix: "",
        firstName: "",
        lastName: "",
        phone: "",
        facebook: "",
        line: "",
        address: "",
        province: null,
        district: null,
        subdistrict: null,
        postalCode: null,
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
        prefixOptions: ["นาย", "นาง", "นางสาว"],
        provinces: [], // This should be filled with the list of provinces
        districts: [], // This will be filled based on selected province
        subdistricts: [], // This will be filled based on selected district
        postalcodes: [], // This will be filled based on selected subdistrict
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
      this.fetchProvinces(); // Fetch provinces when component is created
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
            ...new Set(response.data.map((postalcodes) => postalcodes.zip_code))
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
            email: this.email,
            password: this.password,
            tel: this.phone,
            first_name:this.firstName,
            last_name :this.lastName,
            username: this.firstName + " " + this.lastName,
            address: this.address,
            facebook: this.facebook,
            line : this.line,
            province: this.province,
            district: this.district,
            subdistrict: this.subdistrict,
            postal_code: this.postalCode,
            prefix: this.prefix
          };          
          axios.post('https://3hpsqzbj-5000.asse.devtunnels.ms/api/user/create',data).then((response) => {
            console.log(response);
          });
          
          
          console.log("Form submitted!");
        } else {
          console.log("Form validation failed!");
        }
      },
  
     
    },
  };
  </script>
  
  <style scoped></style>
  