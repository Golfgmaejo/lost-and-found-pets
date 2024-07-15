<template>
  <v-data-table
    :headers="headers"
    :items="productList"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>สินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Button to activate new item dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props" v-on="on">
              เพิ่มสินค้า
            </v-btn>
          </template>
          <!-- Form for adding/editing items -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="ลำดับ"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.type" label="ชื่อ"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.for_pet" label="วันเวลาที่อัพโหลด"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.link_Shopee" label="Shopee Link"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.link_Lazada" label="Lazada Link"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      label="เลือกรูปภาพ"
                      prepend-icon="mdi-camera"
                      variant="filled"
                      @change="onFileChange"
                    ></v-file-input>
                    <v-row v-if="editedItem.image_url">
                      <v-col cols="8">
                        <v-img :src="editedItem.image_url" max-height="100" max-width="100"></v-img>
                      </v-col>
                      <v-col cols="4">
                        <v-btn color="red" @click="removeImage">ลบรูปภาพ</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <!-- Actions for saving or canceling -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">ยกเลิก</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">บันทึก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog for deleting items -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">ยกเลิก</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">ตกลง</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- Custom columns for links and images -->
    <template v-slot:item.link_Shopee="{ item }">
      <a :href="item.link_Shopee" target="_blank">{{ truncateLink(item.link_Shopee) }}</a>
    </template>
    <template v-slot:item.link_Lazada="{ item }">
      <a :href="item.link_Lazada" target="_blank">{{ truncateLink(item.link_Lazada) }}</a>
    </template>
    <template v-slot:item.image_url="{ item }">
      <v-img :src="item.image_url" max-height="100" max-width="100"></v-img>
    </template>
    <!-- Actions column for editing and deleting items -->
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <!-- Button to reset data if no items are present -->
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">รีเซ็ต</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'; 
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'ชื่อ', key: 'name' },
        { title: 'ประเภท', key: 'type' },
        { title: 'สำหรับ', key: 'for_pet' },
        { title: 'Shopee Link', key: 'link_Shopee' },
        { title: 'Lazada Link', key: 'link_Lazada' },
        { title: 'รูปภาพ', key: 'image_url' },
        { title: 'แก้ไข', key: 'actions', sortable: false },
      ],
      productList: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        type: '',
        for_pet: '',
        link_Shopee: '',
        link_Lazada: '',
        image_url: '',
      },
      defaultItem: {
        name: '',
        type: '',
        for_pet: '',
        link_Shopee: '',
        link_Lazada: '',
        image_url: '',
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'เพิ่มสินค้าใหม่' : 'แก้ไขสินค้า';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchProduct();
  },

  methods: {
    fetchProduct() {
      const url = 'http://localhost:5000/api/product/getAll_product';
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.productList = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    },

    editItem(item) {
      this.editedIndex = this.productList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.productList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.productList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productList[this.editedIndex], this.editedItem);
      } else {
        this.productList.push(this.editedItem);
      }
      this.close();
    },

    truncateLink(link) {
      return link.length > 30 ? link.substring(0, 27) + '...' : link;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItem.image_url = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    removeImage() {
      this.editedItem.image_url = '';
    },
  },
};
</script>
