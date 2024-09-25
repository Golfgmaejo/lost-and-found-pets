<template>
    <v-container>
      <v-autocomplete
        v-model="selectedProvince"
        :items="provinces"
        item-text="name_th"
        item-value="id"
        label="เลือกจังหวัด"
        return-object
        clearable
      ></v-autocomplete>
  
      <v-autocomplete
        v-model="selectedAmphure"
        :items="selectedProvince?.amphure || []"
        item-text="name_th"
        item-value="id"
        label="เลือกอำเภอ"
        return-object
        clearable
        :disabled="!selectedProvince"
      ></v-autocomplete>
  
      <v-autocomplete
        v-model="selectedTambon"
        :items="selectedAmphure?.tambon || []"
        item-text="name_th"
        item-value="id"
        label="เลือกตำบล"
        return-object
        clearable
        :disabled="!selectedAmphure"
      ></v-autocomplete>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedProvince: null,
        selectedAmphure: null,
        selectedTambon: null,
        provinces: [] // จะเก็บข้อมูลจังหวัด
      };
    },
    mounted() {
      this.fetchProvinces();
    },
    methods: {
      async fetchProvinces() {
        try {
          const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json');
          this.provinces = await response.json();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  