/**
* @file Store for user.
* @author Daniel Salazar <danielsalzar081@gmail.com>
* @copyright 2023
*/

import { createUserWithEmailAndPassword, onAuthStateChanged, 
        signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {defineStore} from 'pinia'
import { auth } from '../utils/firebaseConfig'

export const useUserStore = defineStore('userStore', {
    state:() => ({
        user_data: null,
        loadingSession: false
    }),

    getters: {

    },

    actions: {

        /**
         * The function `registerUser` asynchronously registers a user with an email and password, and returns
         * true if successful or false if there is an error.
         * @param email - The email parameter is the email address of the user that is being registered. It is
         * used to create a new user account.
         * @param password - The password parameter is the password that the user wants to set for their
         * account.
         * @returns a boolean value. If the user is successfully registered, it will return true. If there is
         * an error during the registration process, it will return false.
         */
        async registerUser(email, password) {
            try {
                const {user} = await createUserWithEmailAndPassword(auth, email, password)
                this.user_data = {email: user.email, uid:user.uid}
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },

        /**
         * The above function is an asynchronous function that logs in a user with their email and password and
         * stores their email and UID in the user_data object.
         * @param email - The email parameter is the email address of the user trying to log in.
         * @param password - The password parameter is the password entered by the user for authentication.
         */
        async loginUser(email, password) {
            try {
                const {user} = await signInWithEmailAndPassword(auth, email, password)
                this.user_data = {email: user.email, uid:user.uid}
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        

        /**
         * The `logOutUser` function logs out the user by calling the `signOut` function and setting the
         * `user_data` variable to null.
         */
        async logOutUser() {
            try {
                await signOut(auth)
                this.user_data = null
            } catch (error) {
                console.log(error)
            }
        },


        /**
 * The `currentUser` function returns a promise that resolves with the current user's data if they are
 * authenticated, or null if they are not.
 * @returns The `currentUser` function returns a Promise.
 */
        async currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(auth, user => {
                    if(user) {
                        this.user_data = {email: user.email, uid:user.uid}
                    } else {
                        this.user_data = null
                    }

                    resolve(user)
                    
                }, e => reject(e))

                unsuscribe()
            })
        }


    }
})
