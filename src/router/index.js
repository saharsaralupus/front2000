import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Home from '../components/Home.vue';
import Account from '../components/Account.vue';


const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  ,
  {
    path: '/user/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/user/account',
    name: 'account',
    component: Account
  }

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
