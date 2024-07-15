<template>
  <v-container class="my-16">
    <h1 class="text-portfolio-title mt-10">แก้ไขข้อมูลส่วนตัว</h1>
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
          <v-text-field
            label="Facebook"
            v-model="facebook"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Line" v-model="line" variant="outlined" />
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
        <v-col cols="12" md="6">
          <v-text-field
            label="New Password"
            v-model="password"
            :type="'password'"
            :rules="[rules.matchPassword]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Confirm New Password"
            v-model="confirmPassword"
            :type="'password'"
            :rules="[rules.matchPassword]"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" style="display: flex; justify-content: space-evenly">
          <v-btn :disabled="!valid" @click="submit">บันทึก</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const valid = ref(false);
const prefix = ref('');
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const facebook = ref('');
const line = ref('');
const address = ref('');
const province = ref(null);
const district = ref(null);
const subdistrict = ref(null);
const postalCode = ref(null);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const prefixOptions = ['นาย', 'นาง', 'นางสาว'];
const provinces = ref([]);
const districts = ref([]);
const subdistricts = ref([]);
const postalcodes = ref([]);

const rules = {
  required: (value) => !!value || 'จำเป็นต้องกรอก',
  email: (value) => /.+@.+\..+/.test(value) || 'อีเมลต้องถูกต้อง',
  phone: (value) => /^\d{10}$/.test(value) || 'หมายเลขโทรศัพท์ต้องเป็น 10 หลัก',
  matchPassword: (value) => !password.value || value === password.value || 'รหัสผ่านต้องตรงกัน',
};

const fetchProvinces = async () => {
  const url = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json';
  try {
    const response = await axios.get(url);
    provinces.value = response.data.map((province) => province.name_th);
  } catch (error) {
    console.error('Error fetching provinces:', error);
  }
};

const fetchDistricts = async () => {
  const url = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json';
  try {
    const response = await axios.get(url);
    districts.value = response.data.map((district) => district.name_th);
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

const fetchSubdistricts = async () => {
  const url = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json';
  try {
    const response = await axios.get(url);
    const subdistrictNames = new Set();
    response.data.forEach((subdistrict) => {
      subdistrictNames.add(subdistrict.name_th);
    });
    subdistricts.value = Array.from(subdistrictNames);
  } catch (error) {
    console.error('Error fetching subdistricts:', error);
  }
};

const fetchPostalcodes = async () => {
  const url = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json';
  try {
    const response = await axios.get(url);
    const uniquePostalCodes = [...new Set(response.data.map((postalcodes) => postalcodes.zip_code))];
    postalcodes.value = uniquePostalCodes;
  } catch (error) {
    console.error('Error fetching postalcodes:', error);
  }
};

const fetchUserProfile = async () => {
  const url = 'https://3hpsqzbj-5000.asse.devtunnels.ms/api/user/profile'; // Replace with actual endpoint
  try {
    const response = await axios.get(url);
    const data = response.data;
    prefix.value = data.prefix;
    firstName.value = data.first_name;
    lastName.value = data.last_name;
    phone.value = data.tel;
    facebook.value = data.facebook;
    line.value = data.line;
    address.value = data.address;
    province.value = data.province;
    district.value = data.district;
    subdistrict.value = data.subdistrict;
    postalCode.value = data.postal_code;
    email.value = data.email;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

onMounted(async () => {
  await fetchProvinces();
  await fetchDistricts();
  await fetchSubdistricts();
  await fetchPostalcodes();
  await fetchUserProfile();
});

const submit = async () => {
  if (valid.value) {
    const data = {
      email: email.value,
      password: password.value,
      tel: phone.value,
      first_name: firstName.value,
      last_name: lastName.value,
      username: `${firstName.value} ${lastName.value}`,
      address: address.value,
      facebook: facebook.value,
      line: line.value,
      province: province.value,
      district: district.value,
      subdistrict: subdistrict.value,
      postal_code: postalCode.value,
      prefix: prefix.value,
    };
    try {
      const response = await axios.post('https://3hpsqzbj-5000.asse.devtunnels.ms/api/user/update', data);
      console.log(response);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  } else {
    console.log('Form validation failed!');
  }
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
