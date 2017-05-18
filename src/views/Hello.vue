<template>
  <div class="container-primary">
    <div class="section">
      <h1>Hello.</h1>
      <p>
        This page contains demos of the components I have built.
      </p>
    </div>
    <div class="section">
      <h2><router-link v-bind:to="'/image-slider'">Image Slider</router-link></h2>
      <hr />
      <div class="component-container">
        <img-slider></img-slider>
      </div>
    </div>
    <div class="section">
      <h2><router-link v-bind:to="'/calendar/task'">Task Calendar</router-link></h2>
      <hr />
      <div class="component-container">
        <calendar></calendar>
      </div>
    </div>
    <div class="section">
      <h2></h2>
      <hr />
      <div class="component-container">

      </div>
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

<style lang="scss">
  .section > h2 > a,
  .section > h2 > a:visited {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  .section > h2 > a:hover,
  .section > h2 > a:focus,
  .section > h2 > a:active {
    text-decoration: underline;
    color: #3685ed;
  }
</style>
