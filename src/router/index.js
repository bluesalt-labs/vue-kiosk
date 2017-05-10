import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'
import Hello from '@/views/Hello'
import Error404 from '@/views/Error404'

Vue.use(VueHead, {
  separator: '|',
  complement: 'BlueSalt Labs Vue Kiosk'
})
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '*',
    name: 'Not Found',
    component: Error404
  }
]

export default new Router({
  routes: routes
})
