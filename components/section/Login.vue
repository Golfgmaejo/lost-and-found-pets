<template>
  <v-container class="my-16">
    <h1 class="text-portfolio-title text-center my-6">เข้าสู่ระบบ</h1>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
      ><v-img
        class="mx-auto mb-8"
        max-width="228"
        max-height="48"
        src="~/public/images/logos/pets-logo.png"
      ></v-img>
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="username"
          :rules="[rules.required, rules.email]"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[rules.required]"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal"> </v-card>

        <v-btn
          class="mb-8"
          color="primary"
          size="large"
          @click="login()"
          variant="tonal"
          block
          :disabled="!valid"
        >
          Log In
        </v-btn>
      </v-form>
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/register"
          rel="noopener noreferrer"
          target="_blank"
        >
          สมัครสมาชิก <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import nuxtStorage from "nuxt-storage";

export default {
  data() {
    return {
      valid: false,
      visible: false,
      username: "",
      password: "",
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
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "https://3hpsqzbj-5000.asse.devtunnels.ms/api/login",
          {
            username: this.username,
            password: this.password,
          }
        );
        nuxtStorage.sessionStorage.setData(
          "session-token",
          response.data.data.id
        );
      } catch (error) {
        console.error(error);
        // Handle error, maybe show an error message to the user
      }
    },
    getSessionStorage() {
      const token = sessionStorage.getItem("session-token");
      console.log(token);
    },
  },
};
</script>
