/*
 * @Date: 2024-03-30 09:51:31
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-04-08 10:15:29
 * @FilePath: \mapDemoJS\src\router\index.js
 * @Description:
 * @Author: ms-tlzksaoastkh
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
