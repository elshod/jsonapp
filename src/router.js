import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/pages/HomePage'
import DepartPage from '@/pages/DepartPage'
import NewsPage from '@/pages/NewsPage'
import ProjectsPage from '@/pages/ProjectsPage'
const routes = [
    {path: '/',component: HomePage},
    {path: '/depart',component: DepartPage},
    {path: '/news',component: NewsPage},
    {path: '/projects',component: ProjectsPage},
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router