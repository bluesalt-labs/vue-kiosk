<template>
  <div class="container-primary">
    <h1>Hello.</h1>
    <img-slider></img-slider>
  </div>
</template>

<script>
import ImgSlider from '@/components/ImgSlider'

export default {
  name: 'hello',
  data () {
    return {
      title: 'Hello'
    }
  },
  components: { ImgSlider },
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
