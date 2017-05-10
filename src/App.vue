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

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
</style>

<style>
  header,
  footer {
    background: #222;
    min-height: 15px;
  }
</style>
