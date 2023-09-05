<template>
    <div class="text-center mt-3">
        <h1>Home</h1>

        <h3>{{ userStore.user_data?.email }}</h3>
    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'

const userStore = useUserStore()
</script>

