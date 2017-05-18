<template>
  <div class="container-primary">
    <div class="section">
      <h1>Hello.</h1>
      <p>
        This page contains demos of the components I have built.
      </p>
    </div>
    <div class="section">
      <h2>Image Slider</h2>
      <hr />
      <img-slider></img-slider>
    </div>
    <div class="section">
      <h2>Task Calendar</h2>
      <hr />
      <calendar></calendar>
    </div>
    <div class="section">
      <h2></h2>
      <hr />

    </div>
  </div>
</template>

<script>
import ImgSlider from '@/components/ImgSlider'
import Calendar from '@/components/Calendar'

export default {
  name: 'Hello',
  data () {
    return {
      title: 'Hello'
    }
  },
  components: { ImgSlider, Calendar },
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  }
}
</script>
