<template>
    <div>
        <form @submit.prevent="handleSubmit" class="ms-2 me-2">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model.trim="email">
                <div class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">
                {{ type === 'register' ? 'Create User' : 'Login' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useHelpers } from '../utils/helpers';
import { useUserStore } from '../stores/user'

const props = defineProps({
    type: String,

})

const emit = defineEmits(['register-user', 'login-user'])

const email = ref('daniel@mail.com')
const password = ref('123456')
const { notify } = useHelpers()
const { user_data } = useUserStore()

/**
 * The handleSubmit function checks if the email and password fields are filled and then emits an event
 * based on the type prop.
 * @returns The function `handleSubmit` is returning the result of the `notify` function if the `email`
 * value is empty or the `password` length is less than 6. Otherwise, it does not explicitly return
 * anything.
 */
const handleSubmit = async () => {

    if (!email.value || password.value.length < 6) {
        return notify('error', 'Empty fields')
    }

    switch (props.type) {
        case 'register':
            emit('register-user', email, password)
            break;

        case 'login':
            emit('login-user', email, password)
            break;
    }
}

</script>
