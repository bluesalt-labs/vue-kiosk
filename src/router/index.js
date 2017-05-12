// Components
import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'
import VueTouch from 'vue-touch'

// Views
import Hello from '@/views/Hello'
import ImageSlider from '@/views/ImageSlider'
import Blank from '@/views/Blank'
import Error404 from '@/views/Error404'

Vue.use(VueHead, {
  separator: '|',
  complement: 'BlueSalt Labs Vue Kiosk'
})

Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/image-slider',
    name: 'ImageSlider',
    component: ImageSlider
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank
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
