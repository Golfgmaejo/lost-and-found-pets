<template>
    <v-container>
      <v-main>
        <v-row justify="center" class="mt-10">
          <v-col cols="12" md="8">
            <v-card v-if="animal">
              <v-img :src="animal.image" height="400px"></v-img>
              <v-card-title class="text-h4">{{ animal.name }}</v-card-title>
              <v-card-subtitle>สายพันธุ์: {{ animal.breed }}</v-card-subtitle>
              <v-card-subtitle>เพศ: {{ animal.gender }} | อายุ: {{ animal.age }}</v-card-subtitle>
              <v-card-text>
                <div>รางวัล: {{ formatCurrency(animal.reward) }}</div>
                <div>วันที่หาย: {{ animal.lostDate }}</div>
                <div>สถานที่หาย: {{ animal.lostLocation }}</div>
              </v-card-text>
            </v-card>
            <v-alert v-else type="error">
              ไม่พบข้อมูลสัตว์เลี้ยงที่คุณต้องการ
            </v-alert>
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const animalId = route.params.id; // ดึง id จาก URL
  
  // ฟังก์ชันสำหรับจัดฟอร์แมตค่าเงิน
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
  };
  
  // Mock data, same as the one used in the main page
  const mockupData = [
    {
      name: "สุนัขชื่อบ๊อบ",
      image: "https://inwfile.com/s-gf/vzykf4.jpg",
      breed: "ชิวาวา",
      gender: "ผู้",
      age: "2 ปี",
      reward: 5000,
      lostDate: "1 มกราคม 2024",
      lostLocation: "กรุงเทพฯ",
    },
    {
      name: "แมวชื่อมิว",
      image: "https://example.com/cat.jpg",
      breed: "เปอร์เซีย",
      gender: "เมีย",
      age: "3 ปี",
      reward: 3000,
      lostDate: "15 กุมภาพันธ์ 2024",
      lostLocation: "เชียงใหม่",
    },
    {
      name: "กระต่ายชื่อฮอป",
      image: "https://example.com/rabbit.jpg",
      breed: "ฮอลแลนด์ ลอป",
      gender: "ผู้",
      age: "1 ปี",
      reward: 1500,
      lostDate: "20 มีนาคม 2024",
      lostLocation: "ภูเก็ต",
    },
    {
      name: "นกชื่อทวิตเตอร์",
      image: "https://example.com/bird.jpg",
      breed: "เลิฟเบิร์ด",
      gender: "เมีย",
      age: "6 เดือน",
      reward: 1000,
      lostDate: "10 เมษายน 2024",
      lostLocation: "หาดใหญ่",
    },
    {
      name: "แมวชื่อมะลิ",
      image: "https://example.com/white-cat.jpg",
      breed: "ไทย",
      gender: "เมีย",
      age: "4 ปี",
      reward: 2000,
      lostDate: "5 พฤษภาคม 2024",
      lostLocation: "พัทยา",
    },
    {
      name: "สุนัขชื่อชิโร่",
      image: "https://example.com/shiba.jpg",
      breed: "ชิบะ อินุ",
      gender: "ผู้",
      age: "1.5 ปี",
      reward: 4000,
      lostDate: "25 มิถุนายน 2024",
      lostLocation: "นครราชสีมา",
    },
    {
      name: "นกแก้วชื่อเรนโบว์",
      image: "https://example.com/parrot.jpg",
      breed: "นกแก้วมาคอว์",
      gender: "ผู้",
      age: "2 ปี",
      reward: 2500,
      lostDate: "8 กรกฎาคม 2024",
      lostLocation: "กรุงเทพฯ",
    },
    {
      name: "กระต่ายชื่อซูซี่",
      image: "https://example.com/bunny.jpg",
      breed: "มินิ เร็กซ์",
      gender: "เมีย",
      age: "8 เดือน",
      reward: 1800,
      lostDate: "30 สิงหาคม 2024",
      lostLocation: "ลำพูน",
    },
    {
      name: "แมวชื่อสโนว์",
      image: "https://example.com/snow-cat.jpg",
      breed: "สก็อตติช โฟลด์",
      gender: "ผู้",
      age: "2.5 ปี",
      reward: 3500,
      lostDate: "15 กันยายน 2024",
      lostLocation: "สุราษฎร์ธานี",
    },
    {
      name: "สุนัขชื่อโคล่า",
      image: "https://example.com/pug.jpg",
      breed: "ปั๊ก",
      gender: "เมีย",
      age: "3 ปี",
      reward: 2200,
      lostDate: "28 ตุลาคม 2024",
      lostLocation: "ชลบุรี",
    },
  ];
  
  const animal = ref(null);
  
  onMounted(() => {
    const id = parseInt(animalId);
    if (id >= 0 && id < mockupData.length) {
      animal.value = mockupData[id];
    }
  });
  </script>
  