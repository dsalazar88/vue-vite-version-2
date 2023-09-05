/**
* @file Helpers file.
* @author Daniel Salazar <danielsalzar081@gmail.com>
* @copyright 2023
*/

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

/**
 * The `useHelpers` function returns an object with a `notify` method that can be used to show alerts
 * with a specified type and text.
 * 
 * @return The `useHelpers` function returns an object with a single property `notify`, which is a
 * function.
 */
export const useHelpers = () => {

    /**
     * The `notify` function displays a toast notification with a specified type and text.
     * 
     * @param type The `type` parameter is a string that represents the type of notification. It can be one
     * of the following values: "success", "error", "info", or "warning".
     * @param text The `text` parameter is a string that represents the message or content that you want to
     * display in the notification.
     */
    const notify = (type, text) => {
        const alert = toast[type]
        alert(text, {
            autoClose: 1000,
        })
    }

    return {
        notify
    }

}