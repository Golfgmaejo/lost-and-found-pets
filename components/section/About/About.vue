<template>
  <v-container style="margin-top: 95px">
    <v-row>
      <v-col style="display: flex">
        <v-img
          :width="1050"
          aspect-ratio="16/9"
          cover
          src="/images/pets/เกี่ยวกับเรา.png"
          class="rounded-img"
          style="border: 10px solid rgba(233, 121, 49, 0.1)"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div style="display: flex; align-items: center">
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
          <span
            class="text-title-lost"
            style="padding: 0 10px; font-weight: bold"
            >เกี่ยวกับเรา</span
          >
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-img
          :width="1050"
          aspect-ratio="16/9"
          cover
          src="/images/pets/1000_F_791833024_4mGbPYehVszWj8FIBIPCv6PpSNLxiCqW.jpg"
          class="rounded-img"
          style="border: 10px solid rgba(233, 121, 49, 0.1)"
        ></v-img>
      </v-col>
      <v-col cols="12" lg="6">
        <div class="mt-12">
          <div class="subtitle" style="text-align: justify; margin-top: 30px">
            &nbsp;&nbsp;&nbsp;&nbsp;LostAndFoundPets
            เป็นระบบที่ถูกพัฒนาขึ้นเพื่อช่วยเหลือเจ้าของสัตว์เลี้ยงที่ประสบปัญหาสัตว์เลี้ยงสูญหาย
            ด้วยความตั้งใจที่จะสร้างช่องทางที่สะดวกและรวดเร็วในการค้นหาและรายงานสัตว์เลี้ยงที่หายไป
            เราได้รวบรวมข้อมูลจากหลายแหล่งเพื่อให้บริการที่ครอบคลุมและช่วยเพิ่มโอกาสในการตามหาสัตว์เลี้ยงได้อย่างมีประสิทธิภาพ
          </div>
          <v-divider
            class="border-opacity-100"
            :thickness="1"
            color="#d69d6b"
            style="margin-bottom: 16px; margin-top: 16px"
          ></v-divider>

          <div class="subtitle" style="text-align: justify; margin-top: 12px">
            &nbsp;&nbsp;&nbsp;&nbsp; จุดเริ่มต้นของ LostAndFoundPets
            มาจากความต้องการที่จะช่วยเหลือเจ้าของสัตว์เลี้ยงที่ต้องเผชิญกับสถานการณ์ที่ตึงเครียดเมื่อต้องตามหาสัตว์เลี้ยงหาย
            ข้อมูลจากอินเทอร์เน็ตและการแจ้งหายของสัตว์เลี้ยงที่กระจัดกระจายอยู่หลายแหล่ง
            ถูกนำมารวมกันในแพลตฟอร์มนี้เพื่อให้ผู้ใช้งานสามารถค้นหาได้ในที่เดียว
            ทำให้การตามหาสัตว์เลี้ยงง่ายขึ้นและประหยัดเวลา
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col cols="12" lg="6">
        <div class="subtitle" style="text-align: justify">
          &nbsp;&nbsp;&nbsp;&nbsp;เราไม่เพียงแค่รวบรวมข้อมูลเท่านั้น
          แต่ยังคงมุ่งมั่นในการพัฒนาระบบให้ดีขึ้นอย่างต่อเนื่อง
          เรารับฟังความคิดเห็นและข้อเสนอแนะจากผู้ใช้งานเพื่อนำมาปรับปรุงฟังก์ชันต่างๆ
          อย่างสม่ำเสมอ โดยเป้าหมายของเราคือการสร้างแพลตฟอร์มที่ใช้งานง่าย สะดวก
          ปลอดภัย และตอบโจทย์ความต้องการของผู้ใช้งานให้ได้มากที่สุด
        </div>
        <v-divider
          class="border-opacity-100"
          :thickness="1"
          color="#d69d6b"
          style="margin-bottom: 16px; margin-top: 16px"
        ></v-divider>
        <div class="subtitle">
          &nbsp;&nbsp;&nbsp;&nbsp; ในอนาคต LostAndFoundPets
          จะยังคงพัฒนาและเพิ่มฟังก์ชันใหม่ๆ
          ที่สามารถช่วยเจ้าของสัตว์เลี้ยงได้อย่างเต็มที่
          รวมถึงการเพิ่มความปลอดภัยและความน่าเชื่อถือของระบบ
          เพื่อรองรับผู้ใช้งานที่เพิ่มขึ้นและทำให้การตามหาสัตว์เลี้ยงหายเป็นเรื่องง่ายและมีประสิทธิภาพมากยิ่งขึ้น
        </div>
      </v-col>
      <v-col cols="12" lg="6">
        <v-img
          :width="1050"
          :height="280"
          aspect-ratio="16/9"
          cover
          src="/images/pets/1000_F_924067585_pkFJhM7gfeMF8OETJRWTQ50roAXqxfIy.jpg"
          class="rounded-img"
          style="border: 10px solid rgba(233, 121, 49, 0.1)"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col>
        <div style="display: flex; align-items: center">
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
          <span
            class="text-title-lost"
            style="padding: 0 10px; font-weight: bold"
            >ผู้สนับสนุน</span
          >
          <div
            style="flex-grow: 2; height: 2px; background-color: #b4511a"
          ></div>
        </div>
      </v-col>
    </v-row>
     <v-row class="mt-10">
        <v-col cols="12" md="4" class="d-flex justify-center">
          <div class="div-1">
            <div class="div-img-1">
              <v-img
            src="https://upload.wikimedia.org/wikipedia/th/thumb/b/b7/MJU_LOGO.svg/1200px-MJU_LOGO.svg.png"
            max-width="300"
            class="image-shadow"
            contain
          />
            </div>
            <div class="div-text-1">
              มหาวิทยาลัยแม่โจ้
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <div class="div-1">
            <div class="div-img-1">
              <v-img
            src="https://secretary-science.mju.ac.th/goverment/25570522101243_science_secretary/Logo_25630318164611_166727.png"
            max-width="300"
            class="image-shadow"
            contain
          />
            </div>
            <div class="div-text-1">
              คณะวิทยาศาสตร์
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <div class="div-1">
            <div class="div-img-1">
              <v-img
            src="http://csmju.jowave.com/newimages/csmju_logo.gif"
            max-width="300"
            height="300px"
            class="image-shadow"
            contain
          />
            </div>
            <div class="div-text-1">
              สาขาวิทยาการคอมพิวเตอร์
            </div>
          </div>
        </v-col>
      </v-row>
  </v-container>
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
  font-size: 28px;
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

/* .image-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
} */
.text-title-lost {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
}
.subtitle {
  font-family: "Prompt", sans-serif;
  color: #472e20;
  font-size: 18px;
  font-weight: 500;
}
.subtitle-1 {
  font-family: "Prompt", sans-serif;
  color: #2b1c14;
  font-size: 26px;
  font-weight: 700;
}
.div-1 {
  background-color: #ffffff;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}
.div-img-1 {
width: 300px;
height: 300px;
}
.div-text-1 {
  font-family: "Prompt", sans-serif;
  color: #2b1c14;
  font-size: 22px;
  font-weight: 500;
  margin-top: 14px;
  display: flex;
  justify-content: center;
}
</style>
