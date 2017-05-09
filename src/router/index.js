import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error404 from '@/components/Error404'

Vue.use(Router)

export default new Router({
  routes: [
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
})
