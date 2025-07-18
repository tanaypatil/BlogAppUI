import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import {useUserStore} from "../stores/userStore.ts";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/:catchall(.*)*',
        redirect: { name: 'home' }
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next()
        return
    }
    const userStore = useUserStore()

    if (userStore.userLoggedIn) {
        next()
    } else {
        next({ name: 'home' })
    }
})

export default router
