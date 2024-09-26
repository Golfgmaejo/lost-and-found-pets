<template>
  <div class="ml-6 mt-6 mr-6 mb-2">
    <v-row class="mt-6">
      <v-col cols="12" lg="auto" style="display: flex; align-items: center">
        <span class="text-h2">ประกาศหาบ้าน</span>
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
              <Noticeadoptpet @addadoptpet="onAddadoptpet" />
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
      <template v-slot:item.adopt_place="{ item }">
        <div>{{ truncateText(item.adopt_place, 15) }}</div>
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
          <Editadoptpet :petData="editedItem" @updateadoptpet="onEditUpdate" />
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
import Noticeadoptpet from "~/components/section/Admin/pets/Noticeadoptpet.vue";
import Editadoptpet from "~/components/section/Admin/pets/Editadoptpet.vue";
import { useAuthStore } from "~/stores/auth";

export default {
  components: { Noticeadoptpet, Editadoptpet },
  data() {
    return {
      petList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,
      headers: [
        { title: "เพศ", key: "gender" },
        { title: "สายพันธุ์", key: "breed" },
        { title: "วันที่ประกาศ", key: "adopt_date" },
        { title: "สถานที่พบ", key: "adopt_place" },
        { title: "รูปภาพ", key: "image_url" },
        { title: "สถานะ", key: "status" },
        { title: "จัดการ", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async fetchPetList() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/adopt_pet/get_adopt_pet_by_user_id/${userId}`
        );
        this.petList = response.data.data;
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    },
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },
    onAddadoptpet() {
      this.dialog = false;
      this.fetchPetList();
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    onEditUpdate() {
      this.dialogEdit = false;
      this.fetchPetList();
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
          `http://localhost:5000/api/adopt_pet/delete_adopt_pet/${petId}`
        );
        this.fetchPetList();
        this.dialogDelete = false;
      } catch (error) {
        console.error("Error deleting pet data:", error);
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
        case "กำลังหาบ้าน":
          return "red";
        case "ได้บ้านแล้ว":
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
