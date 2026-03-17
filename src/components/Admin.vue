<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const token = localStorage.getItem('authToken')
const error = ref('')
const loading = ref(false)
const tab = ref(null)
const showAddUserDialog = ref(false)
const showAddRoleDialog = ref(false)
const showAddEquipmentDialog = ref(false)
const showEditUserDialog = ref(false)

const rules = {
  required: (value) => !!value || 'Required.',
  min: (v) => v.length >= 8 || 'Min 8 characters',
}

//users
//models
const fullName = ref(null)
const firstName = ref(null)
const lastName = ref(null)
const email = ref(null)
const phoneNumber = ref(null)
const gender = ref(null)
const dob = ref(null)
const gymLocation = ref(null)
const users = ref(null)
const userRole = ref(null)

//fetch data
async function fetchUsers() {
  try {
    await api
      .get('users', { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        if (response.data) {
          users.value = response.data
        }
      })
  } catch (err) {
    error.value = err.response?.data?.message || 'Retrieving data failed'
    throw err
  }
}

//add user
async function addUser() {
  const formData = new FormData()
  formData.append('name', firstName.value + ' ' + lastName.value)
  formData.append('email', email.value)
  formData.append('phoneNumber', phoneNumber.value)
  formData.append('dob', dob.value)
  formData.append('gender', gender.value)
  formData.append('gymLocation', gymLocation.value)
  formData.append('role_id', userRole.value)

  try {
    await api
      .post('users', formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        error.value = ''
        loading.value = false
        close()
        fetchUsers()
      })
  } catch (err) {
    error.value = err.response?.data?.message || 'Creating user failed'
    throw err
  }
}

//roles
const roles = ref(null)
//equipment
const equipment = ref(null)
const equipmentName = ref(null)
const usage = ref(null)
const modelNo = ref(null)

//clear reactive model values
function close() {
  showAddUserDialog.value = false
  showEditUserDialog.value = false
  fullName.value = null
  firstName.value = null
  lastName.value = null
  email.value = null
  phoneNumber.value = null
  dob.value = null
  gender.value = null
  gymLocation.value = null
  userRole.value = null
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <v-container class="w-[min(1200px,100%-2rem)] mx-auto mt-10 bg-secondary rounded-3xl p-6">
    <v-card class="rounded-3xl" elevation="3">
      <v-tabs v-model="tab" align-tabs="center" color="primary">
        <v-tab :value="1">Users</v-tab>
        <v-tab :value="2">Roles</v-tab>
        <v-tab :value="3">Equipment</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <!-- Users -->
        <v-tabs-window-item :value="1">
          <div
            v-if="users == null || users == undefined || Object.keys(users).length == 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <div class="text-h6">No users found</div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn
                  class="ma-2"
                  color="blue-darken-2"
                  icon="mdi-plus"
                  @click="showAddUserDialog = true"
                ></v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-container>
              <v-row>
                <v-col cols="12" md="12" sm="12" align="right">
                  <v-btn
                    class="ma-2"
                    color="primary"
                    icon="mdi-plus"
                    @click="showAddUserDialog = true"
                  ></v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Phone</th>
                        <th class="text-left">DOB</th>
                        <th class="text-left">Gender</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Gym Location</th>
                        <th class="text-center" colspan="3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in users" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.phoneNumber }}</td>
                        <td>{{item.dob }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.role }}</td>
                        <td>{{ item.gymLocation }}</td>
                        <td>
                          <v-btn color="success" size="small" @click="changeRole(item)"
                            ><v-icon icon="mdi-pencil"></v-icon> Change Role</v-btn
                          >
                        </td>
                        <td v-if="item.deleted_at == null">
                          <v-btn color="primary" size="small" @click="editUser(item)"
                            ><v-icon icon="mdi-pencil"></v-icon> Edit User</v-btn
                          >
                        </td>
                        <td v-if="item.deleted_at == null">
                          <v-btn color="error" size="small"
                            ><v-icon icon="mdi-account-cancel"></v-icon> Deactivate</v-btn
                          >
                        </td>

                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>
        <!-- Roles -->
        <v-tabs-window-item :value="2">
          <div
            v-if="roles == null || roles == undefined || Object.keys(roles).length == 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <div class="text-h6">No roles found</div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn
                  class="ma-2"
                  color="primary"
                  icon="mdi-plus"
                  @click="showAddRoleDialog = true"
                ></v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-container>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Abilities</th>
                        <th class="text-left">No of Users</th>
                        <th class="text-center" colspan="3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in roles" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.abilities }}</td>
                        <td>{{ item.noOfUsers }}</td>
                        <td v-if="item.deleted_at == null">
                          <v-btn color="primary" size="small" @click="editRole(item)"
                            ><v-icon icon="mdi-pencil"></v-icon> Edit User</v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>
        <!-- Equipment -->
        <v-tabs-window-item :value="3">
          <div
            v-if="equipment == null || equipment == undefined || Object.keys(equipment).length == 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <div class="text-h6">No equipment found</div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn
                  class="ma-2"
                  color="primary"
                  icon="mdi-plus"
                  @click="showAddEquipmentDialog = true"
                ></v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-container>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Model No</th>
                        <th class="text-left">Value</th>
                        <th class="text-left">Usage</th>
                        <th class="text-left">Status</th>
                        <th class="text-center" colspan="3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in equipment" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.model_no }}</td>
                        <td>{{ item.value }}</td>
                        <td>{{ item.usage }}</td>
                        <td>{{ item.status }}</td>
                        <td v-if="item.deleted_at == null">
                          <v-btn color="primary" size="small" @click="editEquipment(item)"
                            ><v-icon icon="mdi-pencil"></v-icon> Edit User</v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
  <!-- Add User Dialog -->
  <v-dialog v-model="showAddUserDialog" max-width="700">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Add User
            <v-spacer></v-spacer>
            <v-btn class="ma-2" color="primary" icon="mdi-close" @click="close()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="6">
              <v-text-field
                label="First Name"
                v-model="firstName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                label="Last Name"
                v-model="lastName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="6">
              <v-text-field
                label="Email"
                v-model="email"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                label="Phone Number"
                v-model="phoneNumber"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                label="Gym Location"
                :items="['CBD', 'Madaraka', 'Westlands', 'Buruburu']"
                variant="outlined"
                v-model="gymLocation"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-date-input
                label="Date of Birth"
                v-model="dob"
                required
                :rules="[rules.required]"
              ></v-date-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2" sm="6"> Role: </v-col>
            <v-col cols="12" md="10" sm="6">
              <v-radio-group v-model="userRole" :rules="[rules.required]" inline>
                <v-radio label="Admin" value="1"></v-radio>
                <v-radio label="Trainer" value="2"></v-radio>
                <v-radio label="Staff" value="3"></v-radio>
                <v-radio label="User" value="4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2" sm="6"> Gender: </v-col>
            <v-col cols="12" md="10" sm="6">
              <v-radio-group v-model="gender" :rules="[rules.required]" inline>
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="close()"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="addUser()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <!-- Edit User Dialog -->
  <v-dialog v-model="showEditUserDialog" max-width="700">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Edit User
            <v-spacer></v-spacer>
            <v-btn class="ma-2" color="primary" icon="mdi-close" @click="close()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Name"
                v-model="firstName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="2" sm="6"> Role: </v-col>
            <v-col cols="12" md="10" sm="6">
              <v-radio-group v-model="userRole" :rules="[rules.required]">
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <v-radio label="Admin" value="2"></v-radio>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-radio label="Healthcare Provider" value="3"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Email"
                v-model="email"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Phone"
                v-model="phoneNumber"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="close()"></v-btn>
          <v-btn
            color="primary"
            type="submit"
            text="Update"
            variant="tonal"
            @click="updateUser()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
