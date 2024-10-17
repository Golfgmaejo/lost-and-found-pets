<template>
  <div>
    <v-overlay
      color="#FAFAFA"
      :value="loading"
      opacity="0.4"
      class="align-center justify-center"
    >
      <v-progress-circular color="#36B48A" indeterminate size="64" />
    </v-overlay>
    <v-row>
      <v-col>
        <!-- <card :main_medical = "main_medical_data"/> -->
        <CardMainMedicalCertificate :main_medical="main_medical_data" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <FormInputCard :fillter_list="fillter_list_date" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CardsElectronicCertificate
          :electronic_certificate="electronic_certificate_data"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="5">
        <v-card
          class="card-3"
          height="550px"
          max-width="100%"
          style="border-radius: 12px; box-shadow: none"
        >
          <ThailandChart :show_map_data="details_province_data" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="7">
        <v-row>
          <v-col cols="12">
            <v-card
              class="card-4"
              height="202px"
              max-width="100%"
              style="border-radius: 12px; box-shadow: none"
            >
              <div class="card-content">
                <p class="text-title-card-3-1" style="margin-bottom: 0px">
                  จำนวนใบรับรองแพทย์อิเล็กทรอนิกส์ในแต่ละเขตสุขภาพ
                </p>
              </div>
              <div>
                <BarChart :bar_chart="bar_chart_data" />
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card
              class="card-4"
              height="324px"
              max-width="100%"
              style="border-radius: 12px; box-shadow: none"
            >
              <div class="card-content">
                <p class="text-title-card-3-2" style="margin-bottom: 0px">
                  จำนวนใบรับรองแพทย์อิเล็กทรอนิกส์ในแต่ละจังหวัด
                </p>
              </div>
              <div class="scrollbar" style="overflow-x: hidden">
                <div class="overflow">
                  <HorizontalBarChart
                    :horizontal_chart="horizontal_chart_data"
                  />
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="6">
        <v-card
          class="card-5"
          height="678px"
          style="border-radius: 12px; box-shadow: none"
        >
          <v-col cols="12">
            <img
              :src="require('../assets/img/hospital.svg')"
              style="width: 51px; height: 51px"
            />
            <div style="position: absolute; top: 55px; left: 112px">
              <p style="font-size: 18px; font-weight: 700; margin-bottom: 0px">
                ใบรับรองแพทย์อิเล็กทรอนิกส์แบ่งตามประเภท
              </p>
            </div>
          </v-col>
          <v-col cols="12">
            <Tableoutside :cert_dept_in="cert_dept_data_1" />
          </v-col>
          <v-col cols="12">
            <TableUnderline :cert_dept_out="cert_dept_data_2" />
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6">
        <v-card
          class="card-6"
          height="678px"
          style="border-radius: 12px; box-shadow: none"
        >
          <v-row>
            <img
              :src="require('../assets/img/location.svg')"
              style="
                position: absolute;
                top: 17px;
                left: 20px;
                width: 25px;
                height: 25px;
              "
            />
            <div style="position: absolute; top: 17px; left: 51px">
              <p style="font-size: 18px; font-weight: 700; margin-bottom: 0px">
                รายละเอียดจำแนกตามเขตสุขภาพ
              </p>
            </div>
          </v-row>
          <v-row>
            <v-col cols="12" style="margin-top: 25px">
              <div>
                <TableHealthZone :health_zone="health_zone_data" />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="card-7"
          height="634px"
          style="border-radius: 12px; box-shadow: none"
        >
          <v-row>
            <img
              :src="require('../assets/img/location.svg')"
              style="
                position: absolute;
                top: 20px;
                left: 30px;
                width: 25px;
                height: 30px;
              "
            />
            <div style="position: absolute; top: 20px; left: 61px">
              <p style="font-size: 20px; font-weight: 600; margin-bottom: 0px">
                รายละเอียดจำแนกตามจังหวัด
              </p>
            </div>
          </v-row>
          <v-row
            style="margin-top: 71px; display: flex; justify-content: flex-end"
          >
          </v-row>
          <v-col cols="12">
            <div>
              <TableDetailsProvince :details_province="details_province_data" />
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="card-8" style="border-radius: 12px; box-shadow: none">
          <v-row> </v-row>
          <v-row
            style="
              margin-top: 19px;
              display: flex;
              justify-content: flex-end;
              margin-right: 22px;
            "
          >
          </v-row>
          <v-col cols="12">
            <div>
              <TableDetailsService
                :details_service="details_service_data"
                :api_export="api_export"
              />
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardMainMedicalCertificate from "../components/CardMainMedicalCertificate.vue";
import CardsElectronicCertificate from "../components/CardsElectronicCertificate";
import ThailandChart from "../components/ThailandChart.vue";
import BarChart from "../components/BarChart.vue";
import HorizontalBarChart from "../components/HorizontalBarChart.vue";
import TableHealthZone from "../components/TableHealthZone.vue";
import Tableoutside from "../components/Tableoutside.vue";
import TableUnderline from "../components/TableUnderline.vue";
import TableDetailsProvince from "../components/TableDetailsProvince.vue";
import TableDetailsService from "../components/TableDetailsService.vue";
import FormInputCard from "../components/FormInputCard.vue";
import card from "../components/card.vue";
import { EventBus } from "../EventBus";

export default {
  props: [
    "level",
    "hcode",
    "area",
    "province",
    "district",
    "subdistrict",
    "hospital_name",
  ],
  components: {
    CardMainMedicalCertificate,
    CardsElectronicCertificate,
    ThailandChart,
    BarChart,
    HorizontalBarChart,
    TableHealthZone,
    Tableoutside,
    TableUnderline,
    TableDetailsProvince,
    TableDetailsService,
    FormInputCard,
    card,
  },
  data: () => ({
    loading: false,
    profile_mian_data: [],
    main_medical_data: "",
    fillter_list_date: [],
    electronic_certificate_data: {},
    bar_chart_data: {},
    horizontal_chart_data: {},
    cert_dept_data_1: {},
    cert_dept_data_2: {},
    health_zone_data: {},
    details_province_data: {},
    details_service_data: [],
    api_med_cert: "",
    api_fillter: "",
    api_cert_hcode: "",
    api_cert_region: "",
    api_cert_province: "",
    api_cert_dept: "",
    api_detail_cert_region: "",
    api_detail_cert_province: "",
    api_cert_hospital: "",
    page: 1,
    limit: 30,
    filter_date: "",
    filter_end_date: "",
    filter_type: "",
    filter_region: "",
    filter_province: "",
    filter_district: "",
    filter_hospital: "",
    api_export: "",
  }),
  watch: {},
  computed: {},
  created() {
    this.setAPI();
    this.getFillter();
  },
  mounted() {
    EventBus.$on("limit", this.setLimit);
    EventBus.$on("page", this.setPage);
    EventBus.$on("date_fillter", this.fillterDate);
    EventBus.$on("type_fillter", this.fillterType);
    EventBus.$on("hospital_fillter", this.fillterHospital);
    EventBus.$on("province_fillter", this.fillterProvince);
    EventBus.$on("region_fillter", this.fillterRegion);
    EventBus.$on("map_fillter", this.fillterRegion);
    EventBus.$on("loading", this.loadingExport);
    EventBus.$on("district_filter", this.fillterDistrict);
    EventBus.$on("subDistrict_filter", this.fillterSubDistrict);
    EventBus.$on("reset_filter", this.fillterreset);
  },
  methods: {
    setAPI() {},
    getAll() {
      this.loading = true;
      this.getData();
      this.getCertHcode();
      this.getBarChart();
      this.getHorizontalChart();
      this.certDept();
      this.getTableHealthZone();
      this.getTableDetailsProvince();
      this.getTableDetailsService();
      // this.loading = false;
    },
    async getData() {
      try {
        var { data } = await this.axios.get(this.api_med_cert);
        if (data.status) {
          this.main_medical_data = data.data.toLocaleString();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getFillter() {
      try {
        var { data } = await this.axios.get(this.api_fillter);
        if (data.status) {
          this.fillter_list_date = data.data;
          this.profile_mian_data.push({
            level: this.level,
            region: this.area,
            province: this.province,
            district: this.district_name,
            hospital: this.hospital_name,
            subDistrict: this.sub_district_name,
          });
          EventBus.$emit("profile_mian", this.profile_mian_data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getFillter_2() {
      try {
        var { data } = await this.axios.get(this.api_fillter);
        if (data.status) {
          this.fillter_list_date = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCertHcode() {
      try {
        var { data } = await this.axios.get(this.api_cert_hcode);
        if (data.status) {
          this.electronic_certificate_data = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getBarChart() {
      try {
        var { data } = await this.axios.get(this.api_cert_region);
        if (data.status) {
          this.bar_chart_data = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getHorizontalChart() {
      try {
        var { data } = await this.axios.get(this.api_cert_province);
        if (data.status) {
          this.horizontal_chart_data = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async certDept() {
      try {
        var { data } = await this.axios.get(this.api_cert_dept);
        if (data.status) {
          this.cert_dept_data_1 = data.data.in_public_health;
          this.cert_dept_data_2 = data.data.none_public_health;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTableHealthZone() {
      try {
        var { data } = await this.axios.get(this.api_detail_cert_region);
        if (data.status) {
          this.health_zone_data = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTableDetailsProvince() {
      try {
        var { data } = await this.axios.get(this.api_detail_cert_province);
        if (data.status) {
          this.details_province_data = data.data;
          let item = {
            level: this.level,
            region: this.area,
            province: this.province,
          };
          EventBus.$emit("level", item);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTableDetailsService() {
      this.loading = true;
      let api_cert_hospital_re =
        this.api_cert_hospital + "&page=" + this.page + "&limit=" + this.limit;
      try {
        var { data } = await this.axios.get(api_cert_hospital_re);
        if (data.status) {
          this.details_service_data = data.data;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    setLimit(items) {
      this.limit = items;
      this.page = 1;
      this.getTableDetailsService();
    },
    setPage(items) {
      this.page = items;
      this.getTableDetailsService();
    },
    fillterDate(item) {
      this.filter_date = item.start_date;
      this.filter_end_date = item.end_date;
      this.setAPI();
    },
    fillterType(item) {
      this.filter_type = item;
      this.setAPI();
    },
    fillterHospital(item) {
      this.filter_hospital = item;
      this.setAPI();
    },
    fillterProvince(item) {
      this.filter_province = item.province;
      this.filter_hospital = item.hospital;
      this.setAPI();
    },
    fillterRegion(item) {
      this.filter_region = item.region;
      this.filter_province = item.province;
      this.filter_hospital = item.hospital;
      this.fillter_District = item.district;
      this.fillter_SubDistrict = item.subDistrict;
      this.setAPI();
    },
    fillterDistrict(item) {
      this.filter_district = item.district;
      this.setAPI();
    },
    fillterSubDistrict(item) {
      this.filter_subdistrict = item.subDistrict;
      this.setAPI();
    },
    fillterreset() {
      this.filter_date = "";
      this.filter_end_date = "";
      this.filter_type = "";
      this.filter_region = "";
      this.filter_province = "";
      this.filter_district = "";
      this.filter_hospital = "";
      this.fillter_District = "";
      this.fillter_SubDistrict = "";

      this.setAPI();
    },
    loadingExport(items) {
      this.loading = items;
    },
  },
};
</script>
