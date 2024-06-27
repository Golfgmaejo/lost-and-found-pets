<template>
  <!-- -----------------------------------------------
        Start Footer
  ----------------------------------------------- -->
  <v-footer class="style-footer">
    <v-container>
      <v-row class="py-6 py-sm-7 ">
        <v-col cols="12" md="6" sm="6" class="px-xs-0">
          <div class="d-flex">
            <LcLogoFooterPets />
            <!-- <LcLogoPetsCatDog /> -->
          </div>
          <p class="text-footer-h3">LostAndFoundPets</p>
          <p class="text-footer">ระบบช่วยตามหาสัตว์เลี้ยงหาย ที่ช่วยกระจายประกาศผ่านทางออนไลน์</p>
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

        <v-col cols="12" md="3" sm="6" class="px-xs-0">
          <h4 class="text-footer-h3">เมนูแนะนำ</h4>
          <div class="mt-5">
            <NuxtLink to="/" class="mt-5 text-footer-menu">หน้าเเรก</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/notice" class="text-footer-menu">ประกาศสัตว์เลี้ยงหาย</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/adoptpet" class="text-footer-menu">ประกาศหาบ้าน</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/findowner" class="text-footer-menu">ประกาศหาเจ้าของ</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/product" class="text-footer-menu">สินค้า</NuxtLink>
          </div>
          <!-- <p class="mt-5 text-footer-menu" to="/">หน้าเเรก</p>
          <p class="text-footer-menu">ประกาศสัตว์เลี้ยงหาย</p>
          <p class="text-footer-menu">ประกาศหาบ้าน</p>
          <p class="text-footer-menu">ประกาศหาเจ้าของ</p>
          <p class="text-footer-menu">สินค้า</p> -->
        </v-col>

        <v-col cols="12" md="3" sm="6" class="px-xs-0">
          <h4 class="text-footer-h3">เกี่ยวกับเรา</h4>
          <div class="mt-2">
            <NuxtLink to="/article" class="text-footer-menu">บทความ</NuxtLink>
          </div>
          <div class="mt-2">
            <NuxtLink to="/about" class="text-footer-menu">เกี่ยวกับเรา</NuxtLink>
          </div>
          <!-- <p class="mt-5 text-footer-menu">บทความ</p>
          <p class="text-footer-menu">เกี่ยวกับเรา</p> -->
         
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style>
  .text-footer-h3{
    font-family: "Prompt", sans-serif;
    color:#794940;
    font-size: 20px;
    font-weight: 600;
  }
  .text-footer{
    font-family: "Prompt", sans-serif;
    color:#8d97ad;
    font-size: 14px;
    font-weight: 300;
  }
  .style-footer {
    /* background-color: #f4f8fa; */
    position: relative;
    background-position: bottom;
    /* padding-top: 90px; */
    background-repeat: no-repeat;
    background-image: url('/images/logos/footers-pets.png');
    /* top: 20px; */
    width: 100%;
  }
  .text-footer-menu {
    font-family: "Prompt", sans-serif;
    color:#8d97ad ;
    font-size: 16px;
    font-weight: 400;
    margin: 6px;
  }
</style>
