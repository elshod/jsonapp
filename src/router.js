import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage'
import DepartPage from '@/pages/DepartPage'
import WorkersPage from '@/pages/WorkersPage'
import DepartWorkers from '@/pages/DepartWorkers'

const routes = [
    {path: '/',component: HomePage},
    {path: '/departs',component: DepartPage},
    {path: '/workers',component: WorkersPage},
    {path: '/depart/:dep',component: DepartWorkers}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router