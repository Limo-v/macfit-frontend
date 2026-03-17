<script setup>
import { ref } from 'vue';

const userDetails = ref(JSON.parse(localStorage.getItem('user')));

</script>


<template>
    <v-container class="mt-12" style="background-color:#CFD0D6" width="50%">
           <v-row>
                   <v-col md="12">
                            <v-card>
                                   <v-img src="/favicon.ico" class="mt-8" cover></v-img>
                                   <v-card-title class="text-display-small font-weight-medium">{{ userDetails.name }}</v-card-title>
                                   <v-card-text class="text-title-medium font-weight-medium">{{ userDetails.email }}</v-card-text>
                                   <v-card-text class="text-title-medium font-weight-medium">{{ userDetails.phoneNumber }}</v-card-text>
                                    <v-card-text class="text-title-medium font-weight-medium">Subscription: {{ userDetails.subscription.name }} - {{ userDetails.subscription.price }} Ksh</v-card-text>
                            </v-card>
                   </v-col>
           </v-row>
    </v-container>  
</template>