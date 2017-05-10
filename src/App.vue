<template>
  <div id="app">
    <base-header></base-header>
    <router-view></router-view>
    <base-footer></base-footer>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import './sass/vue-kiosk.scss';
</style>
