<template>
  <v-data-table
    :headers="headers"
    :items="petList"
    item-value="id"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>สัตว์เลี้ยงหาย</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1200px">
          <template v-slot:activator="{ on, props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props" v-on="on">
              เพิ่มข้อมูล
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <Noticelostpets @addlostpet="onAddlostpet" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="1200px">
          <v-card>
            <v-card-text>
              <Editlostpets
                :petData="editedItem"
                @updatelostpet="onEditUpdate"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit"
                >ยกเลิก</v-btn
              >
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
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >ตกลง</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.user="{ item }">
      <v-chip
        v-if="item.user"
        class="me-2"
        color="blue"
        text-color="white">
        {{ item.user.username || 'ไม่พบผู้ใช้' }}
      </v-chip>
      <div v-if="item.user">
        <div>เบอร์: {{ item.user.phone }}</div>
        <div>FB: {{ item.user.facebook }}</div>
      </div>
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
</template>

<script>
import axios from "axios";
import Noticelostpets from "~/components/section/Admin/pets/Noticelostpets.vue";
import Editlostpets from "~/components/section/Admin/pets/Editlostpets.vue";

export default {
  components: { Noticelostpets, Editlostpets },
  data() {
    return {
      petList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,
      headers: [
        { title: "ผู้ประกาศ", key: "user" }, 
        { title: "ชื่อ", key: "name" },
        { title: "วันที่หาย", key: "lost_date" },
        { title: "สถานที่หาย", key: "lost_place" },
        { title: "รางวัล", key: "reward" },
        { title: "เพศ", key: "gender" },
        { title: "รูปภาพ", key: "image_url" },
        { title: "สถานะ", key: "status" },
        { title: "แก้ไข", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async fetchPetList() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/lost_pet/getAll_lost_pets"
        );
        this.petList = response.data.data;
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    },
    onAddlostpet() {
      this.fetchPetList();
      this.dialog = false;
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
      console.log(
        "Form data before validation:",
        JSON.stringify(item, null, 2)
      );
    },
    onEditUpdate() {
      this.fetchPetList();
      this.dialogEdit = false;
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
          `http://localhost:5000/api/lost_pet/delete_lost_pet/${petId}`
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
        case "หาย":
          return "red";
        case "เจอแล้ว":
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
