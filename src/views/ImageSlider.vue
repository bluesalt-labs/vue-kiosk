<template>
  <div class="container-primary">
    <div class="component-container">
      <img-slider v-bind:navIcons="true" v-bind:navBtns="true" v-bind:navImgs="true"></img-slider>
    </div>
  </div>
</template>

<script>
  import ImgSlider from '@/components/ImgSlider'

  export default {
    name: 'ImageSlider',
    data () {
      return {
        title: 'Image Slider'
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
