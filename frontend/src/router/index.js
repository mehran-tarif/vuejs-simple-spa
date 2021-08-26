import { createRouter, createWebHistory } from 'vue-router'
import store    from '../store'
import Home     from '../views/Home.vue'
import Detail   from '../views/Detail.vue'
import About    from '../views/About.vue'
import Profile  from '../views/Profile.vue'
import Add      from '../views/Add.vue'
import Login    from '../views/Login.vue'
import Register from '../views/Register.vue'
import Logout   from '../views/Logout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:slug',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { loginRequired: true }
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: { loginRequired: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { loginRedirect: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { loginRedirect: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { loginRequired: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (store.state.isAuthenticated) {
      next()
    } else {
      next("/login")
    }
  } else if (to.matched.some(record => record.meta.loginRedirect)) {
    if (!store.state.isAuthenticated) {
      next()
    } else {
      next("/profile")
    }
  } else {
    next()
  }
})

export default router
