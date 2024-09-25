<template>
  <v-container fluid>
    <v-main>
      <v-container class="mt-16">
        <v-row>
          <v-col style="display: flex">
            <v-img
              :width="1050"
              aspect-ratio="16/9"
              cover
              src="/images/pets/สัตว์เลี้ยงหาย.png"
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
                >สัตว์เลี้ยงหาย</span
              >
              <div
                style="flex-grow: 2; height: 2px; background-color: #b4511a"
              ></div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="lostpetsbyid" cols="12" md="8">
            <v-card class="card-detail">
              <v-row>
                <v-col cols="12" md="6">
                  <v-img :src="lostpetsbyid.image_url" class="first-image" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-title>
                    <h3 class="text-1">{{ lostpetsbyid.name }}</h3>
                  </v-card-title>
                  <div class="card-detail-1">
                    <div class="text-2">
                      เพศ:&nbsp;<span class="span-1">{{
                        lostpetsbyid.gender
                      }}</span>
                    </div>
                    <div class="text-2">
                      อายุ:&nbsp;<span class="span-1">{{
                        lostpetsbyid.age_years
                      }}</span
                      >&nbsp;ปี&nbsp;<span class="span-1">{{
                        lostpetsbyid.age_month
                      }}</span
                      >&nbsp;เดือน
                    </div>
                    <div class="text-2">
                      สายพันธุ์:&nbsp;<span class="span-1">{{
                        lostpetsbyid.breed
                      }}</span>
                    </div>
                    <div class="text-2">
                      สี:&nbsp;<span class="span-1">{{
                        lostpetsbyid.color
                      }}</span>
                    </div>
                    <div class="text-2">
                      รางวัล:&nbsp;<span class="span-1">{{
                        formatCurrency(lostpetsbyid.reward)
                      }}</span>
                    </div>
                    <div class="text-2-1">
                      วันที่หาย:&nbsp;<span class="span-1"
                        >{{ lostpetsbyid.lost_date }}&nbsp;{{
                          lostpetsbyid.lost_time
                        }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="mt-2"
                    style="display: flex; justify-content: space-evenly"
                  >
                    <div class="div-1">
                      ประกาศเมื่อ:&nbsp;{{
                        formatDateTime(lostpetsbyid.created_at)
                      }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="mt-4 card-detail">
              <div>
                <div class="div-detail-1">
                  รายละเอียดของ&nbsp;{{ lostpetsbyid.name }}
                </div>
                <div class="div-detail-2">
                  {{ lostpetsbyid.detail }}
                </div>
              </div>
            </v-card>

            <v-card class="mt-4 card-detail">
              <div>
                <div class="div-detail-1">สถานที่หาย&nbsp;</div>
                <div class="div-detail-2">
                  {{ lostpetsbyid.lost_place }}
                </div>
                <div class="div-detail-2 mt-2">
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
                </div>
              </div>
            </v-card>

            <v-card class="mt-4 card-detail">
              <div>
                <div class="div-detail-1">รูปภาพเพิ่มเติมทั้งหมด</div>
              </div>
              <div class="div-detail-2 mt-2">
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
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="card-detail-3 pa-2">
              <div class="div-detail-1" style="margin-bottom: 8px;">ผู้ลงประกาศ</div>
              <div class="div-detail-2" v-if="postedBy">
                <div style="display: flex">
                  <v-icon color="primary">mdi-account</v-icon> &nbsp;
                  <div class="text-3">
                    ชื่อ:&nbsp;<span class="span-2"
                      >{{ postedBy.prefix }}
                      {{ postedBy.first_name }} {{
                        postedBy.last_name
                      }}</span
                    >
                  </div>
                </div>
                <div style="display: flex">
                  <v-icon color="primary">mdi-phone</v-icon> &nbsp;
                  <div class="text-3">
                    เบอร์โทร:&nbsp;<span class="span-2">{{ postedBy.phone }}</span>
                  </div>
                </div>
                <div style="display: flex">
                  <v-icon color="primary">mdi-email</v-icon> &nbsp;
                  <div class="text-3">
                    อีเมล:&nbsp;<span class="span-2">{{ postedBy.email }}</span>
                  </div>
                </div>
                <div style="display: flex" v-if="postedBy.Facebook">
                  <v-icon color="primary">mdi-facebook</v-icon> &nbsp;
                  <div class="text-3">
                    Facebook:&nbsp;<span class="span-2">{{ postedBy.Facebook }}</span>
                  </div>
                </div>
                <div style="display: flex" v-if="postedBy.Line_id">
                  <v-icon color="primary">mdi-chat</v-icon> &nbsp;
                  <div class="text-3">
                    LINE ID:&nbsp;<span class="span-2">{{ postedBy.Line_id }}</span>
                  </div>
                </div>
              </div>

              <v-divider
                class="border-opacity-100"
                :thickness="1"
                color="#d69d6b"
                style="margin-bottom: 16px; margin-top: 16px;"
              ></v-divider>

              <div>
                <div  class="div-detail-1" style="margin-bottom: 8px;">
                  สมัครสมาชิกแล้วดียังไง
                </div>
                <div class="div-detail-2">
                  แจ้งหายง่าย รวดเร็ว ถึงไม่หายก็ลงได้ มาร่วมเป็นเพื่อนบ้านกับเราเพื่อให้ช่วยกันสอดส่องตามหา
                  <div>
                    <v-btn to="/register" color="primary"  block class="mt-3 btn-member">สมัครสมาชิก</v-btn>
                  </div>
                </div>
              </div>
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
import axios from "axios";
// import { ref, onMounted } from "vue";
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
      return format(new Date(date.seconds * 1000), "dd/MM/yyyy HH:mm");
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
  height: 450px;
  border-radius: 12px;
  border: 2px solid rgb(233, 120, 49);
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
  background-color: #fffdfc;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 1rem;
  border-radius: 8px;
}

.v-card-actions {
  align-items: center;
  display: flex;
  flex: none;
  min-height: 52px;
  padding: 0.5rem;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
}
.text-title-lost {
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 28px;
  font-weight: 700;
}
.btn-notice {
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  color: #fff9ee !important;
  font-weight: 500;
}
.rounded-img {
  border-radius: 20px;
}
.card-pet-all {
  background-color: #fffdfc;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
}
.text-1 {
  font-family: "Prompt", sans-serif;
  font-size: 26px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #582e2c;
}
.text-2 {
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #582e2c;
  margin-bottom: 24px;
}
.text-2-1 {
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #582e2c;
  margin-bottom: 0px;
}
.span-1 {
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #000000;
}
.btn-1 {
  display: flex;
  justify-content: center;
  color: #582e2c !important;
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px !important;
}
.btn-disabled {
  display: flex !important;
  justify-content: center !important;
  color: #adadad !important;
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-top: 8px;
}
.card-detail {
  background-color: #fff7f3;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}
.card-detail-1 {
  background-color: #ffffff;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 30px;
  border-radius: 12px;
  margin-top: -6px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}
.div-1 {
  background-color: #ffdc8b;
  color: #000;
  font-family: "Prompt", sans-serif;
  width: 250px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #582e2c;
  box-shadow: 0px 2px 2px 0px #60617029;
}
.div-detail-1 {
  padding: 8px;
  margin-top: -6px;
  font-family: "Prompt", sans-serif;
  color: #582e2c;
  font-size: 18px;
  font-weight: 600;
}
.div-detail-2 {
  background-color: #ffffff;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 16px;
  border-radius: 12px;
  margin-top: -6px;
  font-family: "Prompt", sans-serif;
  font-weight: 400;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.card-detail-3 {
  background-color: #fff7f3;
  border-radius: 16px;
  border: 3px solid rgba(233, 121, 49, 0.1);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  height: 100%;
}
.text-3 {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #582e2c;
  margin-bottom: 24px;
}
.span-2 {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
}
.btn-member {
  display: flex;
  justify-content: center;
  color: #ffffff !important;
  font-family: "Prompt", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px !important;
}
</style>
