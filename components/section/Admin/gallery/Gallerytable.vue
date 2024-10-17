<template>
  <div class="ml-6 mt-6 mr-6 mb-2">
    <v-row class="mt-6">
      <v-col cols="12" lg="auto" style="display: flex; align-items: center">
        <span class="text-h2">แกลลอรี่</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="auto">
        <v-dialog v-model="dialog" max-width="1200px" persistent>
          <template v-slot:activator="{ on, props }">
            <v-btn
              class="mb-2 btn-style"
              color="primary"
              dark
              v-bind="props"
              v-on="on"
            >
              เพิ่มแกลลอรี่
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <Addgallery @addgallery="onAddGallery" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="galleryList"
      item-value="id"
      :sort-by="[{ key: 'created_at', order: 'asc' }]"
      class="table-style"
    >
      <template v-slot:item.name="{ item }">
        <span>{{ formatName(item.name) }}</span>
      </template>
      <template v-slot:item.image_url="{ item }">
        <v-img :src="item.image_url" max-height="150" max-width="150"></v-img>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status" color="green" dark> แสดงแกลลอรี่ </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchGalleryList">รีเซ็ต</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogEdit" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <Editgallery
            :galleryData="editedItem"
            @updategallery="onEditUpdate"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEdit">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >ยกเลิก</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
            >ตกลง</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Addgallery from "./Addgallery.vue";
import Editgallery from "./Editgallery.vue";
export default {
  components: {
    Addgallery,
    Editgallery,
  },
  data() {
    return {
      galleryList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,
      headers: [
        { title: "ชื่อแกลลอรี่", key: "name" },
        { title: "รูปภาพ", key: "image_url" },
        { title: "สถานะ", key: "status" },
        { title: "จัดการ", key: "actions", sortable: false },
      ],
    };
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
    async fetchGalleryList() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/gallery/getAll_gallery"
        );
        this.galleryList = response.data.data.sort((a, b) => {
          const dateA = this.parseTimestamp(a.created_at);
          const dateB = this.parseTimestamp(b.created_at);
          return dateB - dateA;
        });
      } catch (error) {
        console.error("Error fetching gallery list:", error);
      }
    },
    formatName(name) {
      return name.length > 20 ? name.slice(0, 25) + "..." : name;
    },
    onAddGallery() {
      this.dialog = false;
      this.fetchGalleryList();
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    onEditUpdate() {
      this.dialogEdit = false;
      this.fetchGalleryList();
    },
    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const galleryId = this.editedItem.id || this.editedItem._id;
        if (!galleryId) {
          throw new Error("No valid ID found for the selected item.");
        }
        await axios.post("http://localhost:5000/api/image/delete_image", {
          imageUrl: this.editedItem.image_url,
        });
        await axios.delete(
          `http://localhost:5000/api/gallery/delete_gallery/${galleryId}`
        );
        this.fetchGalleryList();
        this.dialogDelete = false;
      } catch (error) {
        console.error("Error deleting gallery:", error);
      }
    },
    close() {
      this.dialog = false;
      this.editedItem = null;
    },
    closeEdit() {
      this.dialogEdit = false;
      this.editedItem = null;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.editedItem = null;
    },
    getStatusColor(status) {
      switch (status) {
        case "แสดง":
          return "red";
        case "ซ่อน":
          return "green";
        default:
          return "grey";
      }
    },
  },
  created() {
    this.fetchGalleryList();
  },
};
</script>
<style scoped>
.v-btn {
  font-family: "Prompt", sans-serif;
}
.v-btn {
  font-family: "Prompt", sans-serif;
}
.background-image {
  background-image: url("public/images/logos/bg-admin.png");
}
.btn-style {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.table-style {
  font-family: "Prompt", sans-serif;
}
::v-deep thead th {
  background-image: url("public/images/logos/bg-admin.png") !important;
  color: black !important;
}
</style>
