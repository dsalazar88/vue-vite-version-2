/**
* @file Router file.
* @author Daniel Salazar <danielsalzar081@gmail.com>
* @copyright 2023
*/

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import { useUserStore } from './stores/user'
import {useHelpers} from './utils/helpers'

/**
 * The requireAuth function checks if a user is logged in and redirects them to the login page if not.
 * @param to - The "to" parameter represents the target route that the user is navigating to.
 * @param from - The "from" parameter represents the current route that the user is navigating away
 * from. It contains information about the current route, such as the path, query parameters, and any
 * named parameters.
 * @param next - The `next` parameter is a function that is used to control the navigation flow in Vue
 * Router. It is called to proceed to the next navigation step. It can be called with a route path to
 * redirect to a different route, or without any arguments to continue to the next step in the
 * navigation process
 */
const requireAuth = async (to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true

    const user = await userStore.currentUser()
    
    setTimeout(() => {
        userStore.loadingSession = false
    }, 300);

    if (user) {
        next()
    } else {
        next('/login')
        
        setTimeout(() => {
            useHelpers().notify('error', 'You are not logged in!')
        }, 100)
    }
}

const routes = [
    { path: '/', component: HomeView, beforeEnter: requireAuth },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;