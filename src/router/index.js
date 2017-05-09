import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/views/Hello'
import Error404 from '@/components/views/Error404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'test',
          name: 'test',
          component: Hello
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: Hello,
      children: [
        {
          path: 'test2',
          name: 'test2',
          component: Hello
        }
      ]
    },
    {
      path: '*',
      name: 'Not Found',
      component: Error404
    }
  ]
})
