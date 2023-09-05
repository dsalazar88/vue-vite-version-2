<template>
    <div>
        <h1>Login</h1>
        <FormUser 
            :type="'login'"
            @login-user="EventLoginUser"
            ></FormUser>
    </div>
</template>

<script setup>
import FormUser from '../components/FormUser.vue';
import { useUserStore } from '../stores/user';
import {useRouter} from 'vue-router'
import {useHelpers} from '../utils/helpers'
import { onMounted } from 'vue';

const emit = defineEmits(['disable-button'])

const {loginUser} = useUserStore()
const router = useRouter()
const {notify} = useHelpers()

const EventLoginUser = async(email, password) => {

    const result = await loginUser(email.value, password.value)

    if(result){
        notify('success', 'Welcome!')
        setTimeout(() => {
            router.push('/')
        }, 1200)
    }else{
        notify('error', 'User no found!')
    }
    
}


</script>
