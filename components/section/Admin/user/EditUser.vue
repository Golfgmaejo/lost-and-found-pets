<template>
  <v-container>
    <h1 class="text-portfolio-title">แก้ไขข้อมูลส่วนตัว</h1>
    <h5 class="mt-2">
      กรุณากรอกข้อมูลที่ใช้งานจริง เพื่อความสะดวกในกรณีที่ต้องมีการติดต่อ
    </h5>
    <v-form v-model="valid" ref="form" class="my-5">
      <v-row>
        <v-col cols="12" md="12">
          <v-select
            label="คำนำหน้า"
            v-model="prefix"
            :items="prefixOptions"
            :rules="[rules.required]"
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="ชื่อจริง"
            v-model="firstName"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="นามสกุล"
            v-model="lastName"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="เบอร์โทรศัพท์"
            v-model="phone"
            :rules="[rules.required, rules.phone]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Facebook" v-model="facebook" variant="outlined" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Line ID" v-model="lineId" variant="outlined" />
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="ที่อยู่"
            v-model="address"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="จังหวัด"
            v-model="province"
            :items="provinces"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="อำเภอ"
            v-model="district"
            :items="districts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="ตำบล"
            v-model="subdistrict"
            :items="subdistricts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="รหัสไปรษณีย์"
            v-model="postalCode"
            :items="postalcodes"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Email address"
            v-model="email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            disabled
          />
        </v-col>

        <v-col cols="12" style="display: flex; justify-content: space-evenly">
          <v-btn color="primary" :disabled="!valid" @click="updateUser">บันทึกข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    userData: Object,
  },
  data() {
    return {
      valid: false,
      prefix: "",
      firstName: "",
      lastName: "",
      phone: "",
      facebook: "",
      lineId: "",
      address: "",
      province: null,
      district: null,
      subdistrict: null,
      postalCode: null,
      email: "",
      prefixOptions: ["นาย", "นาง", "นางสาว"],
      provinces: [],
      districts: [],
      subdistricts: [],
      postalcodes: [],
      rules: {
        required: (value) => !!value || "จำเป็นต้องกรอก",
        email: (value) => /.+@.+\..+/.test(value) || "อีเมลต้องถูกต้อง",
        phone: (value) =>
          /^\d{10}$/.test(value) || "หมายเลขโทรศัพท์ต้องเป็น 10 หลัก",
      },
    };
  },
  watch: {
    userData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.prefix = newVal.prefix;
          this.firstName = newVal.first_name;
          this.lastName = newVal.last_name;
          this.phone = newVal.phone;
          this.facebook = newVal.facebook || "";
          this.lineId = newVal.line_id || "";
          this.address = newVal.address;
          this.province = newVal.province;
          this.district = newVal.district;
          this.subdistrict = newVal.subdistrict;
          this.postalCode = newVal.postal_code;
          this.email = newVal.email;
        }
      },
    },
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
    updateUser() {
      if (this.$refs.form.validate()) {
        const data = {
          prefix: this.prefix,
          first_name: this.firstName,
          last_name: this.lastName,
          phone: this.phone,
          facebook: this.facebook || "",
          line_id: this.lineId || "",
          address: this.address,
          province: this.province,
          district: this.district,
          subdistrict: this.subdistrict,
          postal_code: this.postalCode,
        };
        const userId = this.$route.params.id;
        axios
          .put(`http://localhost:5000/api/user/update_user/${userId}`, data)
          .then((response) => {
            console.log("User updated successfully!", response);
            this.$emit('updateuser');
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        console.log("Form validation failed!");
      }
    },
  },
};
</script>
