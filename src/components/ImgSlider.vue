<template>
  <div>
    <div id="img-container">
      <div v-for="(image, index) in images">
        <img :src="getImg(image.file)" :alt="image.source" />
      </div>
    </div>

    <br /><br />
    <hr />
    <v-touch id="myElement" v-on:panleft="test" v-on:panright="test" v-on:tap="test" v-on:press="test"></v-touch>
  </div>
</template>


<script>

  export default {
    name: 'img-slider',
    data () {
      return {
        images: [
          { file: 'buildings-2297210_1920.jpg', source: 'https://pixabay.com/photo-2297210/' },
          { file: 'lighthouse-2225445_1920.jpg', source: 'https://pixabay.com/photo-2225445/' },
          { file: 'landscape-2211587_1920.jpg', source: 'https://pixabay.com/photo-2211587/' },
          { file: 'water-2208931_1920.jpg', source: 'https://pixabay.com/photo-2208931/' },
          { file: 'ama-dablam-2064522_1920.jpg', source: 'https://pixabay.com/photo-2064522/' },
          { file: 'ring-nebula-1995076_1920.jpg', source: 'https://pixabay.com/photo-1995076/' }
        ],
        test: function (ev) {
          ev.target.textContent = ev.type + ' gesture detected'
        },
        getImg: function (file) {
          return require('../images/' + file)
        }
      }
    }
  }
</script>

<style lang="scss">
  $sliderHeight: 720px;
  $sliderWidth: 1280px;

  #img-container {
    overflow: hidden;
    height: $sliderHeight;
    width: $sliderWidth;
    margin: auto;
  }

  #img-container > div {
    display: inline-block;
    height: $sliderHeight;
    width: $sliderWidth;
  }

  #img-container > div > img {
    max-width: $sliderWidth;
    height: auto;
  }

</style>
