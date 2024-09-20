<template>
  <v-main>
    <Gallery />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="text-portfolio-title">เกี่ยวกับเรา</h2>
            <p class="text-portfolio">
              ระบบ LostAndFoundPets ถูกพัฒนาขึ้นเพื่อช่วยเหลือเจ้าของสัตว์เลี้ยงที่สัตว์เลี้ยงหาย โดยมีข้อมูลที่รวบรวมจากหลายแหล่งเพื่อให้สามารถค้นหาและรายงานสัตว์เลี้ยงที่หายได้สะดวกยิ่งขึ้น
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
              color="orange"
              fill-dot
            >
              <div v-html="event.description"></div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <!-- Image Section -->
      <v-row class="mt-10">
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/th/thumb/b/b7/MJU_LOGO.svg/1200px-MJU_LOGO.svg.png"
            max-width="300"
            class="image-shadow"
            contain
          />
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-img
            src="https://secretary-science.mju.ac.th/goverment/25570522101243_science_secretary/Logo_25630318164611_166727.png"
            max-width="300"
            class="image-shadow"
            contain
          />
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-img
            src="http://csmju.jowave.com/newimages/csmju_logo.gif"
            max-width="300"
            class="image-shadow"
            contain
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Gallery from "~/components/section/Home/Gallery.vue";

export default {
  components: {
    Gallery,
  },
  data() {
    return {
      events: [
        {
          date: "ธันวาคม 2023",
          title: "เก็บรวบรวมข้อมูลสัตว์เลี้ยงที่หาย",
          description:
            "รวบรวมข้อมูลสัตว์เลี้ยงที่หายจากอินเตอร์เน็ตหลายแหล่งและวิธีการรับแจ้งสัตว์เลี้ยงที่หาย",
        },
        {
          date: "มกราคม 2024",
          title: "เริ่มต้นพัฒนา",
          description:
            "เริ่มต้นพัฒนา LostAndFoundPets จากข้อมูลที่รวบรวมมา เพื่อช่วยเหลือเจ้าของสัตว์เลี้ยง",
        },
        {
          date: "กุมภาพันธ์ 2024",
          title: "พัฒนาฟังก์ชั่นอื่นๆ",
          description:
            "ปรับปรุงระบบและเพิ่มฟังก์ชันใหม่ๆ เพื่อตอบโจทย์ความต้องการของผู้ใช้งาน",
        },
        {
          date: "มีนาคม 2024",
          title: "พัฒนาระบบเพิ่มเติม",
          description:
            "เพิ่มฟังก์ชันใหม่ๆ และปรับปรุงความปลอดภัยของระบบเพื่อรองรับการใช้งานในอนาคต",
        },
      ],
    };
  },
};
</script>

<style scoped>
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-bottom: 20px;
}

.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #444;
  font-size: 18px;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.v-timeline-item {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.3s ease;
}

.v-timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
