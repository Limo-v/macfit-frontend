<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth'

const { logout } = useAuth()
const router = useRouter()

const isLoggedIn = localStorage.getItem('authToken')
const isAdmin = true
</script>
<template>
  <v-app-bar class="px-3" elevation="2" color="primary">
    <v-app-bar-title class="font-weight-bold tracking-wide">
      <router-link to="/" class="text-white no-underline">MacFit Gym</router-link>
    </v-app-bar-title>
    <v-btn variant="text" to="/homepage" v-if="isLoggedIn">Home</v-btn>
    <v-btn variant="text" to="/bundles">Bundle</v-btn>
    <v-btn variant="text" to="gym_locations">Gym locations</v-btn>
    <v-btn variant="text" to="/admin" v-if="isAdmin">Admin</v-btn>
    <v-btn class="ml-2" icon="mdi-account" v-if="isLoggedIn"
      >P
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn color="primary" variant="text" to="/profile">Profile</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              color="primary"
              variant="text"
              @click="
                () => {
                  logout()
                  router.push('/')
                }
              "
              >logout</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <v-btn color="secondary" to="/login" v-else>Login</v-btn>
  </v-app-bar>
</template>
