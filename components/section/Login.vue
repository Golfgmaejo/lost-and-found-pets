<template>
  <v-container class="my-16">
    <h1 class="text-portfolio-title text-center my-6">เข้าสู่ระบบ</h1>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-img
        class="mx-auto mb-8"
        max-width="228"
        max-height="48"
        src="~/public/images/logos/pets-logo.png"
      ></v-img>

      <!-- v-alert for login feedback -->
      <v-alert
        v-if="alert.show"
        :type="alert.type"
        dense
        prominent
        dismissible
        @click:close="alert.show = false"
        class="mb-4"
      >
        {{ alert.message }}
      </v-alert>

      <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          density="compact"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>
        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[rules.required]"
          density="compact"
          placeholder="Password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="primary"
          size="large"
          @click="login"
          variant="tonal"
          block
          :disabled="!valid"
        >
          เข้าสู่ระบบ
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

export default {
  data() {
    return {
      valid: false,
      visible: false,
      email: "",
      password: "",
      alert: {
        show: false,
        message: "",
        type: "info", // can be 'success', 'error', 'info', 'warning'
      },
      rules: {
        required: (value) => !!value || "จำเป็นต้องกรอก",
        email: (value) => /.+@.+\..+/.test(value) || "อีเมลต้องถูกต้อง",
      },
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post("http://localhost:5000/api/login", {
            email: this.email,
            password: this.password,
          });
          const { token, data } = response.data;
          
          // Store token in local storage
          localStorage.setItem('token', token);
          
          // Redirect based on is_admin
          if (data.is_admin) {
            this.$router.push('/admin');
          } else {
            this.$router.push('/user');
          }
          
          // Display success alert
          this.alert = {
            show: true,
            message: "เข้าสู่ระบบสำเร็จ!",
            type: "success",
          };
        } catch (error) {
          if (error.response) {
            const message = error.response.data.message;
            
            // Handle different error cases
            if (message === "Incorrect email") {
              this.alert = {
                show: true,
                message: "อีเมลไม่ถูกต้อง กรุณาตรวจสอบอีเมลของคุณ",
                type: "error",
              };
            } else if (message === "Incorrect password") {
              this.alert = {
                show: true,
                message: "รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่านของคุณ",
                type: "error",
              };
            } else {
              this.alert = {
                show: true,
                message: "การเข้าสู่ระบบล้มเหลว: " + message,
                type: "error",
              };
            }
          } else {
            // Handle network or unexpected errors
            this.alert = {
              show: true,
              message: "เกิดข้อผิดพลาด: " + error.message,
              type: "error",
            };
          }
        }
      } else {
        // Form validation error
        this.alert = {
          show: true,
          message: "กรุณากรอกข้อมูลที่จำเป็นทั้งหมดให้ครบถ้วน",
          type: "warning",
        };
      }
    },
  },
};
</script>

