<template>
  <div id="app">
    <base-header></base-header>
    <router-view></router-view>
    <base-footer></base-footer>
  </div>
</template>

<script>
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
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import './sass/vue-kiosk.scss';
</style>
