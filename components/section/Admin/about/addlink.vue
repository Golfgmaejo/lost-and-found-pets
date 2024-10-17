<template>
    <v-container>
      <h1>เพิ่มข้อมูลเกี่ยวกับเรา</h1>
      <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
        <v-text-field
          v-model="aboutData.title"
          label="หัวเรื่อง"
          :rules="[rules.required]"
          required
        ></v-text-field>
  
        <v-textarea
          v-model="aboutData.description"
          label="รายละเอียด"
          :rules="[rules.required]"
          required
        ></v-textarea>
  
        <v-file-input
          v-model="aboutData.image"
          label="อัพโหลดรูปภาพ"
          prepend-icon="mdi-camera"
          accept="image/*"
          :rules="[rules.required]"
          required
        ></v-file-input>
  
        <h2>ผู้สนับสนุน</h2>
        <v-text-field
          v-model="newSupporter.name"
          label="ชื่อผู้สนับสนุน"
          :rules="[rules.required]"
        ></v-text-field>
        <v-file-input
          v-model="newSupporter.logo"
          label="อัพโหลดโลโก้ผู้สนับสนุน"
          prepend-icon="mdi-camera"
          accept="image/*"
        ></v-file-input>
        <v-btn @click="addSupporter">เพิ่มผู้สนับสนุน</v-btn>
  
        <v-list>
          <v-list-item
            v-for="(supporter, index) in aboutData.supporters"
            :key="index"
          >
            <v-list-item-content>{{ supporter.name }}</v-list-item-content>
          </v-list-item>
        </v-list>
  
        <v-btn :disabled="!valid" type="submit">บันทึกข้อมูล</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  // ข้อมูลเกี่ยวกับหน้า "เกี่ยวกับเรา"
  const aboutData = ref({
    title: '',
    description: '',
    image: null,
    supporters: []
  })
  
  // ผู้สนับสนุนใหม่
  const newSupporter = ref({
    name: '',
    logo: null
  })
  
  // การตรวจสอบฟอร์ม
  const valid = ref(false)
  const rules = {
    required: value => !!value || 'จำเป็นต้องกรอกข้อมูล'
  }
  
  // ฟังก์ชันเพิ่มผู้สนับสนุน
  const addSupporter = () => {
    if (newSupporter.value.name && newSupporter.value.logo) {
      aboutData.value.supporters.push({
        ...newSupporter.value
      })
      newSupporter.value = { name: '', logo: null }
    }
  }
  
  // ฟังก์ชันสำหรับการอัพโหลดไฟล์รูปภาพ
  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await axios.post('https://your-backend-api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response.data.url // URL ของรูปที่ได้จากการอัพโหลด
  }
  
  // ฟังก์ชันส่งข้อมูลไปยัง API
  const submitForm = async () => {
    try {
      // อัพโหลดรูปภาพหลัก
      const imageUrl = await uploadImage(aboutData.value.image)
      aboutData.value.image = imageUrl
  
      // อัพโหลดโลโก้ของผู้สนับสนุน
      const supportersWithUrls = await Promise.all(
        aboutData.value.supporters.map(async (supporter) => {
          const logoUrl = await uploadImage(supporter.logo)
          return { ...supporter, logo: logoUrl }
        })
      )
      aboutData.value.supporters = supportersWithUrls
  
      // ส่งข้อมูลไปยัง API
      await axios.post('https://your-backend-api/about', aboutData.value)
  
      alert('บันทึกข้อมูลเรียบร้อย')
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  