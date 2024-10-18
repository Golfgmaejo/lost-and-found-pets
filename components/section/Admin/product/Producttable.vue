<template>
  <div class="ml-6 mt-6 mr-6 mb-2">
    <v-row class="mt-6">
      <v-col cols="12" lg="auto" style="display: flex; align-items: center">
        <span class="text-h2">รายการสินค้า</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="auto">
        <v-dialog v-model="dialog" max-width="1200px" persistent>
          <template v-slot:activator="{ on, props }">
            <v-btn
              class="mb-2 btn-style"
              color="#e97931"
              dark
              v-bind="props"
              v-on="on"
            >
              เพิ่มสินค้า
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <Addproduct @addproduct="onAddProduct" />
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
      :items="productList"
      item-value="id"
      :sort-by="[{ key: 'created_at', order: 'asc' }]"
      class="table-style"
    >
      <template v-slot:item.name="{ item }">
        <span>{{ formatName(item.name) }}</span>
      </template>
      <template v-slot:item.details="{ item }">
        <span>{{ formatDetails(item.details) }}</span>
      </template>
      <template v-slot:item.link_Shopee="{ item }">
        <a :href="item.link_Shopee" target="_blank">{{
          formatShopeeLink(item.link_Shopee)
        }}</a>
      </template>
      <template v-slot:item.link_Lazada="{ item }">
        <a :href="item.link_Lazada" target="_blank">{{
          formatLazadaLink(item.link_Lazada)
        }}</a>
      </template>
      <template v-slot:item.image_url="{ item }">
        <v-img :src="item.image_url" max-height="150" max-width="150"></v-img>
      </template>
      <template v-slot:item.isBestSeller="{ item }">
        <v-chip v-if="item.isBestSeller" color="green" dark>
          สินค้าขายดี
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchProductList">รีเซ็ต</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogEdit" max-width="1200px" persistent>
      <v-card>
        <v-card-text>
          <Editproduct
            :productData="editedItem"
            @updateproduct="onEditUpdate"
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
import Addproduct from "@/components/section/Admin/product/Addproduct.vue";
import Editproduct from "@/components/section/Admin/product/Editproduct.vue";
export default {
  components: { Addproduct, Editproduct },
  data() {
    return {
      productList: [],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: null,

      headers: [
        { title: "ชื่อสินค้า", key: "name" },
        { title: "ประเภทสินค้า", key: "type" },
        { title: "รายละเอียด", key: "details" },
        { title: "ลิงก์ Shopee", key: "link_Shopee" },
        { title: "ลิงก์ Lazada", key: "link_Lazada" },
        { title: "รูปภาพ", key: "image_url" },
        { title: "สินค้าขายดี", key: "isBestSeller" },
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
    async fetchProductList() {
      try {
        const response = await axios.get(
          "https://lost-and-found-pets-backend.onrender.com/api/product/getAll_product"
        );
        this.productList = response.data.data.sort((a, b) => {
          const dateA = this.parseTimestamp(a.created_at);
          const dateB = this.parseTimestamp(b.created_at);
          return dateB - dateA;
        });
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    },
    formatName(name) {
      return name.length > 20 ? name.slice(0, 20) + "..." : name;
    },
    formatDetails(details) {
      return details.length > 30 ? details.slice(0, 30) + "..." : details;
    },
    formatShopeeLink(link) {
      return link.length > 20 ? link.slice(0, 20) + "..." : link;
    },
    formatLazadaLink(link) {
      return link.length > 20 ? link.slice(0, 20) + "..." : link;
    },
    onAddProduct() {
      this.dialog = false;
      this.fetchProductList();
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    onEditUpdate() {
      this.dialogEdit = false;
      this.fetchProductList();
    },
    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        const productId = this.editedItem.id || this.editedItem._id;
        if (!productId) {
          throw new Error("No valid ID found for the selected item.");
        }
        await axios.post("https://lost-and-found-pets-backend.onrender.com/api/image/delete_image", {
          imageUrl: this.editedItem.image_url,
        });
        await axios.delete(
          `https://lost-and-found-pets-backend.onrender.com/api/product/delete_product/${productId}`
        );
        this.fetchProductList();
        this.dialogDelete = false;
      } catch (error) {
        console.error("Error deleting product:", error);
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
    this.fetchProductList();
  },
};
</script>
<style scoped>
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
