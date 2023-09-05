<template>
    <div>
        <h1>Register</h1>
        
        <FormUser 
            :type="'register'"
            @register-user="EventRegisterUser">
        </FormUser>

    </div>
</template>

<script setup>
import FormUser from '../components/FormUser.vue'
import {useHelpers} from '../utils/helpers'
import {useUserStore} from '../stores/user'
import {useRouter} from 'vue-router'

const router = useRouter()
const { notify } = useHelpers()
const {registerUser} = useUserStore()

const EventRegisterUser = async(email, password) => {
    const result = await registerUser(email.value, password.value)
    if(result){
        notify('success', 'User was registered!')
        setTimeout( () => {
            router.push('/')
        }, 1500)
        
    }
}

</script>
