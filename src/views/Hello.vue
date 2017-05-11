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
