<template>
  <div class="ml-6 mt-6 mr-6 mb-2">
    <v-row class="mt-6">
      <v-col cols="12" lg="auto" style="display: flex; align-items: center">
        <span class="text-h2">ผู้ใช้</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="auto" class="mr-14">
        <v-dialog v-model="dialog" max-width="1200px" persistent>
          <template v-slot:activator="{ on, props }">
            <v-btn
              class="mb-2 btn-style"
              color="primary"
              dark
              v-bind="props"
              v-on="on"
            >
              เพิ่มผู้ใช้
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <AddUser @adduser="onAddUser" />
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
      :items="userList"
      item-value="id"
      :sort-by="[{ key: 'created_at', order: 'asc' }]"
      class="table-style-user"
    >
      <template v-slot:item.first_name="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.prefix + " " + item.first_name, 10) }}
            </span>
          </template>
          <span>{{ item.prefix }} {{ item.first_name }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.last_name="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.last_name, 10) }}
            </span>
          </template>
          <span>{{ item.last_name }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.Line_id="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.Line_id, 10) }}
            </span>
          </template>
          <span>{{ item.Line_id }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.Facebook="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.Facebook, 15) }}
            </span>
          </template>
          <span>{{ item.Facebook }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.address="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.address, 15) }}
            </span>
          </template>
          <span>{{ item.address }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.province="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.province, 10) }}
            </span>
          </template>
          <span>{{ item.province }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.district="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.district, 10) }}
            </span>
          </template>
          <span>{{ item.district }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.subdistrict="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, props }">
            <span v-bind="props" v-on="on">
              {{ truncateText(item.subdistrict, 10) }}
            </span>
          </template>
          <span>{{ item.subdistrict }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.postal_code="{ item }">
        <span>{{ item.postal_code }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchUserList">รีเซ็ต</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <EditUser :userData="editedItem" @updateuser="onEditUpdate" />
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
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
            ยกเลิก
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="deleteItemConfirm"
          >
            ตกลง
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import AddUser from "@/components/section/Admin/user/AddUser.vue";
import EditUser from "@/components/section/Admin/user/EditUser.vue";
export default {
  components: { AddUser, EditUser },
  data() {
    return {
      userList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,
      headers: [
        { title: "ชื่อผู้ใช้", key: "username" },
        { title: "ชื่อ", key: "first_name" },
        { title: "นามสกุล", key: "last_name" },
        { title: "เบอร์โทรศัพท์", key: "phone" },
        { title: "Facebook", key: "Facebook" },
        { title: "Line ID", key: "Line_id" },
        { title: "ที่อยู่", key: "address" },
        { title: "จังหวัด", key: "province" },
        { title: "อำเภอ", key: "district" },
        { title: "ตำบล", key: "subdistrict" },
        { title: "รหัสไปรษณีย์", key: "postal_code" },
        { title: "แก้ไข", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async fetchUserList() {
      try {
        const response = await axios.get(
          "https://lost-and-found-pets-backend.onrender.com/api/user/getAll_user"
        );
        this.userList = response.data.users;
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    },
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },
    onAddUser() {
      this.dialog = false;
      this.fetchUserList();
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    onEditUpdate() {
      this.dialogEdit = false;
      this.fetchUserList();
    },
    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const userId = this.editedItem.id || this.editedItem._id;
        if (!userId) {
          throw new Error("No valid ID found for the selected item.");
        }
        await axios.delete(
          `https://lost-and-found-pets-backend.onrender.com/api/user/delete_user/${userId}`
        );
        this.dialogDelete = false;
        this.fetchUserList();
      } catch (error) {
        console.error("Error deleting user:", error);
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
  },
  created() {
    this.fetchUserList();
  },
};
</script>

<style scoped>
.v-btn {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.btn-style {
  font-family: "Prompt", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
.table-style-user {
  font-family: "Prompt", sans-serif;
}
::v-deep thead th {
  background-image: url("public/images/logos/bg-admin.png") !important;
  color: black !important;
}
</style>
