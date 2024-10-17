<template>
  <v-card class="card-certificate" :height="height">
    <v-form v-model="valid">
      <div class="ml-6">
        <v-row class="row-fields">
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              class="field-date-start"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDate"
                  v-bind="attrs"
                  v-on="on"
                  placeholder="Start Date"
                  outlined
                  dense
                  append-icon="fi fi-rr-calendar"
                  color="#36B48A"
                  class="start-date custom-autocomplete "
                ></v-text-field>
              </template>
              <v-date-picker
                v-if="end_date"
                v-model="date"
                locale="th"
                @input="updateDate(date, 'start')"
                :max="new Date(end_date).toISOString().substr(0, 10)"
                color="primary"
                no-title
                scrollable
                :prev-icon="customPrevIcon"
                :next-icon="customNextIcon"
                class="custom-date-picker"
              ></v-date-picker>
              <v-date-picker
                v-else
                v-model="date"
                locale="th"
                @input="updateDate(date, 'start')"
                :max="new Date().toISOString().substr(0, 10)"
                color="primary"
                no-title
                scrollable
                :prev-icon="customPrevIcon"
                :next-icon="customNextIcon"
                class="custom-date-picker"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-menu
              ref="end_menu"
              v-model="end_menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDateEnd"
                  v-bind="attrs"
                  v-on="on"
                  placeholder="End Date"
                  outlined
                  dense
                  append-icon="fi fi-rr-calendar"
                  color="#36B48A"
                  class="end-date custom-autocomplete "
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="end_date"
                locale="th"
                @input="updateDate(end_date, 'end')"
                color="primary"
                no-title
                scrollable
                :prev-icon="customPrevIcon"
                :next-icon="customNextIcon"
                class="custom-date-picker"
                :min="new Date(date).toISOString().substr(0, 10)"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-autocomplete
              :disabled="level == 1"
              v-model="area_type"
              :items="items_area_type"
              @change="filter_type(area_type)"
              placeholder="ประเภท"
              outlined
              dense
              color="#36B48A"
              class="type-select custom-autocomplete "
            >
              <template v-slot:append>
                <template v-if="!area_type">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_type('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row style="margin-top: -30px" class="row-fields-1">
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-autocomplete
              placeholder="เขตสุขภาพ"
              outlined
              dense
              color="#36B48A"
              class="region-select custom-autocomplete "
              :disabled="level == 1 || level == 2 || level == 3 || level == 4"
              v-model="region"
              :items="items_region"
              @change="filter_region(region)"
            >
              <template v-slot:append>
                <template v-if="!region">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_region('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-autocomplete
              placeholder="จังหวัด"
              outlined
              dense
              color="#36B48A"
              class="province-select custom-autocomplete "
              :disabled="level == 1 || level == 2 || level == 3"
              v-model="province"
              :items="items_province"
              @change="filter_province(province)"
            >
              <template v-slot:append>
                <template v-if="!province">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_province('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <v-autocomplete
              v-model="district"
              :items="items_district"
              @change="filter_district(district)"
              placeholder="เขต/อำเภอ"
              outlined
              dense
              color="#36B48A"
              class="district-select custom-autocomplete "
            >
              <template v-slot:append>
                <template v-if="!district">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_district('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            xs="auto"
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
            class="col-subDistrict"
          >
            <v-autocomplete
              v-model="subDistrict"
              :items="items_subdistrict"
              @change="filter_subdistrict(subDistrict)"
              placeholder="แขวง/ตำบล"
              outlined
              dense
              color="#36B48A"
              class="subDistrict-select custom-autocomplete "
            >
              <template v-slot:append>
                <template v-if="!subDistrict">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_subdistrict('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            xs="auto"
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
            class="col-hospital"
          >
            <v-autocomplete
              :disabled="level == 1"
              v-model="hospital"
              :items="items_biz_name"
              @change="filter_hospital(hospital)"
              placeholder="โรงพยาบาล"
              outlined
              dense
              color="#36B48A"
              class="hospital-select custom-autocomplete "
            >
              <template v-slot:append>
                <template v-if="!hospital">
                  <v-icon color="#36B48A">fi fi-rr-angle-small-down</v-icon>
                </template>
                <template v-else>
                  <v-btn icon @click="filter_hospital('')" elevation="0">
                    <v-icon class="clear-icon">fi fi-rr-cross</v-icon>
                  </v-btn>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            xs="auto"
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
            class="col-reset-btn"
          >
            <v-btn class="filter-reset-btn" @click="resetFilters">
              ล้างตัวกรอง
              <v-icon right>fi fi-ss-eraser</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-card>
</template>
<script>
import { EventBus } from "../EventBus";
export default {
  props: ["fillter_list"],
  data() {
    return {
      valid: false,
      level: "",
      region: null,
      province: null,
      hospital: null,
      area_type: null,
      menu: false,
      date: null,
      end_menu: false,
      end_date: null,
      formattedDate: "",
      formattedDateEnd: "",
      items_area_type: [],
      items_region: [],
      items_province: [],
      items_biz_name: [],
      cardHeight: "241px",
      fontSizes: "calc(80% + 4vmin)",
      customPrevIcon: "fi fi-rr-angle-left",
      customNextIcon: "fi fi-rr-angle-right",
      subDistrict: null,
      items_subdistrict: [],
      district: "",
      items_district: [],
      loading: false,
    };
  },
  mounted() {
    EventBus.$on("map_fillter", this.fillterRegion);
    EventBus.$on("profile_mian", this.setData);
    EventBus.$on("province_map", this.setProvinceMap);
    EventBus.$on("district_map", this.filter_district);
    EventBus.$on("subdistrict_map", this.filter_subdistrict);
  },
  watch: {
    fillter_list(new_value, old_value) {
      this.fillter_list_data(new_value);
    },
  },
  methods: {
    fillter_list_data(value) {
      this.items_biz_name = [];
      this.items_region = [];
      this.items_province = [];
      this.items_area_type = [];
      this.items_district = [];
      this.items_subdistrict = [];

      this.items_area_type = value.area_type;

      for (let i = 0; i < value.hospital.length; i++) {
        this.items_biz_name.push(value.hospital[i].hospital_name);
      }

      for (let i = 0; i < value.region_list.length; i++) {
        this.items_region.push({
          value: value.region_list[i].no,
          text: value.region_list[i].region_name,
        });
      }
      for (let i = 0; i < value.province_list.length; i++) {
        this.items_province.push(value.province_list[i].province);
      }

      for (let i = 0; i < value.district.length; i++) {
        this.items_district.push(value.district[i].district_name);
      }

      for (let i = 0; i < value.subDistrict.length; i++) {
        this.items_subdistrict.push(value.subDistrict[i].sub_district_name);
      }
    },

    updateDate(val, status) {
      if (status == "start") {
        this.date = val;
        this.formattedDate = this.formatDate(val);
        this.menu = false;
      } else {
        this.end_date = val;
        this.formattedDateEnd = this.formatDate(val);
        this.end_menu = false;
      }

      if (this.date != null && this.end_date != null) {
        let list = {
          start_date: this.date,
          end_date: this.end_date,
        };
        EventBus.$emit("date_fillter", list);
      }

      // EventBus.$emit("date_fillter" , this.date)
    },
    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    fillterRegion(item) {
      if (item.province == "") {
        this.province = null;
        this.hospital = null;
        this.region = item.region;
      } else {
        this.province = item.province;
        this.hospital = null;
        this.region = item.region;
      }
    },
    setData(item) {
      this.level = item[0].level;
      // this.region = item[0].region
      // this.province = item[0].province
      // this.district = item[0].district
      // this.hospital = item[0].hospital
      // if(this.level == 1){
      //   this.area_type = "รพศ./รพท./รพช."
      // }else{
      //   this.area_type = ""
      // }
    },
    setProvinceMap(item) {
      this.hospital = null;
      this.province = item;
      let list = {
        hospital: "",
        province: item,
      };
      EventBus.$emit("province_fillter", list);
    },
    filter_region(item) {
      this.province = null;
      this.hospital = null;
      this.district = null;
      this.subDistrict = null;
      let list = {};
      if (item == 0) {
        this.region = null;
        list = {
          hospital: "",
          province: "",
          region: "",
        };
      } else {
        list = {
          hospital: "",
          province: "",
          region: item,
        };
      }
      EventBus.$emit("region_fillter", list);
    },
    filter_type(item) {
      if (item != "") {
        EventBus.$emit("type_fillter", item);
      } else {
        this.area_type = null;
        EventBus.$emit("type_fillter", "");
      }
    },
    filter_hospital(item) {
      if (item != "") {
        EventBus.$emit("hospital_fillter", item);
      } else {
        this.hospital = null;
        EventBus.$emit("hospital_fillter", "");
      }
    },
    filter_province(item) {
      this.hospital = null;
      if (item != "") {
        let list = {
          region: "",
          hospital: "",
          province: item,
        };
        EventBus.$emit("province_fillter", list);
      } else {
        this.province = null;
        let list = {
          hospital: "",
          region:item,
          province: item,
        };
        EventBus.$emit("province_fillter", list);
      }
    },
    filter_district(item) {
      this.hospital = null;
      if (item != "") {
        let list = {
          hospital: "",
          district: item,
        };
        EventBus.$emit("district_filter", list);
      } else {
        this.district = null;
        let list = {
          hospital: "",
          district: item,
        };
        EventBus.$emit("district_filter", list);
      }
    },
    filter_subdistrict(item) {
      this.hospital = null;
      if (item != "") {
        let list = {
          hospital: "",
          subDistrict: item,
        };
        EventBus.$emit("subDistrict_filter", list);
      } else {
        this.subDistrict = null;
        let list = {
          hospital: "",
          subDistrict: item,
        };
        EventBus.$emit("subDistrict_filter", list);
      }
    },
    // resetFilters() {
    //   this.formattedDate = null;
    //   this.formattedDateEnd = null;
    //   this.date = null;
    //   this.end_date = null;
    //   this.area_type = null;
    //   this.region = null;
    //   this.province = null;
    //   this.district = null;
    //   this.subDistrict = null;
    //   this.hospital = null;
    //   EventBus.$emit("reset_filter");
    // },
    resetFilters() {
    // Reset all filters
    this.formattedDate = null;
    this.formattedDateEnd = null;
    this.date = null;
    this.end_date = null;
    this.area_type = null;
    this.region = null;
    this.province = null;
    this.district = null;
    this.subDistrict = null;
    this.hospital = null;

    // ส่งค่า reset ไปยัง EventBus
    const list = {
        hospital: "",
        province: "",
        region: "",
    };

    // Emit event เพื่อรีเซ็ตค่าฟิลเตอร์
    EventBus.$emit("region_fillter", list); // ใช้เหมือนกับใน filter_region
    EventBus.$emit("reset_filter");
}
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 570;
        case "sm":
          return 220;
        case "md":
          return 140;
        case "lg":
          return 130;
        case "xl":
          return 130;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap");
.v-main {
  font-family: "Noto Sans Thai", sans-serif !important;
}
::v-deep .v-list-item__title {
  font-family: "Noto Sans Thai", sans-serif !important;
  font-size: 14px !important;
}
::v-deep .v-date-picker-header__value div {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  font-family: "Noto Sans Thai", sans-serif !important;
}

.card-certificate {
  background: linear-gradient(90deg, rgba(230, 244, 241, 0.9) 0%, #ffffff 100%);
  width: 100% !important;
  max-width: 100%;
  margin: 0 auto !important;
  height: 150px !important;
  box-shadow: none !important;
  border-radius: 20px !important;
  padding: 16px 24px 16px 24px !important;
}
.v-application .primary--text {
  color: #36b48a !important;
  caret-color: #36b48a !important;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.v-application .primary--text {
  color: #36b48a !important;
  caret-color: #36b48a !important;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.v-text-field--outlined >>> fieldset {
  border-color: #36b48a !important;
  border-radius: 8px !important;
  background-color: white !important;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.custom-autocomplete ::placeholder {
  color: #36b48a !important;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.custom-autocomplete .v-input__append-inner .v-icon {
  font-size: 20px !important;
  color: #36b48a !important;
  font-family: "Noto Sans Thai", sans-serif !important;
}

.custom-btn {
  width: 120px !important;
  height: 38px !important;
  border-radius: 8px !important;
  border: 1px solid !important;
  color: #a0a0a0;
}
.start-date {
  width: 284px !important;
}
.end-date {
  width: 284px !important;
}
.type-select {
  width: 284px !important;
}
.region-select {
  width: 284px !important;
}
.province-select {
  width: 284px !important;
}
.district-select {
  width: 284px !important;
}
.subDistrict-select {
  width: 284px !important;
}
.hospital-select {
  width: 405px !important;
}
.filter-reset-btn {
  width: 120px !important;
  height: 38px !important;
  border-radius: 8px !important;
  border: 1px solid !important;
  color: #a0a0a0 !important;
  font-weight: 500 !important;
}
.v-picker__body > div {
  width: 100%;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.v-list-item__title {
  font-family: "Noto Sans Thai", sans-serif !important;
  align-self: center;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
    display: flex !important;
    justify-content: center !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 100% !important;
  }
  .end-date {
    width: 100% !important;
    margin-top: -30px !important;
  }
  .type-select {
    width: 100% !important;
    margin-top: -30px !important;
  }
  .region-select {
    width: 100% !important;
  }
  .province-select {
    width: 100% !important;
    margin-top: -30px !important;
  }
  .district-select {
    width: 100% !important;
    margin-top: -30px !important;
  }
  .subDistrict-select {
    width: 100% !important;
  }
  .hospital-select {
    width: 100% !important;
  }
  .filter-reset-btn {
    width: 130px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 600px) and (max-width: 655px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 220px !important;
  }
  .end-date {
    width: 220px !important;
  }
  .type-select {
    width: 465px !important;
    margin-top: -30px !important;
  }
  .region-select {
    width: 220px !important;
  }
  .province-select {
    width: 220px !important;
  }
  .district-select {
    width: 220px !important;
    margin-top: -30px !important;
  }
  .subDistrict-select {
    width: 220px !important;
  }
  .hospital-select {
    width: 319px !important;
  }
  .filter-reset-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 655px) and (max-width: 699px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 270px !important;
  }
  .end-date {
    width: 270px !important;
  }
  .type-select {
    width: 565px !important;
    margin-top: -30px !important;
  }
  .region-select {
    width: 270px !important;
  }
  .province-select {
    width: 270px !important;
  }
  .district-select {
    width: 270px !important;
    margin-top: -30px !important;
  }
  .subDistrict-select {
    width: 270px !important;
  }
  .hospital-select {
    width: 359px !important;
  }
  .filter-reset-btn {
    width: 180px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 700px) and (max-width: 796px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 290px !important;
  }
  .end-date {
    width: 290px !important;
  }
  .type-select {
    width: 605px !important;
    margin-top: -30px !important;
  }
  .region-select {
    width: 290px !important;
  }
  .province-select {
    width: 290px !important;
  }
  .district-select {
    width: 290px !important;
    margin-top: -30px !important;
  }
  .subDistrict-select {
    width: 290px !important;
  }
  .hospital-select {
    width: 399px !important;
  }
  .filter-reset-btn {
    width: 180px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 797px) and (max-width: 858px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 220px !important;
  }
  .end-date {
    width: 220px !important;
  }
  .type-select {
    width: 220px !important;
  }
  .region-select {
    width: 220px !important;
  }
  .province-select {
    width: 220px !important;
  }
  .district-select {
    width: 220px !important;
  }
  .subDistrict-select {
    width: 220px !important;
  }
  .hospital-select {
    width: 279px !important;
  }
  .filter-reset-btn {
    width: 160px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 859px) and (max-width: 916px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 240px !important;
  }
  .end-date {
    width: 240px !important;
  }
  .type-select {
    width: 240px !important;
  }
  .region-select {
    width: 240px !important;
  }
  .province-select {
    width: 240px !important;
  }
  .district-select {
    width: 240px !important;
  }
  .subDistrict-select {
    width: 240px !important;
  }
  .hospital-select {
    width: 299px !important;
  }
  .filter-reset-btn {
    width: 180px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 917px) and (max-width: 993px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 260px !important;
  }
  .end-date {
    width: 260px !important;
  }
  .type-select {
    width: 260px !important;
  }
  .region-select {
    width: 260px !important;
  }
  .province-select {
    width: 260px !important;
  }
  .district-select {
    width: 260px !important;
  }
  .subDistrict-select {
    width: 260px !important;
  }
  .hospital-select {
    width: 329px !important;
  }
  .filter-reset-btn {
    width: 190px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 992px) and (max-width: 1219px) {
  .card-certificate {
    height: auto !important;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 280px !important;
  }
  .end-date {
    width: 280px !important;
  }
  .type-select {
    width: 280px !important;
  }
  .region-select {
    width: 280px !important;
  }
  .province-select {
    width: 280px !important;
  }
  .district-select {
    width: 280px !important;
  }
  .subDistrict-select {
    width: 280px !important;
  }
  .hospital-select {
    width: 339px !important;
  }
  .filter-reset-btn {
    width: 220px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1120px) and (max-width: 1229px) {
  .v-col {
    width: 33.33% !important;
    max-width: 33.33% !important;
  }
  .card-certificate {
    height: auto !important;
  }
  .v-row {
    flex-wrap: wrap;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 324px !important;
  }
  .end-date {
    width: 324px !important;
  }
  .type-select {
    width: 324px !important;
  }
  .region-select {
    width: 324px !important;
  }
  .province-select {
    width: 324px !important;
  }
  .district-select {
    width: 324px !important;
  }
  .subDistrict-select {
    width: 324px !important;
  }
  .hospital-select {
    width: 429px !important;
  }
  .filter-reset-btn {
    width: 220px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1230px) and (max-width: 1296px) {
  .v-col {
    width: 33.33% !important;
    max-width: 33.33% !important;
  }
  .card-certificate {
    height: auto !important;
  }
  .v-row {
    flex-wrap: wrap;
  }
  .col-subDistrict {
    margin-top: -30px !important;
  }
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 364px !important;
  }
  .end-date {
    width: 364px !important;
  }
  .type-select {
    width: 364px !important;
  }
  .region-select {
    width: 364px !important;
  }
  .province-select {
    width: 364px !important;
  }
  .district-select {
    width: 364px !important;
  }
  .subDistrict-select {
    width: 364px !important;
  }
  .hospital-select {
    width: 505px !important;
  }
  .filter-reset-btn {
    width: 220px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1297px) and (max-width: 1309px) {
  .v-col {
    width: 33.33% !important;
    max-width: 33.33% !important;
  }
  .card-certificate {
    height: auto !important;
  }
  .v-row {
    flex-wrap: wrap;
  }
  /* .col-subDistrict {
    margin-top: -30px !important;
  } */
  .col-hospital {
    margin-top: -30px !important;
  }
  .col-reset-btn {
    margin-top: -30px !important;
  }
}
@media (min-width: 1310px) and (max-width: 1395px) {
  .card-certificate {
    background: linear-gradient(
      90deg,
      rgba(230, 244, 241, 0.9) 0%,
      #ffffff 100%
    );
    width: 100% !important;
    max-width: 100%;
    margin: 0 auto !important;
    height: 150px !important;
    box-shadow: none !important;
    border-radius: 20px !important;
    padding: 16px 24px 16px 24px !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-text-field--outlined >>> fieldset {
    border-color: #36b48a !important;
    border-radius: 8px !important;
    background-color: white !important;
  }
  .custom-autocomplete ::placeholder {
    color: #36b48a !important;
  }
  .custom-autocomplete .v-input__append-inner .v-icon {
    font-size: 20px !important;
    color: #36b48a !important;
  }

  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 180px !important;
  }
  .end-date {
    width: 180px !important;
  }
  .type-select {
    width: 180px !important;
  }
  .region-select {
    width: 180px !important;
  }
  .province-select {
    width: 180px !important;
  }
  .district-select {
    width: 180px !important;
  }
  .subDistrict-select {
    width: 180px !important;
  }
  .hospital-select {
    width: 260px !important;
  }
  .filter-reset-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1395px) and (max-width: 1495px) {
  .card-certificate {
    background: linear-gradient(
      90deg,
      rgba(230, 244, 241, 0.9) 0%,
      #ffffff 100%
    );
    width: 100% !important;
    max-width: 100%;
    margin: 0 auto !important;
    height: 150px !important;
    box-shadow: none !important;
    border-radius: 20px !important;
    padding: 16px 24px 16px 24px !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-text-field--outlined >>> fieldset {
    border-color: #36b48a !important;
    border-radius: 8px !important;
    background-color: white !important;
  }
  .custom-autocomplete ::placeholder {
    color: #36b48a !important;
  }
  .custom-autocomplete .v-input__append-inner .v-icon {
    font-size: 20px !important;
    color: #36b48a !important;
  }

  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 190px !important;
  }
  .end-date {
    width: 190px !important;
  }
  .type-select {
    width: 190px !important;
  }
  .region-select {
    width: 190px !important;
  }
  .province-select {
    width: 190px !important;
  }
  .district-select {
    width: 190px !important;
  }
  .subDistrict-select {
    width: 190px !important;
  }
  .hospital-select {
    width: 270px !important;
  }
  .filter-reset-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1495px) and (max-width: 1595px) {
  .card-certificate {
    background: linear-gradient(
      90deg,
      rgba(230, 244, 241, 0.9) 0%,
      #ffffff 100%
    );
    width: 100% !important;
    max-width: 100%;
    margin: 0 auto !important;
    height: 150px !important;
    box-shadow: none !important;
    border-radius: 20px !important;
    padding: 16px 24px 16px 24px !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-text-field--outlined >>> fieldset {
    border-color: #36b48a !important;
    border-radius: 8px !important;
    background-color: white !important;
  }
  .custom-autocomplete ::placeholder {
    color: #36b48a !important;
  }
  .custom-autocomplete .v-input__append-inner .v-icon {
    font-size: 20px !important;
    color: #36b48a !important;
  }

  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 210px !important;
  }
  .end-date {
    width: 210px !important;
  }
  .type-select {
    width: 210px !important;
  }
  .region-select {
    width: 210px !important;
  }
  .province-select {
    width: 210px !important;
  }
  .district-select {
    width: 210px !important;
  }
  .subDistrict-select {
    width: 210px !important;
  }
  .hospital-select {
    width: 280px !important;
  }
  .filter-reset-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
@media (min-width: 1595px) and (max-width: 1745px) {
  .card-certificate {
    background: linear-gradient(
      90deg,
      rgba(230, 244, 241, 0.9) 0%,
      #ffffff 100%
    );
    width: 100% !important;
    max-width: 100%;
    margin: 0 auto !important;
    height: 150px !important;
    box-shadow: none !important;
    border-radius: 20px !important;
    padding: 16px 24px 16px 24px !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-application .primary--text {
    color: #36b48a !important;
    caret-color: #36b48a !important;
  }
  .v-text-field--outlined >>> fieldset {
    border-color: #36b48a !important;
    border-radius: 8px !important;
    background-color: white !important;
  }
  .custom-autocomplete ::placeholder {
    color: #36b48a !important;
  }
  .custom-autocomplete .v-input__append-inner .v-icon {
    font-size: 20px !important;
    color: #36b48a !important;
  }

  .custom-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0;
  }
  .start-date {
    width: 240px !important;
  }
  .end-date {
    width: 240px !important;
  }
  .type-select {
    width: 240px !important;
  }
  .region-select {
    width: 240px !important;
  }
  .province-select {
    width: 240px !important;
  }
  .district-select {
    width: 240px !important;
  }
  .subDistrict-select {
    width: 240px !important;
  }
  .hospital-select {
    width: 305px !important;
  }
  .filter-reset-btn {
    width: 120px !important;
    height: 38px !important;
    border-radius: 8px !important;
    border: 1px solid !important;
    color: #a0a0a0 !important;
    font-weight: 500 !important;
  }
}
</style>
