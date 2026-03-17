<script setup>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { ref, onMounted } from 'vue'

const cbdMap = ref(null)
const madarakaMap = ref(null)
const westlandsMap = ref(null)
const buruburuMap = ref(null)

onMounted(() => {
  cbdMap.value = L.map('cbd-map').setView([-1.2953145569779758, 36.817184449599566], 10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(cbdMap.value)
  L.marker([-1.3073328374609299, 36.81211146039793]).addTo(cbdMap.value)

  madarakaMap.value = L.map('madaraka-map').setView([-1.303, 36.85], 10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(madarakaMap.value)
  L.marker([-1.303, 36.85]).addTo(madarakaMap.value)

  westlandsMap.value = L.map('westlands-map').setView([-1.283, 36.816], 10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(westlandsMap.value)
  L.marker([-1.283, 36.816]).addTo(westlandsMap.value)

  buruburuMap.value = L.map('buruburu-map').setView([-1.292, 36.88], 10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(buruburuMap.value)
  L.marker([-1.292, 36.88]).addTo(buruburuMap.value)
})
</script>

<template>
  <v-container class="w-[min(1200px,100%-2rem)] mx-auto mt-10 mb-10">
    <v-row>
      <v-col>
        <div class="text-h3 font-weight-bold mb-6">Our Locations</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="rounded-3xl pa-2" elevation="3">
          <v-row>
            <v-col md="4">
              <v-card-text class="text-h6 font-weight-medium">CBD</v-card-text>
            </v-col>
            <v-col md="8">
              <div id="cbd-map" class="h-[30vh] rounded-xl overflow-hidden"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <v-card-text class="text-h6 font-weight-medium">Madaraka</v-card-text>
            </v-col>
            <v-col md="8">
              <div id="madaraka-map" class="h-[30vh] rounded-xl overflow-hidden"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <v-card-text class="text-h6 font-weight-medium">Westlands</v-card-text>
            </v-col>
            <v-col md="8">
              <div id="westlands-map" class="h-[30vh] rounded-xl overflow-hidden"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <v-card-text class="text-h6 font-weight-medium">Buruburu</v-card-text>
            </v-col>
            <v-col md="8">
              <div id="buruburu-map" class="h-[30vh] rounded-xl overflow-hidden"></div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
