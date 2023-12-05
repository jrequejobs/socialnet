import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Users from './views/Users.vue'
import UserDetails from './views/UserDetails.vue';

const routes = [
  { path: '/', component: App },
  { path: '/users', component: Users },
  { path: '/user-details/:userId', component: UserDetails } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)

app.mount('#app')