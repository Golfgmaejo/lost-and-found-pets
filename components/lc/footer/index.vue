<template>
  <v-footer class="custom-footer">
    <v-container>
      <v-row class="py-6 py-sm-7">
        <v-col cols="12" md="6" sm="6" class="px-0">
          <div class="d-flex align-center">
            <LcLogoLogofooter />
            <p class="text-footer-h3">
              <span class="color-lost">Lost</span>
              <span class="color-and">And</span>
              <span class="color-foundpets">FoundPets</span>
            </p>
          </div>
          <p class="text-footer">
            ระบบช่วยตามหาสัตว์เลี้ยงหาย ที่ช่วยกระจายประกาศผ่านทางออนไลน์
          </p>
          <div class="social-icons mt-5">
            <a href="#">
              <i class="mdi mdi-facebook"></i>
            </a>
            <a href="#">
              <i class="mdi mdi-twitter"></i>
            </a>
            <a href="#">
              <i class="mdi mdi-google-plus"></i>
            </a>
            <a href="#">
              <i class="mdi mdi-youtube"></i>
            </a>
            <a href="#">
              <i class="mdi mdi-instagram"></i>
            </a>
          </div>
        </v-col>

        <v-col cols="12" md="3" sm="6" class="px-0">
          <h4 class="text-footer-h3">เมนูแนะนำ</h4>
          <div class="mt-2">
            <NuxtLink to="/" class="text-footer-menu no-underline">หน้าแรก</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/lost_pet" class="text-footer-menu no-underline">ประกาศสัตว์เลี้ยงหาย</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/adopt_pet" class="text-footer-menu no-underline">ประกาศหาบ้าน</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/find_owner" class="text-footer-menu no-underline">ประกาศหาเจ้าของ</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/product" class="text-footer-menu no-underline">สินค้า</NuxtLink>
          </div>
        </v-col>

        <v-col cols="12" md="3" sm="6" class="px-0">
          <h4 class="text-footer-h3">เกี่ยวกับเรา</h4>
          <div class="mt-2">
            <NuxtLink to="/article" class="text-footer-menu no-underline">บทความ</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/about" class="text-footer-menu no-underline">เกี่ยวกับเรา</NuxtLink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.text-footer-h3 {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.color-lost {
  color: #dd7b39;
}
.color-and {
  color: #5f534c;
}
.color-foundpets {
  color: #a9594c; /* สีเขียวสำหรับ Found */
}
.text-footer {
  font-family: "Prompt", sans-serif;
  color: #8d97ad;
  font-size: 14px;
  font-weight: 300;
}
.custom-footer {
  position: relative;
  background-position: bottom;
  background-repeat: no-repeat;
  background-image: url("/images/logos/footers-bg.png");
  width: 100%;
}
.social-icons {
  margin-top: 20px;
}
.social-icons a {
  margin-right: 10px;
  color: #8d97ad;
  font-size: 18px;
}
.social-icons a:hover {
  color: #582e2c;
}
.text-footer-menu {
  font-family: "Prompt", sans-serif;
  color: #8d97ad;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
  text-decoration: none;
}
.text-footer-menu:hover {
  color: #582e2c;
}
.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.py-6 {
  padding-top: 24px !important;
  padding-bottom: 24px !important;
}
.py-sm-7 {
  padding-top: 28px !important;
  padding-bottom: 28px !important;
}
</style>
