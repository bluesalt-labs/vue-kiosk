<template>
  <v-touch id="myElement" v-on:panleft="test" v-on:panright="test" v-on:tap="test" v-on:press="test"></v-touch>
</template>


<script>
  export default {
    name: 'img-slider',
    data () {
      return {
        test: function (ev) {
          ev.target.textContent = ev.type + ' gesture detected'
        }
      }
    }
  }
</script>

<style lang="scss">
  #myElement {
    background: silver;
    height: 300px;
    text-align: center;
    font: 30px/300px 'Arimo', sans-serif;
  }
</style>
