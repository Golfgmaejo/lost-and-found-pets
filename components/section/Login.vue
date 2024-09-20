<template>
  <v-container class="my-16">
    <h1 class="text-portfolio-title text-center my-6">เข้าสู่ระบบ</h1>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-img class="mx-auto mb-8" max-width="228" max-height="48" src="~/public/images/logos/pets-logo.png"></v-img>

      <v-alert v-if="alert.show" :type="alert.type" dense prominent dismissible @click:close="alert.show = false" class="mb-4">
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

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
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

        <v-btn class="mb-8" color="primary" size="large" @click="login" variant="tonal" block :disabled="!valid">เข้าสู่ระบบ</v-btn>
      </v-form>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer" target="_blank">สมัครสมาชิก <v-icon icon="mdi-chevron-right"></v-icon></a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { useRouter } from 'vue-router'; // เพิ่มการใช้ useRouter

const authStore = useAuthStore();
const router = useRouter(); // เรียก useRouter ที่นี่
const email = ref('');
const password = ref('');
const visible = ref(false);
const valid = ref(false);
const alert = ref({ show: false, message: '', type: 'info' });

const rules = {
  required: (value) => !!value || "จำเป็นต้องกรอก",
  email: (value) => /.+@.+\..+/.test(value) || "อีเมลต้องถูกต้อง",
};

const login = async () => {
  if (valid.value) {
    const result = await authStore.login(email.value, password.value, router); // ส่ง router เข้าไปด้วย
    if (!result.success) {
      alert.value = { show: true, message: result.message, type: 'error' };
    } else {
      alert.value = { show: true, message: "เข้าสู่ระบบสำเร็จ!", type: "success" };
    }
  } else {
    alert.value = { show: true, message: "กรุณากรอกข้อมูลที่จำเป็นทั้งหมดให้ครบถ้วน", type: "warning" };
  }
};
</script>

