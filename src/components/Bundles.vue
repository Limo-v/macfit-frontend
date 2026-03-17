<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router =useRouter();

  const isLoggedIn = localStorage.getItem('authToken')

  const showBundleDialog = ref(false)

  const selectedBundle = ref(null)
  const selectedPrice = ref(null)

  function showBundle(name, price) {
    if (isLoggedIn) {
      selectedBundle.value = name
      selectedPrice.value = price
      showBundleDialog.value = true
    console.log(selectedBundle.value)
    }
    else {
      router.push('/login')
    }
  }


  function subscribe() {
    const userDetails= JSON.parse(localStorage.getItem('user'))
    userDetails.subscription = {
        name: selectedBundle.value,
        price: selectedPrice.value,
    }
    localStorage.setItem('user', JSON.stringify(userDetails))
    showBundleDialog.value = false
}
  

</script>

<template>
    <v-container class="w-[min(1200px,100%-2rem)] mx-auto mt-10 bg-secondary rounded-3xl p-8">
        <v-row>
            <div class="text-h3 font-weight-bold mb-8">Bundles and Pricing</div>
        </v-row>
        <v-row>
              <div class="text-h6 text-medium-emphasis mb-4"> Click on a bundle to subscribe</div>
        </v-row>
        <v-row>
            <v-col md="3">
                <v-card class="text-center rounded-xl transition-transform duration-200 hover:-translate-y-1" @click="showBundle('Daily Pass', 500)" hover>
                    <v-icon color="#3A4B68" icon="mdi-clock-outline" size="large" class="mt-8"></v-icon>
                    <v-card-title color="#3A4B68">Daily Pass</v-card-title>
                    <v-card-text>500 Ksh</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl transition-transform duration-200 hover:-translate-y-1" @click="showBundle('1 Month', 5500)" hover>
                    <v-icon color="#3A4B68" icon="mdi-calendar-blank" size="large" class="mt-8"></v-icon>
                    <v-card-title color="#3A4B68">1 Month</v-card-title>
                    <v-card-text>5500 Ksh</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl transition-transform duration-200 hover:-translate-y-1" @click="showBundle('3 Months', 15000)" hover>
                    <v-icon color="#3A4B68" icon="mdi-numeric-3-circle-outline" size="large" class="mt-8"></v-icon>
                    <v-card-title color="#3A4B68">3 Months</v-card-title>
                    <v-card-text>15000 Ksh</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl transition-transform duration-200 hover:-translate-y-1" @click="showBundle('6 Months', 25000)" hover>
                    <v-icon color="#3A4B68" icon="mdi-numeric-6-circle-outline" size="large" class="mt-8"></v-icon>
                    <v-card-title color="#3A4B68">6 Months</v-card-title>
                    <v-card-text>25000 Ksh</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12">
                <v-card class="text-center rounded-xl transition-transform duration-200 hover:-translate-y-1"            @click="showBundle('12 Months', 45000)" hover>
                    <v-icon color="#3A4B68" icon="mdi-timer-sand-full" size="large" class="mt-8"></v-icon>
                    <v-card-title color="#3A4B68">12 Months</v-card-title>
                    <v-card-text>45000 Ksh</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-- What's Included -->
     <v-container class="w-[min(1200px,100%-2rem)] mx-auto mt-8 bg-secondary rounded-3xl p-8">
        <v-row>
            <v-col md="12">
                <div class="text-h4 font-weight-bold mb-8">What's included in your bundle</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-food-variant" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">Personalized Meal Plan</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-door" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">24/7 Gym Access</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-weight-lifter" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">World class trainers</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-run" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">Running club</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-hiking" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">Hiking club</v-card-text>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="text-center rounded-xl" hover>
                    <v-icon color="#3A4B68" icon="mdi-bike" size="large" class="mt-8"></v-icon>
                    <v-card-text color="#3A4B68">Cycling club</v-card-text>
                </v-card>
            </v-col>
        </v-row>
     </v-container>
     <!-- How to join -->
     <v-container class="w-[min(1200px,100%-2rem)] mx-auto mt-8 bg-secondary rounded-3xl p-8 mb-10">
        <v-row>
            <v-col>
                <div class="text-h5 font-weight-bold">How to join</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-list>
                    <v-list-item>1. Select your preffered bundle</v-list-item>
                    <v-list-item>2. Fill in the online form</v-list-item>
                    <v-list-item>3. Make a payment</v-list-item>
                    <v-list-item>4. Visit the gym to activate your account</v-list-item>
                </v-list>
            </v-col>
        </v-row>
     </v-container>
     <v-dialog v-model="showBundleDialog" max-width="500">
            <v-card>
                <v-card-title class="text-h5">{{ selectedBundle }}</v-card-title>
                <v-card-text>
                    <div>Price: {{ selectedPrice }} Ksh</div>
                    <div>To subscribe to this bundle, click the subscribe button below and proceed to make a payment</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="subscribe">Subscribe</v-btn>
                    <v-btn text @click="showBundleDialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
</template>
