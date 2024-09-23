import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    isAdmin: false,
  }),
  actions: {
    async login(email, password, router) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
        const { token, data } = response.data;
        localStorage.setItem("token", data.id);
        this.token = data;
        this.user = data;
        this.isAdmin = data.is_admin;

        setTimeout(() => {
          if (data.is_admin) {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }, 2000); 

        return { success: true };
      } catch (error) {
        let errorMessage = "เกิดข้อผิดพลาด";

        if (error.response) {
          const message = error.response.data.message;
          if (message === "Incorrect email") {
            errorMessage = "อีเมลไม่ถูกต้อง กรุณาตรวจสอบอีเมลของคุณ";
          } else if (message === "Incorrect password") {
            errorMessage = "รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่านของคุณ";
          } else {
            errorMessage = "การเข้าสู่ระบบล้มเหลว: " + message;
          }
        }
        return { success: false, message: errorMessage };
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.token = null;
      this.user = null;
      this.isAdmin = false;
    },
    isLoggedIn() {
      return !!this.token;
    },
    
  },
});
