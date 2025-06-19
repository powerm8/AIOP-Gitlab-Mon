import { createRouter, createWebHistory } from 'vue-router'

import GitLabGroup from '@/views/GitLabGroup.vue'
import ShowProjects from '@/views/ShowProjects.vue'


const routes = [
    {path: '/', component: ShowProjects},
    {path: '/groupProjects', component: GitLabGroup}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router