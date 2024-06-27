<template>
    <Gallery/>
    <v-container>
      <v-main>
        <v-container>
          <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="text-portfolio-title">เกี่ยวกับ</h2>
              <p class="text-portfolio">
                
              </p>
            </div>
          </v-col>
        </v-row>
          <v-row>
            <v-col cols="12">
              <v-timeline>
                <v-timeline-item
                  v-for="(event, index) in events"
                  :key="index"
                  :title="event.title"
                  :subtitle="event.date"
                >
                  <div v-html="event.description"></div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-container>
  
        <v-container>
          <v-row>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-img
                src="https://upload.wikimedia.org/wikipedia/th/thumb/b/b7/MJU_LOGO.svg/1200px-MJU_LOGO.svg.png"
                max-width="300"
                contain
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-img
                src="https://secretary-science.mju.ac.th/goverment/25570522101243_science_secretary/Logo_25630318164611_166727.png"
                max-width="300"
                contain
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-img
                src="http://csmju.jowave.com/newimages/csmju_logo.gif"
                max-width="300"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Gallery from "~/components/section/banner/Gallery.vue";
  
  const events = ref([
    {
      date: "ธันวาคม 2023",
      title: "เก็บรวบรวมข้อมูลสัตว์เลี้ยงที่หาย",
      description:
        "รวบรวมข้อมูลสัตว์เลี้ยงที่หาย ในทางอินเตอร์เน็ตต่างๆและวิธีการค้นหา และวิธีการรับเรื่องสัตว์เลี้ยงที่หาย",
    },
    {
      date: "มกราคม 2024",
      title: "เริ่มต้นพัฒนา",
      description:
        "เริ่มต้นพัฒนา LostAndFoundPets หลังจากที่มีเก็บรวบรวมข้อมูลสัตว์เลี้ยงที่หาย และเริ่มต้นพัฒนา LostAndFoundPets",
    },
    {
      date: "กุมภาพันธ์ 2024",
      title: "พัฒนาฟังก์ชั่นอื่นๆ",
      description:
        "ได้ปรับปรุงจุดด้อย และปัญหาของระบบที่พบ และพัฒนาต่อเนื่องจากคำแนะนำต่างๆ และมีฟังก์ชั่นใหม่ๆ ที่จะมาคอยช่วยเหลือ และอำนวยความสะดวกให้กับผู้ที่มีสัตว์เลี้ยง",
    },
    {
      date: "มีนาคม 2024",
      title: "พัฒนาฟังก์ชั่นอื่นๆ อย่างต่อเนื่อง",
      description:
        "พัฒนาฟังก์ชั่นอื่นๆ ให้ครอบคลุมมากยิ่งขึ้น และประสานกับผู้ให้บริการที่ดีขึ้น เพื่อรองรับข้อมูลที่เยอะขึ้น และเพิ่มความปลอดภัยของข้อมูลให้มากยิ่งขึ้น",
    },
  ]);
  </script>
  
  <style>
    .text-feature-h {
      font-family: "Prompt", sans-serif;
        color:#582E2C;
        font-size: 24px;
        font-weight: 700;
    }
    .text-feature {
      font-family: "Prompt", sans-serif;
        color:black;
        font-size: 18px;
        font-weight: 400;
    }
    .text {
      font-family: "Prompt", sans-serif;
        color: #777;
        font-size: 16px;
        font-weight: 400;
    }
    </style>
  