<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = localStorage.getItem('isLoggedIn')
const isAdmin = true
function logout() {
  localStorage.removeItem('isLoggedIn')
  router.push('/')
}
</script>
<template>
  <v-app-bar color="secondary" dark>
    <v-app-bar-title>
      <router-link to="/">MacFit Gym</router-link>
    </v-app-bar-title>
    <v-btn to="/home" v-if="isLoggedIn">Home</v-btn>
    <v-btn to="/bundles">Bundle</v-btn>
    <v-btn to="/gym_locations">Gym locations</v-btn>
    <v-btn to="/admin" v-if="isAdmin">Admin</v-btn>
    <v-btn icon="mdi-account" v-if="isLoggedIn"
      >P
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn color="primary" to="/profile">Profile</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="primary" @click="logout()">Logout</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn to="/login" v-else>Login</v-btn>
  </v-app-bar>
</template>
