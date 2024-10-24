import { createRouter, createWebHistory } from "vue-router"
import dashboard from './components/Dashboard.vue'

const routes = [
    {
        path: "/",
        component: dashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router