<template>
  <div id="app">
    <header>
      <router-link v-bind:to="'/'">Home</router-link>
    </header>
    <router-view></router-view>
    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css'
</style>

<style>
  header,
  footer {
    background: #222;
    min-height: 15px;
  }
</style>
