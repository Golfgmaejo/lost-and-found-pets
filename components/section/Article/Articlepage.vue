<template>
  <div>
    <div class="team-component mini-spacer">
      <v-container>
        <v-divider class="border-opacity-100" color="#E97931"></v-divider>

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
          <v-col v-for="article in paginatedArticles" :key="article.id" cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card mb-7">
              <div class="overflow-hidden">
                <img :src="article.image_url" class="img-fluid" />
              </div>
              <div>
                <h5 class="title">{{ formatName(article.name) }}</h5>
                <p class="subtitle">{{ formatDetails(article.details) }}</p>
              </div>
              <a
                :href="article.link"
                class="text-subtitle linking text-decoration-none d-flex align-center"
                style="margin-top: 12px;"
              >
                อ่านเพิ่มเติม <i class="mdi mdi-arrow-right"></i>
              </a>
            </v-card>
          </v-col>
        </v-row>
        
        <!-- Pagination -->
        <v-row class="mt-5">
          <v-col cols="12" class="text-center">
            <v-pagination
              v-model="page"
              :length="pageCount"
              rounded="circle"
              @input="updatePage"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
      itemsPerPage: 8,
      page: 1,
    };
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    },
    paginatedArticles() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get('http://localhost:5000/api/article/getAll_article');
        this.articles = response.data.data; 
      } catch (error) {
        console.error('Error fetching article list:', error);
        alert('ไม่สามารถดึงข้อมูลบทความได้');
      }
    },
    formatName(name) {
      return name.length > 30 ? name.slice(0, 30) + "..." : name;
    },
    formatDetails(details) {
      return details.length > 35 ? details.slice(0, 35) + "..." : details;
    },
    updatePage(page) {
      this.page = page;
    }
  }
};
</script>

<style scoped>
.title {
  font-family: "Prompt", sans-serif;
  color: #E97931;
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
  color: #E97931;
  font-size: 14px;
  font-weight: 400;
}
</style>
