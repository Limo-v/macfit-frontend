<script setup>
import { ref } from 'vue'

const userDetails = ref(JSON.parse(localStorage.getItem('user')))
</script>

<template>
  <v-container class="w-[min(900px,100%-2rem)] mx-auto mt-10 bg-secondary rounded-3xl p-8">
    <v-row>
      <v-col md="12">
        <v-card class="rounded-3xl p-4" elevation="3">
          <v-img
            src="/favicon.ico"
            class="mt-2 rounded-circle mx-auto"
            max-width="120"
            cover
          ></v-img>
          <v-card-title class="text-h4 font-weight-bold text-center">{{
            userDetails.name
          }}</v-card-title>
          <v-card-text class="text-h6 font-weight-medium text-center">{{
            userDetails.email
          }}</v-card-text>
          <v-card-text class="text-h6 font-weight-medium text-center">{{
            userDetails.phoneNumber
          }}</v-card-text>
          <v-card-text class="text-h6 font-weight-medium text-center"
            >Subscription: {{ userDetails.subscription.name }} -
            {{ userDetails.subscription.price }} Ksh</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
