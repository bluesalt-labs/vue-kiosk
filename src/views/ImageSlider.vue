<template>
  <div class="container-primary">
    <img-slider></img-slider>
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
