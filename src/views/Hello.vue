<template>
  <div class="container-primary">
    <div class="section">
      <h1>Hello.</h1>
      <p>
        This page contains demos of the components I have built.
      </p>
    </div>
    <div class="section">
      <h2>image Slider</h2>
      <hr />
      <img-slider></img-slider>
    </div>
    <div class="section">

    </div>
  </div>
</template>

<script>
import ImgSlider from '@/components/ImgSlider'

export default {
  name: 'Hello',
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
