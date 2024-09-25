<template>
  <v-container>
    <h1 class="text-portfolio-title">แก้ไขข้อมูลส่วนตัว</h1>
    <h5 class="text-portfolio">
      ข้อมูลจะถูกเปิดเผยกรณีที่อนุญาติให้ติดต่อในการลงประกาศ
      โปรดกรอกข้อมูลที่ใช้งานจริง เพื่อความสะดวกในกรณีที่ต้องมีการติดต่อ
      และการประกาศช่วยตามหา
    </h5>
    <h5 class="text-red">*กรุณากรอก</h5>

    <v-form v-model="valid" ref="form" class="text-form my-5">
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            คำนำหน้า&nbsp;<span class="text-red">*</span>
          </div>
          <v-select
            placeholder="คำนำหน้า"
            v-model="form.prefix"
            :items="prefixOptions"
            :rules="[rules.required]"
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            เบอร์โทรศัพท์&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            placeholder="เบอร์โทรศัพท์"
            v-model="form.phone"
            :rules="[rules.required, rules.phone]"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <V-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            ชื่อ&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            placeholder="ชื่อจริง"
            v-model="form.first_name"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            นามสกุล&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            placeholder="นามสกุล"
            v-model="form.last_name"
            :rules="[rules.required]"
            variant="outlined"
          /> </v-col
      ></V-row>
      <v-row
        ><v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            Facebook
          </div>
          <v-text-field
            placeholder="Facebook"
            v-model="form.Facebook"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 mb-2">
            Line ID
          </div>
          <v-text-field
            placeholder="Line ID"
            v-model="form.Line_id"
            variant="outlined"
          /> </v-col
      ></v-row>
      <v-row
        ><v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            ที่อยู่&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            placeholder="ที่อยู่"
            v-model="form.address"
            :rules="[rules.required]"
            variant="outlined"
          /> </v-col
      ></v-row>

      <v-row>
        <v-col cols="12" md="4">
          <div class="text-subtitle-1 mb-2">
            จังหวัด&nbsp;<span class="text-red">*</span>
          </div>
          <v-autocomplete
            placeholder="จังหวัด"
            v-model="form.province"
            :items="provinces"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-subtitle-1 mb-2">
            อำเภอ&nbsp;<span class="text-red">*</span>
          </div>
          <v-autocomplete
            placeholder="อำเภอ"
            v-model="form.district"
            :items="districts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-subtitle-1 mb-2">
            ตำบล&nbsp;<span class="text-red">*</span>
          </div>
          <v-autocomplete
            placeholder="ตำบล"
            v-model="form.subdistrict"
            :items="subdistricts"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-subtitle-1 mb-2">
            รหัสไปรษณีย์&nbsp;<span class="text-red">*</span>
          </div>
          <v-autocomplete
            placeholder="รหัสไปรษณีย์"
            v-model="form.postal_code"
            :items="postalcodes"
            :rules="[rules.required]"
            variant="outlined"
          ></v-autocomplete> </v-col
      ></v-row>

      <v-row
        ><v-col cols="12">
          <div class="text-subtitle-1 mb-2">
            Email address&nbsp;<span class="text-red">*</span>
          </div>
          <v-text-field
            placeholder="Email address"
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            disabled
          />
        </v-col>
      </v-row>

      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="primary" :disabled="!valid" @click="updateUser"
          >บันทึกข้อมูล</v-btn
        >
        <v-btn color="secondary" class="ml-4" @click="confirmResetForm"
          >คืนค่าข้อมูล</v-btn
        >
      </v-col>
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  props: {
    userData: Object,
  },
  data() {
    return {
      autoCloseTime: 3000,
      valid: false,
      form: this.userData
        ? { ...this.userData }
        : {
            prefix: null,
            first_name: "",
            last_name: "",
            phone: "",
            Facebook: "",
            Line_id: "",
            address: "",
            province: null,
            district: null,
            subdistrict: null,
            postal_code: null,
            email: "",
          },
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
        passwordComplexity: (value) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.#^+\-=])[A-Za-z\d@$!%*?&_.#^+\-=]{8,}$/;
          return (
            regex.test(value) ||
            "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร มีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ"
          );
        },
        matchPassword: (value) =>
          value === this.password || "รหัสผ่านต้องตรงกัน",
      },
    };
  },
  watch: {
    userData(newData) {
      this.form = newData ? { ...newData } : {};
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
    async updateUser() {
      this.$refs.form.validate();
      if (this.valid) {
        try {
          await axios.put(
            `http://localhost:5000/api/user/update_user/${this.userData.id}`,
            this.form
          );
          toast.success("อัปเดตข้อมูลผู้ใช้สำเร็จ", {
            autoClose: this.autoCloseTime,
          });
          this.$emit("updateuser");
        } catch (error) {
          console.error("Error updating user:", error);
          toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", {
            autoClose: this.autoCloseTime,
          });
        }
      } else {
        toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน", {
          autoClose: this.autoCloseTime,
        });
      }
    },
    confirmResetForm() {
      if (confirm("คุณแน่ใจที่จะคืนค่าข้อมูลหรือไม่?")) {
        this.form = this.userData ? { ...this.userData } : {};
      }
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
  font-size: 15.9px;
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
