<template>
  <v-container>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8">
        <v-card class="elevation-3 pa-4">
          <v-card-title class="headline">เกี่ยวกับเรา</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" class="d-flex justify-center">
                <v-img
                  :src="aboutDataItem.image1"
                  max-width="300px"
                  class="rounded"
                  v-if="aboutDataItem.image1"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <p>{{ aboutDataItem.description1 || "Loading..." }}</p>
              </v-col>
              <v-divider
                class="border-opacity-100"
                :thickness="1"
                color="#d69d6b"
                style="margin-bottom: 16px; margin-top: 16px"
              ></v-divider>
              <v-col cols="12" sm="6">
                <p class="mb-4">
                  {{ aboutDataItem.description2 || "Loading..." }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" class="d-flex justify-center">
                <v-img
                  :src="aboutDataItem.image2"
                  max-width="300px"
                  class="rounded"
                  v-if="aboutDataItem.image2"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openEditAboutDialog"
              >แก้ไขข้อมูล</v-btn
            >
            <v-btn color="success" @click="openAddAboutDialog"
              >เพิ่มเกี่ยวกับเรา</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8">
        <v-card class="elevation-3 pa-4">
          <v-row>
            <v-col cols="12" sm="4" class="d-flex justify-center">
              <v-card class="mx-auto" width="250px" height="250px">
                <v-img
                  :src="sponsorsDataItem.sponsorImage1"
                  max-width="100%"
                  class="rounded mb-2"
                  v-if="sponsorsDataItem.sponsorImage1"
                ></v-img>
                <v-card-text>
                  <div>{{ sponsorsDataItem.sponsorname1 }}</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="d-flex justify-center">
              <v-card class="mx-auto" width="250px">
                <v-img
                  :src="sponsorsDataItem.sponsorImage2"
                  max-width="100%"
                  class="rounded mb-2"
                  v-if="sponsorsDataItem.sponsorImage2"
                ></v-img>
                <v-card-text>
                  <div>{{ sponsorsDataItem.sponsorname2 }}</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="d-flex justify-center">
              <v-card class="mx-auto" width="250px">
                <v-img
                  :src="sponsorsDataItem.sponsorImage3"
                  max-width="100%"
                  class="rounded mb-2"
                  v-if="sponsorsDataItem.sponsorImage3"
                ></v-img>
                <v-card-text>
                  <div>{{ sponsorsDataItem.sponsorname3 }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="openAddSponsorDialog"
                  >เพิ่มผู้สนับสนุน</v-btn
                >
                <v-btn color="primary" @click="openEditSponsorDialog"
                  >แก้ไขผู้สนับสนุน</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAddabout" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <AddAbout @addabout="handleAddAbout" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAddAboutDialog"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditabout" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <EditAbout
            :aboutData="aboutDataItem"
            @updateabout="EditUpdateabout"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditAboutDialog"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddSponsor" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <AddSponsor @addsponsor="handleAddSponsor" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAddSponsorDialog"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditSponsor" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <Editsponsor
            :sponsorData="sponsorsDataItem"
            @updateSponsor="EditUpdatesponsor"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditSponsorDialog"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import EditAbout from "~/components/section/Admin/about/editabout.vue";
import AddAbout from "~/components/section/Admin/about/addabout.vue";
import AddSponsor from "~/components/section/Admin/about/addsponsor.vue";
import Editsponsor from "~/components/section/Admin/about/editsponsor.vue";

export default {
  components: { EditAbout, AddAbout, AddSponsor, Editsponsor },
  data() {
    return {
      aboutDataItem: {
        id: null,
        description1: "",
        description2: "",
        image1: null,
        image2: null,
      },
      sponsorsDataItem: {
        id: null,
        sponsorname1: "",
        sponsorname2: "",
        sponsorname3: "",
        sponsorImage1: null,
        sponsorImage2: null,
        sponsorImage3: null,
      },
      dialogEditabout: false,
      dialogAddabout: false,
      dialogDelete: false,
      dialogAddSponsor: false,
      dialogEditSponsor: false,
    };
  },
  created() {
    this.fetchAboutData();
    this.fetchSponsorsData();
  },
  methods: {
    async fetchAboutData() {
      try {
        const response = await axios.get(
          `https://lost-and-found-pets-backend.onrender.com/api/about/get_description`
        );
        this.aboutDataItem = response.data.data;
      } catch (error) {
        console.error("Error fetching About data:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    async fetchSponsorsData() {
      try {
        const response = await axios.get(
          `https://lost-and-found-pets-backend.onrender.com/api/about/get_sponsors`
        );
        const sponsorData = response.data.data[0];
        this.sponsorsDataItem = {
          id: sponsorData.id,
          sponsorname1: sponsorData.sponsorname1,
          sponsorname2: sponsorData.sponsorname2,
          sponsorname3: sponsorData.sponsorname3,
          sponsorImage1: sponsorData.image1,
          sponsorImage2: sponsorData.image2,
          sponsorImage3: sponsorData.image3,
        };
      } catch (error) {
        console.error("Error fetching Sponsors data:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลผู้สนับสนุน");
      }
    },
    openAddAboutDialog() {
      this.dialogAddabout = true;
    },
    openEditAboutDialog() {
      this.dialogEditabout = true;
    },
    openAddSponsorDialog() {
      this.dialogAddSponsor = true;
    },
    openEditSponsorDialog() {
      this.dialogEditSponsor = true;
    },
    async handleAddAbout() {
      this.dialogAddabout = false;
      this.fetchAboutData();
    },
    async EditUpdateabout() {
      this.dialogEditabout = false;
      this.fetchAboutData();
    },
    async handleAddSponsor() {
      this.dialogAddSponsor = false;
      this.fetchSponsorsData();
    },
    async EditUpdatesponsor() {
      this.dialogEditSponsor = false;
      this.fetchSponsorsData();
    },
    closeAddAboutDialog() {
      this.dialogAddabout = false;
    },
    closeAddSponsorDialog() {
      this.dialogAddSponsor = false;
    },
    closeEditAboutDialog() {
      this.dialogEditabout = false;
    },
    closeEditSponsorDialog() {
      this.dialogEditSponsor = false;
    },
  },
};
</script>
