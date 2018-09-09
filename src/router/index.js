import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Playlist from '@/components/Playlist'
import Store from '../store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (Store.state.user.email) {
          return next()
        }
        return next('/login')
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Playlist',
      component: Playlist
    }
  ]
})
