<template>
  <v-container>
    <!-- Autocomplete for Province -->
    <v-autocomplete
      v-model="selectedProvince"
      :items="provinces"
      item-title="name_th"
      item-value="id"
      label="Select Province"
      @change="onProvinceChange"
    ></v-autocomplete>

    <!-- Autocomplete for Amphure -->
    <v-autocomplete
      ref="amphureAutocomplete"
      v-model="selectedAmphure"
      :items="amphures"
      item-title="name_th"
      item-value="id"
      label="Select Amphure"
      @change="onAmphureChange"
      :disabled="!selectedProvince"
    ></v-autocomplete>

    <!-- Autocomplete for Tambon -->
    <v-autocomplete
      ref="tambonAutocomplete"
      v-model="selectedTambon"
      :items="tambons"
      item-title="name_th"
      item-value="id"
      label="Select Tambon"
      :disabled="!selectedAmphure"
    ></v-autocomplete>

    <!-- Display Zip Code -->
    <div v-if="selectedTambon">
      <p>Zip Code: {{ selectedTambon.zip_code }}</p> <!-- Display as integer -->
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      provinces: [],
      selectedProvince: null,
      selectedAmphure: null,
      selectedTambon: null,
    }
  },
  computed: {
    amphures() {
      const province = this.provinces.find(p => p.id === this.selectedProvince)
      return province ? province.amphure : []
    },
    tambons() {
      const amphure = this.amphures.find(a => a.id === this.selectedAmphure)
      return amphure ? amphure.tambon : []
    },
  },
  methods: {
    async fetchProvinces() {
      const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
      this.provinces = await response.json()
    },
    onProvinceChange() {
      // Clear selected amphure and tambon when province changes
      this.selectedAmphure = null
      this.selectedTambon = null
      
      // Clear items in amphure and tambon autocomplete
      this.$refs.amphureAutocomplete.items = []
      this.$refs.tambonAutocomplete.items = []
    },
    onAmphureChange() {
      // Clear selected tambon when amphure changes
      this.selectedTambon = null
    },
  },
  mounted() {
    this.fetchProvinces()
  },
}
</script>

<style scoped>
/* ใส่ CSS ตามต้องการ */
</style>
