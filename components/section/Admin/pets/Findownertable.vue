<template>
  <div class="ml-6 mt-6 mr-6 mb-2">
    <v-row class="mt-6">
      <v-col cols="12" lg="auto" style="display: flex; align-items: center">
        <span class="text-h2">ประกาศหาเจ้าของ</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="auto">
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on, props }">
            <v-btn
              class="mb-2 btn-style"
              color="primary"
              dark
              v-bind="props"
              v-on="on"
            >
              เพิ่มข้อมูลสัตว์
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <Noticefindowner @addfindownerpet="onAddfindownerpet" />
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
      :items="petList"
      item-value="id"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      class="table-style"
    >
      <template v-slot:item.user="{ item }">
        <v-chip v-if="item.user" class="me-2" color="blue" text-color="white">
          {{ item.user.username || "ไม่พบผู้ใช้" }}
        </v-chip>
        <div v-if="item.user">
          <div>Tel: {{ item.user.phone }}</div>
          <div>FB: {{ item.user.Facebook }}</div>
          <div>Line: {{ item.user.Line_id }}</div>
        </div>
      </template>
      <template v-slot:item.findowner_place="{ item }">
        <div>{{ truncateText(item.findowner_place, 15) }}</div>
      </template>
      <template v-slot:item.image_url="{ item }">
        <v-img :src="item.image_url" max-height="100" max-width="100"></v-img>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" text-color="white">
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchPetList">รีเซ็ต</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" max-width="1200px">
      <v-card>
        <v-card-text>
          <Editfindowner
            :petData="editedItem"
            @updatefindownerpet="onEditUpdate"
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
        <v-card-title class="text-h5"
          >คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?</v-card-title
        >
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
import Noticefindowner from "~/components/section/Admin/pets/Noticefindowner.vue";
import Editfindowner from "~/components/section/Admin/pets/Editfindowner.vue";
import { set } from "date-fns";

export default {
  components: { Noticefindowner, Editfindowner },
  data() {
    return {
      petList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,
      headers: [
        { title: "ผู้ประกาศ", key: "user" },
        { title: "เพศ", key: "gender" },
        { title: "สายพันธุ์", key: "breed" },
        { title: "วันที่ประกาศ", key: "findowner_date" },
        { title: "สถานที่พบ", key: "findowner_place" },
        { title: "รูปภาพ", key: "image_url" },
        { title: "สถานะ", key: "status" },
        { title: "จัดการ", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async fetchPetList() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/find_owner/getAll_find_owner"
        );
        this.petList = response.data.data;
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    },
    onAddfindownerpet() {
      setTimeout(() => {
        this.fetchPetList();
        this.dialog = false;
      }, 2000);
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    onEditUpdate() {
      setTimeout(() => {
        this.fetchPetList();
        this.dialogEdit = false;
      }, 2000);
    },
    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const petId = this.editedItem.id || this.editedItem._id;
        if (!petId) {
          throw new Error("No valid ID found for the selected item.");
        }
        await axios.post("http://localhost:5000/api/image/delete_image", {
          imageUrl: this.editedItem.image_url,
        });
        await axios.delete(
          `http://localhost:5000/api/find_owner/delete_find_owner/${petId}`
        );
        this.fetchPetList();
        this.dialogDelete = false;
      } catch (error) {
        console.error("Error deleting pet data:", error);
      }
    },
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
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
        case "กำลังหาเจ้าของ":
          return "red";
        case "พบเจ้าของแล้ว":
          return "green";
        default:
          return "grey";
      }
    },
  },
  created() {
    this.fetchPetList();
  },
};
</script>
<style scoped>
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
  color: black !important; /* สีตัวอักษร */
}
</style>
