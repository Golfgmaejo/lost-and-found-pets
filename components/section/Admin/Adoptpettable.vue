<template>
  <v-data-table
    :headers="headers"
    :items="petList"
    :sort-by="[{ key: 'notice_date', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>หาบ้าน</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props" v-on="on">
              เพิ่มข้อมูล
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.gender" label="เพศ"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.color" label="สี"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.breed" label="สายพันธุ์"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.notice_date" label="วันที่พบ"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.time" label="เวลาที่พบ"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.detail" label="รายละเอียด"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.location" label="สถานที่"></v-text-field>
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">ยกเลิก</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">บันทึก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?</v-card-title>
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
    <template v-slot:item.image_url="{ item }">
      <v-img :src="item.image_url" max-height="100" max-width="100"></v-img>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">รีเซ็ต</v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';

const dialog = ref(false);
const dialogDelete = ref(false);

const headers = [
  { title: 'เพศ', key: 'gender' },
  { title: 'สี', key: 'color' },
  { title: 'สายพันธุ์', key: 'breed' },
  { title: 'วันที่พบ', key: 'notice_date' },
  { title: 'เวลา', key: 'time' },
  { title: 'รายละเอียด', key: 'detail' },
  { title: 'สถานที่', key: 'location' },
  { title: 'รูปภาพ', key: 'image_url' },
  { title: 'แก้ไข', key: 'actions', sortable: false },
];

const petList = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  gender: '',
  color: '',
  breed: '',
  notice_date: '',
  time: '',
  detail: '',
  location: '',
  image_url: '',
});
const defaultItem = {
  gender: '',
  color: '',
  breed: '',
  notice_date: '',
  time: '',
  detail: '',
  location: '',
  image_url: '',
};

const formTitle = computed(() => (editedIndex.value === -1 ? 'เพิ่มข้อมูลใหม่' : 'แก้ไขข้อมูล'));

onMounted(() => {
  fetchPets();
});

const fetchPets = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/adopt_pet/getAll_adopt_pet');
    petList.value = response.data.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
};

const editItem = (item) => {
  editedIndex.value = petList.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = petList.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  petList.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
  Object.assign(editedItem, defaultItem);
  editedIndex.value = -1;
};

const closeDelete = () => {
  dialogDelete.value = false;
  Object.assign(editedItem, defaultItem);
  editedIndex.value = -1;
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(petList.value[editedIndex.value], editedItem);
  } else {
    petList.value.push(editedItem);
  }
  close();
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editedItem.image_url = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  editedItem.image_url = '';
};

const initialize = () => {
  petList.value = [];
};

</script>
