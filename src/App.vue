<template>
  <div id="app">
    <base-header></base-header>
    <router-view id="view-container"></router-view>
    <base-footer></base-footer>
  </div>
</template>

<script>
  // Todo: there has to be a better way to do this:
  require('@/js/vue-kiosk')
  // use this to include in a component:
  // var VueKiosk = window.VueKiosk
  // And test that it's working with this:
  // VueKiosk.test()

  export default {
    name: 'app',
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1' }
      ]
    }
  }
</script>

<style lang="scss">
  /*@import '../node_modules/bootstrap/dist/css/bootstrap.css';*/
  @import './sass/vue-kiosk.scss';
</style>
