<script setup>
import { ref } from "vue";

const articles = ref([
  {
    title: "วิธีกำจัด เห็บหมัด ให้สัตว์เลี้ยงปลอดภัย",
    subtitle:
      "เห็บหมัด เป็นของอยู่คู่กับสัตว์เลี้ยงมานาน โดยเฉพาะสัตว์ขนเยอะ . . .",
    content: "รายละเอียดเกี่ยวกับวิธีกำจัดเห็บหมัด...",
    img: "/images/testimonial/เห็บหมัด-วิธีกำจัดเห็บหมัด.jpg",
  },
  {
    title: "รักษาเชื้อราแมว อย่างไรให้หายขาด ไม่กลับมาเป็นซ้ำอีก",
    subtitle: "การ รักษาเชื้อราแมว ให้หายดีแล้ว . . .",
    content: "รายละเอียดเกี่ยวกับการรักษาเชื้อราแมว...",
    img: "/images/testimonial/เชื้อราแมว.jpg",
  },
  {
    title: "เจ้าของต้องระวังโรคที่พบบ่อยในสุนัขสูงวัย",
    subtitle: "เจ้าของต้องระวังโรคที่พบได้บ่อยในสุนัขสูงวัย",
    content: "รายละเอียดเกี่ยวกับโรคที่พบบ่อยในสุนัขสูงวัย...",
    img: "/images/testimonial/สุนัขสูงวัย.jpg",
  },
  {
    title: "พยาธิศัตรูตัวร้ายของน้องหมา",
    subtitle: "“พยาธิ” ศัตรูตัวร้ายของน้องหมาอีกหนึ่งปัญหา",
    content: "รายละเอียดเกี่ยวกับพยาธิที่เป็นศัตรูของสุนัข...",
    img: "/images/testimonial/พยาธิศัตรูตัวร้ายของน้องหมา.png",
  },
  {
    title: "การดูแลสุขภาพช่องปากของสัตว์เลี้ยง",
    subtitle: "สุขภาพช่องปากเป็นสิ่งสำคัญที่ไม่ควรมองข้าม . . .",
    content: "รายละเอียดเกี่ยวกับการดูแลสุขภาพช่องปากของสัตว์เลี้ยง...",
    img: "https://www.vet4hospital.com/image/catalog/Article/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%B2%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%20(1).png",
  },
  {
    title: "อาหารที่ไม่ควรให้สัตว์เลี้ยงกิน",
    subtitle: "อาหารบางประเภทอาจเป็นอันตรายต่อสัตว์เลี้ยง . . .",
    content: "รายละเอียดเกี่ยวกับอาหารที่ไม่ควรให้สัตว์เลี้ยงกิน...",
    img: "https://static.wixstatic.com/media/3b7d39_6df2cf9ee1a241e99014134edf9cdf80~mv2.png/v1/crop/x_229,y_0,w_1506,h_1080/fill/w_524,h_412,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%81%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A.png",
  },
  {
    title: "วิธีการฝึกสัตว์เลี้ยงให้เชื่อฟัง",
    subtitle:
      "การฝึกสัตว์เลี้ยงให้เชื่อฟังต้องใช้ความอดทนและเทคนิคที่ถูกต้อง . . .",
    content: "รายละเอียดเกี่ยวกับวิธีการฝึกสัตว์เลี้ยง...",
    img: "https://www.osdco.net/images/communities/pet-tools/4-ways-train-dog6.jpg",
  },
  {
    title: "การเลือกซื้อของเล่นที่เหมาะสมสำหรับสัตว์เลี้ยง",
    subtitle:
      "ของเล่นที่เหมาะสมช่วยกระตุ้นพัฒนาการและลดความเครียดของสัตว์เลี้ยง . . .",
    content: "รายละเอียดเกี่ยวกับการเลือกซื้อของเล่นที่เหมาะสม...",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgiJ8nJApVaccDp0gG7ABmIPsnx1QIAgfkFA&s",
  },
]);

const dialog = ref(false);
const selectedArticle = ref({ title: "", content: "", img: "" });

const openDialog = (article) => {
  selectedArticle.value = article;
  dialog.value = true;
};
</script>

<template>
  <div>
    <div class="team-component mini-spacer">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="text-portfolio-title">บทความ</h2>
              <p class="text-portfolio">
                บทความเรื่องน่ารู้เกี่ยวกับสัตว์เลี้ยงให้ข้อมูลที่สำคัญเกี่ยวกับพฤติกรรม
                การฝึกฝน และความต้องการเฉพาะของสัตว์เลี้ยงแต่ละประเภท
                การเข้าใจสัตว์เลี้ยงอย่างลึกซึ้งช่วยสร้างความสัมพันธ์ที่แข็งแกร่งและเพิ่มคุณภาพชีวิตทั้งของสัตว์เลี้ยงและเจ้าของ.
              </p>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-13">
          <v-col
            v-for="article in articles"
            :key="article.title"
            cols="12"
            md="3"
            sm="6"
          >
            <v-card elevation="0" class="team-card mb-7">
              <div class="overflow-hidden">
                <img :src="article.img" class="img-fluid" />
              </div>
              <div>
                <h5 class="title">{{ article.title }}</h5>
                <p class="subtitle">{{ article.subtitle }}</p>
              </div>
              <a
                href="#"
                class="text-subtitle linking text-decoration-none d-flex align-center"
                style="margin-top: 12px"
                @click.prevent="openDialog(article)"
              >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
              </a>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-img :src="selectedArticle.img" aspect-ratio="2.75"></v-img>
        <v-card-title>{{ selectedArticle.title }}</v-card-title>
        <v-card-text>{{ selectedArticle.content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.title {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 16px;
  font-weight: 500;
}
.subtitle {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 14px;
  font-weight: 400;
}
.text-subtitle {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 14px;
  font-weight: 400;
}
</style>
