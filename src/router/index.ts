import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/characters',
    },
    {
      path: '/characters',
      name: 'characters',
      component: SearchView,
    },
    {
      path: '/character/:id',
      name: 'character',
      component: () => import('../views/CharacterView.vue'),
    },
  ],
})

export default router
