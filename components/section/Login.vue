<template>
  <v-container>
    <h1 class="text-portfolio-title text-center my-6">เข้าสู่ระบบ</h1>
    <v-card
      class="text-form mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-img
        class="mx-auto mb-8"
        max-width="228"
        max-height="48"
        src="~/public/images/logos/Lafplogotext.png"
      ></v-img>

      <div>E-mail</div>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          density="compact"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div>Password</div>
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
          >เข้าสู่ระบบ</v-btn
        >
      </v-form>

      <v-card-text class="text-center">
        <p class="text-portfolio">ยังไม่มีบัญชีผู้ใช้?</p>
        <a
          class="text-blue text-decoration-none"
          href="/register"
          rel="noopener noreferrer"
        >
          สมัครสมาชิก <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const visible = ref(false);
const valid = ref(false);
const autoCloseTime = ref(2000);

const rules = {
  required: (value) => !!value || "จำเป็นต้องกรอก",
  email: (value) => /.+@.+\..+/.test(value) || "อีเมลต้องถูกต้อง",
};

const login = async () => {
  if (valid.value) {
    const result = await authStore.login(email.value, password.value, router);
    if (!result.success) {
      toast.error(result.message, { autoClose: autoCloseTime.value });
    } else {
      toast.success("เข้าสู่ระบบสำเร็จ!", { autoClose: autoCloseTime.value });
    }
  } else {
    toast.warning("กรุณากรอกข้อมูลที่จำเป็นทั้งหมดให้ครบถ้วน", {
      autoClose: autoCloseTime.value,
    });
  }
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
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 16px;
  font-weight: 400;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
