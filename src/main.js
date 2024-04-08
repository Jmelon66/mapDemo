/*
 * @Date: 2024-03-30 09:51:31
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-04-08 10:40:16
 * @FilePath: \mapDemoJS\src\main.js
 * @Description:
 * @Author: ms-tlzksaoastkh
 */
import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.mount('#app')
