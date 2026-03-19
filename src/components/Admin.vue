<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const token = localStorage.getItem('authToken')
const error = ref('')
const loading = ref(false)
const tab = ref(null)

const rules = {
  required: (value) => !!value || 'Required.',
  min: (v) => v.length >= 8 || 'Min 8 characters',
  numeric: (v) => !isNaN(parseFloat(v)) || 'Must be a number',
}

// ─────────────────────────────────────────
// USERS
// ─────────────────────────────────────────
const showAddUserDialog = ref(false)
const showEditUserDialog = ref(false)

const firstName = ref(null)
const lastName = ref(null)
const email = ref(null)
const phoneNumber = ref(null)
const gender = ref(null)
const dob = ref(null)
const gymLocation = ref(null)
const users = ref(null)
const userRole = ref(null)
const userIdNo = ref(null)
const selectedUser = ref(null)

async function fetchUsers() {
  try {
    const response = await api.get('users', { headers: { Authorization: `Bearer ${token}` } })
    if (response.data) users.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Retrieving users failed'
  }
}

async function addUser() {
  const formData = new FormData()
  formData.append('name', firstName.value + ' ' + lastName.value)
  formData.append('email', email.value)
  formData.append('idNo', userIdNo.value ?? '')
  formData.append('phoneNumber', phoneNumber.value)
  formData.append('dob', dob.value)
  formData.append('gender', gender.value)
  formData.append('gymLocation', gymLocation.value)
  formData.append('role_id', userRole.value)
  try {
    await api.post('users', formData, { headers: { Authorization: `Bearer ${token}` } })
    error.value = ''
    closeUser()
    fetchUsers()
  } catch (err) {
    error.value = err.response?.data?.message || 'Creating user failed'
  }
}

function editUser(item) {
  selectedUser.value = item
  firstName.value = item.name
  email.value = item.email
  userIdNo.value = item.idNo
  phoneNumber.value = item.phoneNumber
  gender.value = item.gender
  dob.value = item.dob
  gymLocation.value = item.gymLocation
  userRole.value = String(item.role_id)
  showEditUserDialog.value = true
}

async function updateUser() {
  try {
    await api.put(
      `users/${selectedUser.value.id}`,
      {
        name: firstName.value,
        email: email.value,
        idNo: userIdNo.value,
        phoneNumber: phoneNumber.value,
        gender: gender.value,
        dob: dob.value,
        gymLocation: gymLocation.value,
        role_id: userRole.value,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    error.value = ''
    closeUser()
    fetchUsers()
  } catch (err) {
    error.value = err.response?.data?.message || 'Updating user failed'
  }
}

function closeUser() {
  showAddUserDialog.value = false
  showEditUserDialog.value = false
  firstName.value = null
  lastName.value = null
  email.value = null
  phoneNumber.value = null
  dob.value = null
  gender.value = null
  gymLocation.value = null
  userRole.value = null
  userIdNo.value = null
  selectedUser.value = null
}

// ─────────────────────────────────────────
// ROLES
// ─────────────────────────────────────────
const roles = ref([])
const roleName = ref(null)
const roleDescription = ref(null)
const selectedRole = ref(null)
const showAddRoleDialog = ref(false)
const showEditRoleDialog = ref(false)
const showDeleteRoleDialog = ref(false)
const roleLoading = ref(false)
const roleError = ref('')

async function fetchRoles() {
  roleLoading.value = true
  try {
    const response = await api.get('getRoles', { headers: { Authorization: `Bearer ${token}` } })
    roles.value = response.data.roles ?? []
  } catch (err) {
    roleError.value = err.response?.data?.message || 'Retrieving roles failed'
  } finally {
    roleLoading.value = false
  }
}

async function addRole() {
  roleLoading.value = true
  try {
    await api.post(
      'saveRole',
      { name: roleName.value, description: roleDescription.value },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    roleError.value = ''
    closeRole()
    fetchRoles()
  } catch (err) {
    roleError.value = err.response?.data?.message || 'Creating role failed'
  } finally {
    roleLoading.value = false
  }
}

function editRole(item) {
  selectedRole.value = item
  roleName.value = item.name
  roleDescription.value = item.description
  showEditRoleDialog.value = true
}

async function updateRole() {
  roleLoading.value = true
  try {
    await api.put(
      `updateRole/${selectedRole.value.id}`,
      { name: roleName.value, description: roleDescription.value },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    roleError.value = ''
    closeRole()
    fetchRoles()
  } catch (err) {
    roleError.value = err.response?.data?.message || 'Updating role failed'
  } finally {
    roleLoading.value = false
  }
}

function confirmDeleteRole(item) {
  selectedRole.value = item
  showDeleteRoleDialog.value = true
}

async function deleteRole() {
  roleLoading.value = true
  try {
    await api.delete(`deleteRole/${selectedRole.value.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    roleError.value = ''
    showDeleteRoleDialog.value = false
    selectedRole.value = null
    fetchRoles()
  } catch (err) {
    roleError.value = err.response?.data?.message || 'Deleting role failed'
  } finally {
    roleLoading.value = false
  }
}

function closeRole() {
  showAddRoleDialog.value = false
  showEditRoleDialog.value = false
  showDeleteRoleDialog.value = false
  roleName.value = null
  roleDescription.value = null
  selectedRole.value = null
}

// ─────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────
const equipment = ref([])
const equipName = ref(null)
const equipUsage = ref(null)
const equipStatus = ref(null)
const equipValue = ref(null)
const equipModelNo = ref(null)
const selectedEquipment = ref(null)
const showAddEquipmentDialog = ref(false)
const showEditEquipmentDialog = ref(false)
const showDeleteEquipmentDialog = ref(false)
const equipLoading = ref(false)
const equipError = ref('')

const statusOptions = ['Active', 'Under Maintenance', 'Retired']

async function fetchEquipment() {
  equipLoading.value = true
  try {
    const response = await api.get('getEquipments', {
      headers: { Authorization: `Bearer ${token}` },
    })
    equipment.value = response.data.equipments ?? []
  } catch (err) {
    equipError.value = err.response?.data?.message || 'Retrieving equipment failed'
  } finally {
    equipLoading.value = false
  }
}

async function addEquipment() {
  equipLoading.value = true
  try {
    await api.post(
      'saveEquipment',
      {
        name: equipName.value,
        usage: equipUsage.value,
        status: equipStatus.value,
        value: equipValue.value,
        model_no: equipModelNo.value,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    equipError.value = ''
    closeEquipment()
    fetchEquipment()
  } catch (err) {
    equipError.value = err.response?.data?.message || 'Creating equipment failed'
  } finally {
    equipLoading.value = false
  }
}

function editEquipment(item) {
  selectedEquipment.value = item
  equipName.value = item.name
  equipUsage.value = item.usage
  equipStatus.value = item.status
  equipValue.value = item.value
  equipModelNo.value = item.model_no
  showEditEquipmentDialog.value = true
}

async function updateEquipment() {
  equipLoading.value = true
  try {
    await api.put(
      `updateEquipment/${selectedEquipment.value.id}`,
      {
        name: equipName.value,
        usage: equipUsage.value,
        status: equipStatus.value,
        value: equipValue.value,
        model_no: equipModelNo.value,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    equipError.value = ''
    closeEquipment()
    fetchEquipment()
  } catch (err) {
    equipError.value = err.response?.data?.message || 'Updating equipment failed'
  } finally {
    equipLoading.value = false
  }
}

function confirmDeleteEquipment(item) {
  selectedEquipment.value = item
  showDeleteEquipmentDialog.value = true
}

async function deleteEquipment() {
  equipLoading.value = true
  try {
    await api.delete(`deleteEquipment/${selectedEquipment.value.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    equipError.value = ''
    showDeleteEquipmentDialog.value = false
    selectedEquipment.value = null
    fetchEquipment()
  } catch (err) {
    equipError.value = err.response?.data?.message || 'Deleting equipment failed'
  } finally {
    equipLoading.value = false
  }
}

function closeEquipment() {
  showAddEquipmentDialog.value = false
  showEditEquipmentDialog.value = false
  showDeleteEquipmentDialog.value = false
  equipName.value = null
  equipUsage.value = null
  equipStatus.value = null
  equipValue.value = null
  equipModelNo.value = null
  selectedEquipment.value = null
}

onMounted(() => {
  fetchUsers()
  fetchRoles()
  fetchEquipment()
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
        <!-- ── USERS TAB ── -->
        <v-tabs-window-item :value="1">
          <div
            v-if="!users || Object.keys(users).length === 0"
            class="flex flex-col items-center justify-center py-12 gap-4"
          >
            <span class="text-h6 text-grey-darken-1">No users found</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddUserDialog = true"
              >Add User</v-btn
            >
          </div>
          <div v-else>
            <v-container>
              <v-row>
                <v-col cols="12" align="right">
                  <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddUserDialog = true"
                    >Add User</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">ID No</th>
                        <th class="text-left">Phone</th>
                        <th class="text-left">DOB</th>
                        <th class="text-left">Gender</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Gym Location</th>
                        <th class="text-center" colspan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in users" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.idNo ?? '—' }}</td>
                        <td>{{ item.phoneNumber }}</td>
                        <td>{{ item.dob }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.role?.name ?? '—' }}</td>
                        <td>{{ item.gymLocation }}</td>
                        <td>
                          <v-btn color="primary" size="small" @click="editUser(item)">
                            <v-icon icon="mdi-pencil" class="mr-1"></v-icon>Edit
                          </v-btn>
                        </td>
                        <td v-if="item.deleted_at == null">
                          <v-btn color="error" size="small">
                            <v-icon icon="mdi-account-cancel" class="mr-1"></v-icon>Deactivate
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>

        <!-- ── ROLES TAB ── -->
        <v-tabs-window-item :value="2">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-alert v-if="roleError" type="error" density="compact" class="mb-3" closable>
                  {{ roleError }}
                </v-alert>
              </v-col>
            </v-row>

            <div v-if="roleLoading" class="flex items-center justify-center py-12">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <div
              v-else-if="!roles || roles.length === 0"
              class="flex flex-col items-center py-12 gap-4"
            >
              <span class="text-h6 text-grey-darken-1">No roles found</span>
              <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddRoleDialog = true"
                >Add Role</v-btn
              >
            </div>

            <div v-else>
              <v-row>
                <v-col cols="12" align="right">
                  <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddRoleDialog = true"
                    >Add Role</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">#</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Description</th>
                        <th class="text-center" colspan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in roles" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description ?? '—' }}</td>
                        <td>
                          <v-btn color="primary" size="small" @click="editRole(item)">
                            <v-icon icon="mdi-pencil" class="mr-1"></v-icon>Edit
                          </v-btn>
                        </td>
                        <td>
                          <v-btn color="error" size="small" @click="confirmDeleteRole(item)">
                            <v-icon icon="mdi-delete" class="mr-1"></v-icon>Delete
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-tabs-window-item>

        <!-- ── EQUIPMENT TAB ── -->
        <v-tabs-window-item :value="3">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-alert v-if="equipError" type="error" density="compact" class="mb-3" closable>
                  {{ equipError }}
                </v-alert>
              </v-col>
            </v-row>

            <div v-if="equipLoading" class="flex items-center justify-center py-12">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <div
              v-else-if="!equipment || equipment.length === 0"
              class="flex flex-col items-center py-12 gap-4"
            >
              <span class="text-h6 text-grey-darken-1">No equipment found</span>
              <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddEquipmentDialog = true"
                >Add Equipment</v-btn
              >
            </div>

            <div v-else>
              <v-row>
                <v-col cols="12" align="right">
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="showAddEquipmentDialog = true"
                    >Add Equipment</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table class="border rounded-xl overflow-hidden">
                    <thead>
                      <tr>
                        <th class="text-left">#</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Model No</th>
                        <th class="text-left">Value (Ksh)</th>
                        <th class="text-left">Usage</th>
                        <th class="text-left">Status</th>
                        <th class="text-center" colspan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in equipment" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.model_no ?? '—' }}</td>
                        <td>{{ item.value }}</td>
                        <td>{{ item.usage ?? '—' }}</td>
                        <td>
                          <v-chip
                            :color="
                              item.status === 'Active'
                                ? 'success'
                                : item.status === 'Under Maintenance'
                                  ? 'warning'
                                  : 'error'
                            "
                            size="small"
                            >{{ item.status ?? '—' }}</v-chip
                          >
                        </td>
                        <td>
                          <v-btn color="primary" size="small" @click="editEquipment(item)">
                            <v-icon icon="mdi-pencil" class="mr-1"></v-icon>Edit
                          </v-btn>
                        </td>
                        <td>
                          <v-btn color="error" size="small" @click="confirmDeleteEquipment(item)">
                            <v-icon icon="mdi-delete" class="mr-1"></v-icon>Delete
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>

  <!-- ════════════════════════════════════════
       USER DIALOGS
  ════════════════════════════════════════ -->
  <!-- Add User Dialog -->
  <v-dialog v-model="showAddUserDialog" max-width="700">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Add User
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="closeUser()"></v-btn>
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
                label="ID No"
                v-model="userIdNo"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
            <v-col cols="2">Role:</v-col>
            <v-col cols="10">
              <v-radio-group v-model="userRole" :rules="[rules.required]" inline>
                <v-radio label="Admin" value="1"></v-radio>
                <v-radio label="Trainer" value="2"></v-radio>
                <v-radio label="Staff" value="3"></v-radio>
                <v-radio label="User" value="4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">Gender:</v-col>
            <v-col cols="10">
              <v-radio-group v-model="gender" :rules="[rules.required]" inline>
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeUser()"></v-btn>
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
            <v-btn icon="mdi-close" variant="text" @click="closeUser()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Name"
                v-model="firstName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                v-model="email"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="ID No"
                v-model="userIdNo"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Phone"
                v-model="phoneNumber"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Gym Location"
                :items="['CBD', 'Madaraka', 'Westlands', 'Buruburu']"
                variant="outlined"
                v-model="gymLocation"
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Date of Birth"
                v-model="dob"
                type="date"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Gender"
                :items="['Male', 'Female']"
                variant="outlined"
                v-model="gender"
                required
                :rules="[rules.required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="2">Role:</v-col>
            <v-col cols="10">
              <v-radio-group v-model="userRole" :rules="[rules.required]" inline>
                <v-radio label="Admin" value="1"></v-radio>
                <v-radio label="Trainer" value="2"></v-radio>
                <v-radio label="Staff" value="3"></v-radio>
                <v-radio label="User" value="4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeUser()"></v-btn>
          <v-btn color="primary" text="Update" variant="tonal" @click="updateUser()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- ════════════════════════════════════════
       ROLE DIALOGS
  ════════════════════════════════════════ -->
  <!-- Add Role Dialog -->
  <v-dialog v-model="showAddRoleDialog" max-width="500">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Add Role
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="closeRole()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="roleError" type="error" density="compact" class="mb-4" closable>
            {{ roleError }}
          </v-alert>
          <v-text-field
            label="Role Name"
            v-model="roleName"
            required
            :rules="[rules.required]"
            class="mb-2"
          ></v-text-field>
          <v-textarea label="Description" v-model="roleDescription" rows="3" auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeRole()"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            :loading="roleLoading"
            @click="addRole()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- Edit Role Dialog -->
  <v-dialog v-model="showEditRoleDialog" max-width="500">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Edit Role
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="closeRole()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="roleError" type="error" density="compact" class="mb-4" closable>
            {{ roleError }}
          </v-alert>
          <v-text-field
            label="Role Name"
            v-model="roleName"
            required
            :rules="[rules.required]"
            class="mb-2"
          ></v-text-field>
          <v-textarea label="Description" v-model="roleDescription" rows="3" auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeRole()"></v-btn>
          <v-btn
            color="primary"
            text="Update"
            variant="tonal"
            :loading="roleLoading"
            @click="updateRole()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- Delete Role Confirmation Dialog -->
  <v-dialog v-model="showDeleteRoleDialog" max-width="420">
    <v-card class="rounded-3xl">
      <v-card-title class="pa-6">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete the role
        <strong>{{ selectedRole?.name }}</strong
        >? This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancel" variant="plain" @click="closeRole()"></v-btn>
        <v-btn
          color="error"
          text="Delete"
          variant="tonal"
          :loading="roleLoading"
          @click="deleteRole()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ════════════════════════════════════════
       EQUIPMENT DIALOGS
  ════════════════════════════════════════ -->
  <!-- Add Equipment Dialog -->
  <v-dialog v-model="showAddEquipmentDialog" max-width="600">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Add Equipment
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="closeEquipment()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="equipError" type="error" density="compact" class="mb-4" closable>
            {{ equipError }}
          </v-alert>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Equipment Name"
                v-model="equipName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Model No" v-model="equipModelNo"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Value (Ksh)"
                v-model="equipValue"
                type="number"
                required
                :rules="[rules.required, rules.numeric]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Status"
                :items="statusOptions"
                v-model="equipStatus"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Usage / Description"
                v-model="equipUsage"
                rows="3"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeEquipment()"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            :loading="equipLoading"
            @click="addEquipment()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- Edit Equipment Dialog -->
  <v-dialog v-model="showEditEquipmentDialog" max-width="600">
    <v-form @submit.prevent>
      <v-card class="rounded-3xl">
        <v-card-title class="pa-6">
          <v-row>
            Edit Equipment
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="closeEquipment()"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="equipError" type="error" density="compact" class="mb-4" closable>
            {{ equipError }}
          </v-alert>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Equipment Name"
                v-model="equipName"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Model No" v-model="equipModelNo"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Value (Ksh)"
                v-model="equipValue"
                type="number"
                required
                :rules="[rules.required, rules.numeric]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Status"
                :items="statusOptions"
                v-model="equipStatus"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Usage / Description"
                v-model="equipUsage"
                rows="3"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeEquipment()"></v-btn>
          <v-btn
            color="primary"
            text="Update"
            variant="tonal"
            :loading="equipLoading"
            @click="updateEquipment()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <!-- Delete Equipment Confirmation Dialog -->
  <v-dialog v-model="showDeleteEquipmentDialog" max-width="420">
    <v-card class="rounded-3xl">
      <v-card-title class="pa-6">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete
        <strong>{{ selectedEquipment?.name }}</strong
        >? This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancel" variant="plain" @click="closeEquipment()"></v-btn>
        <v-btn
          color="error"
          text="Delete"
          variant="tonal"
          :loading="equipLoading"
          @click="deleteEquipment()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
