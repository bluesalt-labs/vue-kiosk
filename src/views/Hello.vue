<template>
  <div class="container-fluid">
    <h1>Hello.</h1>
    <v-touch id="myElement" v-on:panleft="test" v-on:panright="test" v-on:tap="test" v-on:press="test"></v-touch>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      title: 'Hello',
      test: function (ev) {
        ev.target.textContent = ev.type + ' gesture detected'
      }
    }
  },
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  }
}
</script>

<style>
  #myElement {
    background: silver;
    height: 300px;
    text-align: center;
    font: 30px/300px Helvetica, Arial, sans-serif;
  }
</style>
