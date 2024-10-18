<template>
    <v-container>
      <v-alert type="info">
        สามารถย้ายหมุดได้
      </v-alert>
      <LMap :zoom="zoom" :center="center" style="height: 350px; width: 100%;">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LMarker :lat-lng="[markerLatLng.lat, markerLatLng.lng]" draggable @moveend="onMarkerMoveEnd">
        </LMarker>
      </LMap>
      <v-text-field v-model="markerLatLng.lat" label="Latitude" />
      <v-text-field v-model="markerLatLng.lng" label="Longitude" />
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeMount } from 'vue'
  
  const zoom = ref(16) // Zoom level set to show approximately 1000ft radius
  const center = ref([15.8700, 100.9925]) // Default to Thailand's center initially
  const markerLatLng = ref({ lat: 15.8700, lng: 100.9925 })
  
  const onMarkerMoveEnd = (event) => {
    const { lat, lng } = event.target.getLatLng()
    markerLatLng.value = { lat, lng }
    // Store marker coordinates in localStorage
    localStorage.setItem('markerCoords', JSON.stringify({ lat, lng }))
  }
  
  onBeforeMount(() => {
    // Retrieve marker coordinates from localStorage if available
    const storedCoords = localStorage.getItem('markerCoords')
    if (storedCoords) {
      const { lat, lng } = JSON.parse(storedCoords)
      center.value = [lat, lng]
      markerLatLng.value = { lat, lng }
    }
  })
  
  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        center.value = [latitude, longitude]
        markerLatLng.value = { lat: latitude, lng: longitude }
        // Store initial marker coordinates in localStorage
        localStorage.setItem('markerCoords', JSON.stringify({ lat: latitude, lng: longitude }))
      })
    }
  })
  </script>
  