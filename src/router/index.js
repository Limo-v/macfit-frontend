import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import HomepPage from '../components/HomepPage.vue'
import Bundles from '../components/Bundles.vue'
import GymLocations from '../components/GymLocations.vue'
import Admin from '../components/Admin.vue'
import Profile from '../components/Profile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/home',
      name: 'home',
      component: HomepPage,
    },
    {
      path: '/bundles',
      name: 'bundles',
      component: Bundles,
    },
    {
      path: '/gym_locations',
      name: 'gym_locations',
      component: GymLocations,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
})

export default router
