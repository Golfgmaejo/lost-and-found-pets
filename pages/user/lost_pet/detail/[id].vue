<template>
  <v-container fluid>
    <v-main>
      <v-container class="mt-16">
        <v-row>
          <v-col cols="12">
            <bannerlostpets />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="lostpetsbyid" cols="12" md="9">
            <v-card>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="lostpetsbyid.image_url" class="first-image" />
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-title>
                    <h3>{{ lostpetsbyid.name }}</h3></v-card-title
                  >
                  <v-card-subtitle>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>เพศ:</strong>
                          {{ lostpetsbyid.gender }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>อายุ:</strong>
                          {{ lostpetsbyid.age_years }} ปี
                          {{ lostpetsbyid.age_month }} เดือน</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>สายพันธุ์:</strong>
                          {{ lostpetsbyid.breed }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>สี:</strong>
                          {{ lostpetsbyid.color }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>รางวัล:</strong>
                          {{
                            formatCurrency(lostpetsbyid.reward)
                          }}</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title
                          ><strong>วันที่หาย:</strong>
                          {{ lostpetsbyid.lost_date }}
                          {{ lostpetsbyid.lost_time }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-chip>ประกาศเมื่อ: {{ formatDateTime(lostpetsbyid.created_at) }}</v-chip>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mt-3">
              <v-card-text>
                <v-list-item-title
                  ><strong
                    >รายละเอียดของ{{ lostpetsbyid.name }}</strong
                  ></v-list-item-title
                >
                {{ lostpetsbyid.detail }}
              </v-card-text>
            </v-card>
            <v-card class="mt-3">
              <v-list-item>
                <v-list-item-title
                  ><strong>สถานที่หาย</strong></v-list-item-title
                >
                {{ lostpetsbyid.lost_place }}
              </v-list-item>
              <v-card-text>
                <LMap
                  :zoom="zoom"
                  :center="[lostpetsbyid.lat, lostpetsbyid.lng]"
                  :use-global-leaflet="false"
                  style="height: 350px; width: 100%"
                >
                  <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                  <LMarker
                    :lat-lng="[lostpetsbyid.lat, lostpetsbyid.lng]"
                    :draggable="false"
                  ></LMarker>
                </LMap>
              </v-card-text>
            </v-card>
            <v-card class="mt-3">
              <v-list-item-title
                ><strong
                  >รูปภาพของ{{ lostpetsbyid.name }}</strong
                ></v-list-item-title
              >
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img
                    :src="lostpetsbyid.image_url"
                    height="256"
                    @click="openImageModal(lostpetsbyid)"
                    class="all-image"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="sidebar pa-2">
              <v-card-title class="text-h6 font-weight-bold"
                >ผู้ลงประกาศ</v-card-title
              >
              <v-card-text v-if="postedBy">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>ชื่อ:</strong> {{ postedBy.prefix }}
                        {{ postedBy.first_name }}
                        {{ postedBy.last_name }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>เบอร์โทร:</strong>
                        {{ postedBy.phone }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-email</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>อีเมล:</strong>
                        {{ postedBy.email }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="postedBy.Facebook">
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-facebook</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>Facebook:</strong>
                        {{ postedBy.Facebook }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="postedBy.Line_id">
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-chat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>LINE ID:</strong>
                        {{ postedBy.Line_id }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-title class="text-h6 font-weight-bold"
                >สมัครสมาชิกแล้วดียังไง</v-card-title
              >
              <v-card-text>{{ sidebar.benefits }}</v-card-text>
              <NuxtLink to="/register">
                <v-btn color="primary" block class="mt-3">สมัครสมาชิก</v-btn>
              </NuxtLink>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="imageDialog" max-width="800px">
        <v-carousel>
          <v-carousel-item :src="selectedImage" />
        </v-carousel>
      </v-dialog>
    </v-main>
  </v-container>
</template>

<script>
definePageMeta({
    layout: 'user',
});
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Bannerlostpets from "~/components/section/banner/Bannerlostpets.vue";
import { format } from "date-fns";

export default {
  components: { Bannerlostpets },
  data() {
    return {
      pageTitle: "สัตว์เลี้ยงหาย",
      zoom: 16,
      lostpetsbyid: null,
      postedBy: null,
      imageDialog: false,
      selectedImage: null,
      sidebar: {
        benefits:
          "แจ้งหายง่าย รวดเร็ว ถึงไม่หายก็ลงได้ มาร่วมเป็นเพื่อนบ้านกับเราเพื่อให้ช่วยกันสอดส่องตามหา",
      },
    };
  },
  methods: {
    fetchLostpetsbyid(id) {
      const url = `http://localhost:5000/api/lost_pet/get_lost_pets_byid/${id}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.lostpetsbyid = response.data.data;
          this.postedBy = response.data.data.user;
        })
        .catch((error) => {
          console.error("Error fetching lostpetsbyid details:", error);
        });
    },
    formatCurrency(value) {
      const formattedValue = new Intl.NumberFormat("th-TH", {
        currency: "THB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      return `${formattedValue} บาท`;
    },
    formatDateTime(date) {
      return format(new Date(date.seconds * 1000), 'dd/MM/yyyy HH:mm');
    },
    openImageModal(lostpetsbyid) {
      this.selectedImage = lostpetsbyid.image_url;
      this.imageDialog = true;
    },
  },
  mounted() {
    const route = useRoute();
    const { id } = route.params;
    this.fetchLostpetsbyid(id);
  },
};
</script>

<style scoped>
.first-image {
  min-height: 250px;
  height: 310px;
  border-radius: 8px;
  border: 2px solid #d2b48c;
}

.all-image {
  min-height: 250px;
  height: 310px;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid #d2b48c;
}

.sidebar {
  background-color: #ffe4b5;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-5xl {
  font-size: 3rem;
  color: #ffa07a;
}

.mt-16 {
  margin-top: 4rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.full-width-image {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #d2b48c;
}

.v-card {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff5ee;
}

.v-card-title,
.v-card-subtitle,
.v-list-item-title {
  color: #000000;
}
.v-chip {
  background-color: #ffd700;
  color: #000;
}
</style>
