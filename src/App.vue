<template>
  <div>

    <nav class="navbar navbar-expand-lg justify-content-end" style="background-color: #e3f2fd;"
      v-if="!userStore.loadingSession">

      <ul class="navbar-nav">
        <router-link to="/" class="nav-link " :class="{ 'active': isActive('/') }">Home {{ userStore.loadingSession
        }}</router-link>

        <router-link to="/login" class="nav-link" :class="{ 'active': isActive('/login') }" v-if="!userStore.user_data">
          Login
        </router-link>

        <router-link to="/register" class="nav-link" :class="{ 'active': isActive('/register') }">Register</router-link>

        <button @click="logout" class="btn btn-outline-danger" v-if="userStore.user_data">
          Logout
        </button>
      </ul>
    </nav>

    <div v-else>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user.js'
import { useRoute, useRouter } from 'vue-router'
import { useHelpers } from './utils/helpers'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const { notify } = useHelpers()

/**
 * The `logout` function logs out the user, displays a success notification, and redirects to the login
 * page after a delay.
 */
const logout = async () => {
  await userStore.logOutUser()
  notify('success', 'Closed Session!')
  setTimeout(() => {
    router.push('./login')
  }, 1200)
}

const isActive = (path) => {
  return route.path === path
}

</script>
