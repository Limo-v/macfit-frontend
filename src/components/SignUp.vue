<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth'

const router = useRouter()
const { register, loading, error } = useAuth()

const rules = {
  required: (value) => !!value || 'Required.',
  min: (v) => v.length >= 8 || 'Min 8 characters',
  passwordMatch: () => password === confirmPassword || 'Passwords must match',
}

const show1 = ref(false)
const show2 = ref(true)
const password = ref(null)

const confirmPassword = ref(null)
const show1confirm = ref(false)

//models
const firstName = ref(null)
const lastName = ref(null)
const email = ref(null)
const phoneNumber = ref(null)
const gender = ref(null)
const dob = ref(null)
const gymLocation = ref(null)

const signUp = async () => {
  loading.value = true
  error.value = ''

  const formData = new FormData()
  formData.append('name', firstName.value + ' ' + lastName.value)
  formData.append('email', email.value)
  formData.append('phoneNumber', phoneNumber.value)
  formData.append('dob', dob.value)
  formData.append('gender', gender.value)
  formData.append('gymLocation', gymLocation.value)
  formData.append('password', password.value)
  formData.append('role_id', 4)

  try {
    await register(formData)

    // Redirect after successful signup
    router.push('/homepage').then(() => {
      router.go(0) // Reloads the current route
    })
  } catch (err) {
    // Error is already handled by the auth service
    console.error('Sign up failed', err)
  }
}
</script>

<template>
  <v-container class="w-[min(1000px,100%-2rem)] mx-auto mt-10">
    <v-row justify="center">
      <v-col cols="12" md="9" lg="8">
        <v-form class="bg-secondary rounded-3xl p-8 shadow-sm" @submit.prevent="signUp">
          <v-row>
            <v-col md="12" class="d-flex justify-center">
              <v-img src="/LOGO.png" width="90"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="text-center">
              <div class="text-h4 font-weight-bold">Sign up to Macfit Gym</div>
            </v-col>
          </v-row>
          <v-alert v-if="error" type="error" variant="tonal" density="comfortable" class="mb-4">{{
            error
          }}</v-alert>
          <v-row>
            <!--firstname-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Firstname</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                variant="outlined"
                v-model="firstName"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--lastname-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Lastname</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                variant="outlined"
                v-model="lastName"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--Email-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Email</div>
            </v-col>
            <v-col md="6">
              <v-text-field variant="outlined" v-model="email" hide-details="auto"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--Phone Number-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Phone Number</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                variant="outlined"
                type="number"
                v-model="phoneNumber"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--Gender-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Gender</div>
            </v-col>
            <v-col md="6">
              <v-radio-group inline v-model="gender">
                <v-radio label="Male" value="male"></v-radio>
                <v-radio label="Female" value="female"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <!--Date of Birth-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Date of Birth</div>
            </v-col>
            <v-col md="6">
              <v-date-input variant="outlined" v-model="dob"></v-date-input>
            </v-col>
          </v-row>
          <v-row>
            <!--Gym location-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Gym location</div>
            </v-col>
            <v-col md="6">
              <v-select
                label="Select"
                :items="['CBD', 'Madaraka', 'Westlands', 'Buruburu']"
                variant="outlined"
                v-model="gymLocation"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <!--Password-->
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
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--Confirm Password-->
            <v-col md="6" class="d-flex align-center justify-md-end">
              <div class="text-title-medium font-weight-medium">Confirm Password</div>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="confirmPassword"
                :append-icon="show1confirm ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.passwordMatch]"
                :type="show1confirm ? 'text' : 'password'"
                variant="outlined"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="d-flex justify-center">
              <v-btn color="primary" variant="elevated" :loading="loading" @click="signUp"
                >Sign Up</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="text-center">
              <div>
                Already have an account?
                <router-link to="/login">Back to login</router-link>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
