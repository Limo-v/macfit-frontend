<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth'

const router = useRouter()

const { login, loading, error } = useAuth()

const rules = {
  required: (value) => !!value || 'Required.',
  min: (v) => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => `The email and password you entered don't match`,
}

const show1 = ref(false)
const show2 = ref(true)
const password = ref(null)
const username = ref(null)

async function handleLogin() {
  if (!username.value || !password.value) {
    console.error('Email and password are required')
    return
  }

  try {
    await login({
      email: username.value,
      password: password.value,
    })

    // Redirect after successful login
    router.push('/homepage').then(() => {
      router.go(0) // Reloads the current route
    })
  } catch (err) {
    // Error is already handled by the auth service
    console.error('Login failed', err)
  }
}
</script>

<template>
  <v-container class="w-[min(900px,100%-2rem)] mx-auto mt-10">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-form class="bg-secondary rounded-3xl p-8 shadow-sm" @submit.prevent="handleLogin">
          <v-row>
            <v-col md="12" class="d-flex justify-center">
              <v-img src="/LOGO.png" width="90"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="text-center">
              <div class="text-h4 font-weight-bold">Welcome back to Macfit Gym</div>
            </v-col>
          </v-row>
          <v-alert v-if="error" type="error" variant="tonal" density="comfortable" class="mb-4">{{
            error
          }}</v-alert>
          <v-row>
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Username</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                variant="outlined"
                v-model="username"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Password</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                variant="outlined"
                hide-details="auto"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="d-flex justify-center">
              <v-btn color="primary" variant="elevated" :loading="loading" @click="handleLogin"
                >Log in</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="text-center">
              <div>
                New to MacFit Gym?
                <router-link to="/signUp">Create an account</router-link>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
