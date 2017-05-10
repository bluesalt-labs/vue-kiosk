<template>
  <header>
    <div class="container-fluid">
      <router-link v-bind:to="'/'">Home</router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'base-header'
  }
</script>
