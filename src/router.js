import { createRouter, createWebHistory } from "vue-router"
import dashboard from './components/Dashboard.vue'
import listnota from './components/ListNota.vue'
import laporan from './components/Laporan.vue'

const routes = [
    {
        path: "/",
        component: dashboard
    },
    {
        path: "/nota",
        component: listnota
    },
    {
        path: "/laporan",
        component: laporan
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router