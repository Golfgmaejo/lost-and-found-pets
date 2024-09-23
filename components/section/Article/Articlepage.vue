<template>
    <div class="mini-spacer">
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

        <v-row class="mt-13">
          <v-col v-for="article in paginatedArticles" :key="article.id" cols="12" md="3" sm="6">
            <v-card elevation="0" class="team-card mb-7">
              <div class="overflow-hidden card-image-wrapper">
                <img :src="article.image_url" class="img-fluid card-image" />
              </div>
              <div class="card-content">
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
.team-component {
  background-color: #faf6f0;
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
  background-color: #E97931;
  transition: background-color 0.3s ease;
}
.text-feature:hover {
  background-color: #d16828;
}
.title {
  font-family: "Prompt", sans-serif;
  color: #E97931;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
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
  text-align: center;
}
.team-card {
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.team-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.v-btn {
  border-radius: 30px;
}
</style>
