<template>
  <div class="bg-color">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="text-portfolio-title">บทความ</h2>
            <p class="text-portfolio">
              บทความเรื่องน่ารู้เกี่ยวกับสัตว์เลี้ยงให้ข้อมูลที่สำคัญเกี่ยวกับพฤติกรรม
              การฝึกฝน และความต้องการเฉพาะของสัตว์เลี้ยงแต่ละประเภท
              การเข้าใจสัตว์เลี้ยงอย่างลึกซึ้งช่วยสร้างความสัมพันธ์ที่แข็งแกร่งและเพิ่มคุณภาพชีวิตทั้งของสัตว์เลี้ยงและเจ้าของ
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row style="justify-content: flex-end; margin-top: 0px">
        <v-col style="display: flex; justify-content: flex-end">
          <v-btn
            class="btn-view-all"
            color="#fedc8b"
            to="/article"
            size="small"
          >
            ดูเพิ่มเติม
          </v-btn>
        </v-col>
        <v-divider class="border-opacity-100" color="#E0E0E0"></v-divider>
      </v-row>
      <v-row class="mt-13">
        <v-col
          v-for="article in displayedArticles"
          :key="article.id"
          cols="12"
          md="3"
          sm="6"
        >
          <v-card width="280px" elevation="0" class="team-card mb-7">
            <div class="overflow-hidden card-image-wrapper">
              <img :src="article.image_url" class="img-fluid card-image" />
            </div>
            <div class="card-content">
              <h5 class="title">{{ formatName(article.name) }}</h5>
              <p class="subtitle">{{ formatDetails(article.details) }}</p>
              <p class="subtitle">
              เเหล่งอ้างอิง : {{ formatReference(article.reference ? article.reference : '-') }}
            </p>
            </div>
            <div style="margin-left: 12px">
              <a
                :href="article.link"
                class="text-subtitle linking text-decoration-none d-flex align-center"
                style="margin-top: 12px"
              >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
              </a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    displayedArticles() {
      return this.articles.slice(0, 4);
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    parseTimestamp(timestamp) {
      if (
        timestamp &&
        typeof timestamp === "object" &&
        "seconds" in timestamp
      ) {
        return new Date(
          timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
        );
      }
      console.error("Invalid timestamp:", timestamp);
      return new Date(0);
    },
    async fetchArticles() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/article/getAll_article"
        );
        this.articles = response.data.data;
        this.articles = response.data.data.sort((a, b) => {
          const dateA = this.parseTimestamp(a.created_at);
          const dateB = this.parseTimestamp(b.created_at);
          return dateB - dateA;
        });
      } catch (error) {
        console.error("Error fetching article list:", error);
      }
    },
    formatName(name) {
      return name.length > 30 ? name.slice(0, 30) + "..." : name;
    },
    formatDetails(details) {
      return details.length > 35 ? details.slice(0, 35) + "..." : details;
    },
    formatReference(reference) {
      return reference.length > 20 ? reference.slice(0, 20) + "..." : reference;
    },
  },
};
</script>

<style scoped>
.bg-color {
  background-color: #f9f5ef;
}
.text-portfolio-title {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.text-portfolio {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 18px;
  font-weight: 400;
}
.text-feature {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  color: #fff;
  text-transform: none;
  background-color: #e97931;
  transition: background-color 0.3s ease;
}
.text-feature:hover {
  background-color: #d16828;
}
.title {
  font-family: "Prompt", sans-serif;
  color: #e97931;
  font-size: 16px;
  font-weight: 600;
}
.subtitle {
  font-family: "Prompt", sans-serif;
  color: #777;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-subtitle {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 16px;
  font-weight: 500;
}
.card-image-wrapper {
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px;
}
.card-image {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.card-image:hover {
  transform: scale(1.1);
}
.card-content {
  margin-top: 10px;
  margin-left: 10px;
}
.team-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.text-title-lost {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
}
.team-card {
  background-color: #fff7f3;
  border-radius: 16px;
  border: 4px solid rgba(233, 121, 49, 0.1);
  padding: 2px;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}
.btn-view-all {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  color: #582e2c !important;
  height: 35px !important;
  font-weight: 500;
}
.v-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
