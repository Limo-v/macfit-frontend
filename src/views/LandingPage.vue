<script setup></script>

<template>
  <v-container fluid class="w-[min(1200px,100%-2rem)] mx-auto mt-6">
    <v-row>
      <v-col cols="12">
        <v-carousel class="rounded-3xl overflow-hidden" hide-delimiters>
          <v-carousel-item src="/images/carousel1.jpg" cover></v-carousel-item>
          <v-carousel-item src="/images/carousel2.jpg" cover></v-carousel-item>
          <v-carousel-item src="/images/carousel3.jpg" cover></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>

  <!-- About Us -->
  <v-container fluid class="w-[min(1200px,100%-2rem)] mx-auto mt-8 bg-secondary rounded-3xl p-8">
    <v-row>
      <v-col md="8" class="text-center">
        <div class="text-display-medium mb-12">
          Welcome to MacFit Gym, a world class gym in Nairobi
        </div>
        <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
          At MacFit, fitness is more than just a workout—it’s a lifestyle. Our gym is designed to
          help individuals of all fitness levels achieve their health and wellness goals in a
          supportive and motivating environment. Whether you are starting your fitness journey or
          pushing toward new performance milestones, MacFit provides the space, equipment, and
          energy you need to succeed.
        </div>
        <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
          Our facility is equipped with modern strength and cardio equipment, functional training
          areas, and expert guidance to help you train effectively and safely. From weight training
          and high-intensity workouts to endurance and flexibility training, MacFit offers a dynamic
          environment where every member can find the right routine for their goals.
        </div>
        <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
          At MacFit, community is at the heart of everything we do. Our trainers and members create
          an encouraging atmosphere where motivation and progress go hand in hand. Join MacFit and
          become part of a fitness community that inspires you to stay active, build strength, and
          live healthier every day.
        </div>
        <v-btn color="primary">LEARN MORE</v-btn>
      </v-col>
      <v-col md="4">
        <v-container class="d-flex align-center justify-center fill-height">
          <v-img src="/aboutsus.png" class="rounded-lg" cover></v-img>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <!-- Latest News -->
  <v-container fluid class="w-[min(1200px,100%-2rem)] mx-auto mt-8">
    <v-row>
      <v-col md="4">
        <v-card
          class="h-100 rounded-xl transition-transform duration-200 hover:-translate-y-1"
          rounded="xl"
          elevation="3"
        >
          <v-img src="/news1.jpg" height="220" cover></v-img>
          <v-card-title>Have you gone for a Walk?</v-card-title>
          <v-card-text
            >Walking is a great form of exercise which allows you reset, recharge and re-energise
            your body after a long day</v-card-text
          >
          <v-card-actions><v-btn color="primary" variant="text">READ MORE</v-btn></v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card
          class="h-100 rounded-xl transition-transform duration-200 hover:-translate-y-1"
          rounded="xl"
          elevation="3"
        >
          <v-img src="/news2.jpg" height="220" cover></v-img>
          <v-card-title>Yoga for stretching</v-card-title>
          <v-card-text
            >Yoga is a holistic practice that combines physical postures, breathing techniques, and
            mindfulness to improve strength, flexibility, and overall well-being.</v-card-text
          >
          <v-card-actions><v-btn color="primary" variant="text">READ MORE</v-btn></v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card
          class="h-100 rounded-xl transition-transform duration-200 hover:-translate-y-1"
          rounded="xl"
          elevation="3"
        >
          <v-img src="/news3.jpg" height="220" cover></v-img>
          <v-card-title>Nutrition and Exercise</v-card-title>
          <v-card-text
            >After exercising, it is important to eat nutritious meals that replenish energy,
            support muscle recovery, and help the body restore essential nutrients.</v-card-text
          >
          <v-card-actions><v-btn color="primary" variant="text">READ MORE</v-btn></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Reviews -->
  <v-container fluid class="w-[min(1200px,100%-2rem)] mx-auto mt-8">
    <v-row>
      <v-col md="3">
        <v-card class="p-2" color="secondary" rounded="xl">
          <v-card-text> MacFit is the best gym in Nairobi</v-card-text>
          <v-rating :length="5" :size="32" :model-value="5" active-color="primary"></v-rating>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="p-2" color="secondary" rounded="xl">
          <v-card-text> I loved the trainers and the equipment in the gym</v-card-text>
          <v-rating :length="5" :size="32" :model-value="4" active-color="primary"></v-rating>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="p-2" color="secondary" rounded="xl">
          <v-card-text> This is a good gym with nice trainers and classes</v-card-text>
          <v-rating :length="5" :size="32" :model-value="3" active-color="primary"></v-rating>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="p-2" color="secondary" rounded="xl">
          <v-card-text> I love MacFit, I can't wait to be back</v-card-text>
          <v-rating :length="5" :size="32" :model-value="5" active-color="primary"></v-rating>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Contact Us -->
  <v-container fluid class="w-[min(1200px,100%-2rem)] mx-auto mt-8 bg-secondary rounded-3xl p-8">
    <v-row class="text-center">
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">Get in Touch</div>
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
        0712 345 678 | macfitgym@example.com
      </div>
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">Opening Hours</div>
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
        Mon-Fri: 5.00am - 9.00pm | Sat: 5.30am - 6pm | Sun: 8.00am - 2.00pm
      </div>
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
        MacFit Gym, 3rd Floor, Nairobi Mall, Nairobi Road
      </div>
      <div class="text-title-large font-weight-light text-medium-emphasis mb-8">
        &copy; 2025 MacFit Gym. Designed by Kipbett
      </div>
    </v-row>
  </v-container>
</template>
