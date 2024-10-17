<template>
    <v-card
      height="100%"
      rounded="xl"
      elevation="0"
      width="100%"
      class="transparent-background"
    >
      <v-card-text style="width: 100%; height:100%; justify-content: center;">
        <ChoroplethMap
          min-width="100%"
          width="100%"
          height="100%"
          :data="MapChartData"
          :options="MapChartOption"
        />
      </v-card-text>
      <div class="top-right-text">
        <span style="font-size: 18px; font-weight: 600">แผนที่แสดงผล</span> <br />
        <div style="text-align: center">
          <span style="font-size: 16px; font-weight: 600">เขตสุขภาพ</span> <br />
          <button @click="CallAreaHealth(1)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_1"></div>
              <div v-else-if="level != 5 && region == 1" class="circle_area_1"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 1
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 01</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(2)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_2"></div>
              <div v-else-if="level != 5 && region == 2" class="circle_area_2"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 2
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 02</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(3)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_3"></div>
              <div v-else-if="level != 5 && region == 3" class="circle_area_3"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 3
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 03</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(4)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_4"></div>
              <div v-else-if="level != 5 && region == 4" class="circle_area_4"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 4
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 04</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(5)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_5"></div>
              <div v-else-if="level != 5 && region == 5" class="circle_area_5"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 5
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 05</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(6)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_6"></div>
              <div v-else-if="level != 5 && region == 6" class="circle_area_6"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 6
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 06</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(7)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_7"></div>
              <div v-else-if="level != 5 && region == 7" class="circle_area_7"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 7
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 07</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(8)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_8"></div>
              <div v-else-if="level != 5 && region == 8" class="circle_area_8"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 8
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 08</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(9)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_9"></div>
              <div v-else-if="level != 5 && region == 9" class="circle_area_9"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 9
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 09</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(10)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_10"></div>
              <div v-else-if="level != 5 && region == 10" class="circle_area_10"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 10
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 10</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(11)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_11"></div>
              <div v-else-if="level != 5 && region == 11" class="circle_area_11"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 11
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 11</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(12)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_12"></div>
              <div v-else-if="level != 5 && region == 12" class="circle_area_12"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 12
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 12</span
              >
            </div>
          </button>
          <br />
          <button @click="CallAreaHealth(13)" :disabled="level != 5">
            <div style="display: flex; align-items: center">
              <div v-if="level == 5" class="circle_area_13"></div>
              <div v-else-if="level != 5 && region == 13" class="circle_area_13"></div>
              <div v-else class="circle_area_level"></div>
              <span
                :class="
                  click_area_number == 13
                    ? 'area_number_click'
                    : 'area_number_no_click'
                "
                >เขตสุขภาพ 13</span
              >
            </div>
          </button>
          <br />
        </div>
      </div>
    </v-card>
  </template>
  
  <script>
  import { EventBus } from '../EventBus'
  import { createMapChartTooltip } from "./MapChartTooltip";
  import { Chart, Tooltip } from "chart.js";
  import { createTypedChart } from "vue-chartjs";
  import thaiGeoJson from "@/components/tha.json";
  import {
    ChoroplethController,
    GeoFeature,
    ColorScale,
    ProjectionScale,
  } from "chartjs-chart-geo";
  
  Chart.register(
    ChoroplethController,
    GeoFeature,
    ColorScale,
    Tooltip,
    ProjectionScale
  );
  
  import {
    province_area_number_list,
    area_color,
    default_color
  } from "@/constants/MapChartModule";
  
  import { province_area_data } from "@/constants/MapChartData";
import { th } from 'date-fns/locale';
  
  const ChoroplethMap = createTypedChart("choropleth", "choropleth");
  
  export default {
    components: {
      ChoroplethMap,
    },
    props: ["show_map_data"],
    data() {
      return {
        level: "",
        thai_province_geo_data: [],
        new_thai_province_geo_data: [],
        mock_data: [{}],
        hospital_status_data: [],
        area: "",
        hcode: "",
        hname: "",
        subdistrict: "",
        district: "",
        province: "",
        date_now: new Date(),
        date: "",
        page: 1,
        limit: 10,
        click_area_number: 0,
        arr_area_data: [],
        map_data: {},
        get_data_area_map: undefined,
        paint_data: {},
        map_data_show: [],
        region : "",
        check_province : false,
      };
    },
    mounted() {
      this.date =
        this.date_now.getFullYear() +
        "-" +
        (this.date_now.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        this.date_now.getDate();
      this.FetchThaiJsonData();
      EventBus.$on("region_fillter" , this.fillterRegion)
      EventBus.$on("province_fillter" , this.fillterProvince)
      EventBus.$on("level" , this.setLevel)
    },
  
    computed: {
      MapChartData() {
        return {
          labels: this.thai_province_geo_data.map(
            (data) => data.properties.name_local ?? "-"
          ),
          datasets: [
            {
              label: "Province",
              outline: this.thai_province_geo_data,
              data: this.thai_province_geo_data.map((data) => {
                return {
                  feature: data,
                  value: 0,
                };
              }),
            },
          ],
        };
      },
  
      MapChartOption() {
        const level = this.level;
        const area = this.region;
        const province = this.province;
        return {
          responsive: true,
          pointHitDetectionRadius: 1,
          showGraticule: false,
          // showOutline: true,
          scales: {
            projection: {
              axis: "x",
              projection: "mercator",
              projectionScale: 1,
            },
            color: {
              display: false,
              axis: "x",
  
              interpolate: () => {
                return this.GetDataForMap(level,area,province);
              },
            },
          } ,
          tooltips: {
            mode: 'nearest',
            intersect: false
          },
          plugins: {
            legend: {
              display: false,
            },
  
            tooltip: {
              enabled: false,
              // position: "nearest",
              external: (context) => {
                // Tooltip Element
                let tooltipEl = document.getElementById('chartjs-tooltip');
                if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'chartjs-tooltip';
                  tooltipEl.innerHTML = '<table></table>';
                  document.body.appendChild(tooltipEl);
                }
  
                // Hide if no tooltip
                const tooltipModel = context.tooltip;
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = '0';
                  return;
                }
  
                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
  
                // Set HTML & Data
                const dataFromCurrentElement = tooltipModel.dataPoints[0];
                const currentElement = dataFromCurrentElement.dataIndex;
                const dataProperties =
                  dataFromCurrentElement.dataset.data[currentElement].feature
                    .properties;
                let provinceName = undefined;
                let employeeHaveCA = undefined;
                let countMOPHMedCer = undefined;
                let countDoctorOutMedCer = undefined;
                for (let i = 0; i < this.map_data_show.length; i++) {
  
                  if (this.map_data_show[i].province == dataProperties.name_local){
                    provinceName = this.map_data_show[i].province;
                    employeeHaveCA = this.map_data_show[i].total_count_cert;
                    countMOPHMedCer = this.map_data_show[i].sum_provider;
                    countDoctorOutMedCer = this.map_data_show[i].sum_ca;
                  }
                }
                const innerHtml = createMapChartTooltip({
                  provinceName,
                  employeeHaveCA,
                  countMOPHMedCer,
                  countDoctorOutMedCer
                });
  
                tooltipEl.querySelector('table').innerHTML = innerHtml;
  
                const position = context.chart.canvas.getBoundingClientRect();
  
                if (provinceName === undefined) {
                  tooltipEl.style.opacity = '0';
                } else {
                  tooltipEl.style.opacity = '1';
                }
                
                // tooltipEl.style.opacity = '1';
  
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left =
                  position.left + window.scrollX + tooltipModel.caretX + 'px';
                tooltipEl.style.top =
                  position.top + window.scrollY + tooltipModel.caretY - 20 + 'px';
                tooltipEl.style.padding =
                  tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
              }
  
            },
          },
          onClick: (e) => {
  
            if(e.chart.tooltip.dataPoints != undefined){
              const dataFromCurrentElement = e.chart.tooltip.dataPoints[0];
              const dataIndex = dataFromCurrentElement.dataIndex;
              const dataProperties = dataFromCurrentElement.dataset.data[dataIndex].feature.properties;
            
              let province_name = dataProperties.name_local
  
              if(this.level == 5){
                province_area_data.map((data_region) =>{
                  if(data_region.province == province_name){
                    this.click_area_number = data_region.region
                  }
                })
  
                let list = {
                  hospital : "",
                  province : province_name,
                  region : this.click_area_number
                }
  
                EventBus.$emit("map_fillter" , list)
                this.check_province = true
                this.province = province_name
              }
  
              if(this.level == 4){
                province_area_data.map((data_region) =>{
                  if(data_region.province == province_name && this.region == data_region.region){
                    EventBus.$emit("province_map" , province_name)
                  }
                })
              }
            }
            
          }
        };
      },
    },
  
    watch: {
      show_map_data(new_value, old_value){
        this.detailMap(new_value);
      }
    },
  
    methods: {
      detailMap(value){
        this.map_data_show = value
      },
      GetDataForMap(level , area , province) {
        if(level == 5){
          if(this.click_area_number == 0){
            return this.PainAllMap();
          }else if(this.click_area_number != 0 && this.check_province == false){
            return this.PainAreaMap(this.click_area_number);
          }else if(this.click_area_number != 0 && this.check_province == true){
            return this.PainProvinceMap(this.province)
          }
        }else if(level == 4){
          // return this.PainAreaMap(area);
          if(this.check_province == false){
            return this.PainAreaMap(area);
          }else {
            return this.PainProvinceMap(this.province)
          }
        }else{
          return this.PainProvinceMap(province)
        }
        
      },
  
      // ดึงข้อมูลประเทศไทยจาก json
      FetchThaiJsonData() {
        const thai_json = thaiGeoJson;
        this.thai_province_geo_data = thai_json.features;
  
        this.MakeNewDataGeo();
      },
  
      // ทำข้อมูล geo json ใหม่
      MakeNewDataGeo() {
        province_area_number_list.map((province_area_list, province_index) => {
          this.thai_province_geo_data.map((geo_name, index) => {
  
            if (
              geo_name.properties.code_hasc == province_area_list.provinceCode
            ) {
              this.new_thai_province_geo_data[index] = {
                area_number: province_area_list.areaNumber,
                ...geo_name.properties,
              };
            }
          });
        });
      },
  
      // ใส่สีพื้นที่ทั้งหมดของแต่ละจังหวัด
  
      PainAllMap() {
        const paint_color = this.new_thai_province_geo_data.map(
          (province_area) => {
            return area_color[province_area.area_number]?.dark;
          }
        );
        return paint_color;
      },
  
      PainAreaMap(areaNumber){
        const paint_color = this.new_thai_province_geo_data.map(
          (province_area) => {
            if(areaNumber == province_area.area_number){
              return area_color[province_area.area_number]?.dark;
            }else{
              return area_color[province_area.area_number]?.light;
            }
            
          }
        );
        return paint_color;
      },
  
      PainProvinceMap(province){
        const paint_color = this.new_thai_province_geo_data.map(
          (province_area) => {
            if(province == province_area.name_local){
              return area_color[province_area.area_number]?.dark;
            }else{
              return area_color[province_area.area_number]?.light;
            }
            
          }
        );
        return paint_color;
      },

      CallAreaHealth(area_number) {
        this.click_area_number = area_number;
        let list = {
          hospital : "",
          province : "",
          region : area_number,
        }
        EventBus.$emit("map_fillter" , list)
        this.check_province = false
      },
  
      fillterRegion(item){
        this.click_area_number = item.region;
        this.province = item.province
        this.check_province = false
      },
      fillterProvince(item){
        this.province = item.province
        if(this.province == ""){
          this.check_province = false
          this.click_area_number = 0
        }else{
          this.check_province = true
          this.click_area_number = item.region
        }
      },
      setLevel(item){
        this.level = item.level
        if (this.check_province == false){
          this.province = item.province
        }
        
        if(this.click_area_number != 0){
          this.region = this.click_area_number
        }else{
          this.region = item.region
        }
        EventBus.$emit("map_fillter" , list)
      }
    },
  };
  </script>
  
  <style scoped>
  /* .transparent-background {
    background-color: transparent;
    background-image: url('~@src/assets/img/mapthai.png');
  } */
  .transparent-background {
    box-shadow: none !important;
    border-radius: 16px !important;
    /* margin-top: 16px; */
    position: relative;
    background-image: url("@/assets/mapthai.png");
    background-size: cover; /* ทำให้รูปภาพครอบคลุมทั้งพื้นที่ */
    background-position: center; /* จัดตำแหน่งรูปภาพตรงกลาง */
  }
  .top-right-text {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 16px;
    color: #000; /* เปลี่ยนสีตามที่ต้องการ */
  }
  
  .circle_area_1 {
    background-color: #008489;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_2 {
    background-color: #44b88d;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_3 {
    background-color: #638ce1;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_4 {
    background-color: #c26c8c;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_5 {
    background-color: #6e94bc;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_6 {
    background-color: #886290;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_7 {
    background-color: #f2a65a;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_8 {
    background-color: #ad6a6c;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_9 {
    background-color: #e98175;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_10 {
    background-color: #ffd670;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_11 {
    background-color: #7cc4e9;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_12 {
    background-color: #a3a3d1;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_13 {
    background-color: #f790a0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .circle_area_level {
    background-color: #D2D5E0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .area_number_click {
    font-size: 16px;
    font-weight: 400;
    padding-left: 10px;
    color: #008489;
  }
  .area_number_no_click {
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    color: #6d6767;
  }
  </style>
  