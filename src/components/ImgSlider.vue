<template>
    <div id="slider-container"  v-on:panleft="navLeft" v-on:panright="navRight">
      <div class="nav-btn" id="nav-left" :click="navLeft"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
      <div class="nav-btn" id="nav-right" :click="navRight"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>

      <v-touch id="img-container">
        <img v-for="(image, index) in images" :src="getImg(image.file)" :alt="image.source" />
      </v-touch>

      <div id="nav-icons" :click="goToImage(index)">
        <i v-for="(image, index) in images" class="nav-icon" :class="{ active: imgActive(index) }"></i>
      </div>
    </div>
    <!--
    <v-touch id="myElement" v-on:panleft="test" v-on:panright="test" v-on:tap="test" v-on:press="test"></v-touch>
    -->
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
        imgCache: {
          left: { file: '', source: '' },
          center: { file: '', source: '' },
          right: { file: '', source: '' }
        },
        init: function () {

        },
        test: function (ev) {
          ev.target.textContent = ev.type + ' gesture detected'
        },
        getImg: function (file) {
          if (file !== '') { return require('../images/' + file) }
        },
        imgActive: function (index) {
          // todo
        },
        imgWidth: function () {
          return document.getElementsByClassName('img-container')[0].firstChild.width
        },
        navLeft: function () {
          // todo
        },
        navRight: function () {
          // todo
        },
        goToImage: function (index) {
          // todo
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/css/font-awesome.min.css';

  $imageWidth: 1024px;
  $imageHeight: 576px;
  $navBtnWidth: 100px;
  $navIconSize: 12px;

  #slider-container {
    position: relative;
    overflow: hidden;
    height: $imageHeight + $navIconSize + 10;
    width: $imageWidth + ($navBtnWidth * 2);
    margin: 30px auto;
  }

  #img-container  {
    display: inline-block;
    height: $imageHeight;
    margin: 0 $navBtnWidth;
    overflow: hidden;
  }

  #img-container img {
    max-width: $imageWidth;
    height: auto;
    float:left;
  }

  .nav-btn {
    width: $navBtnWidth;
    height: $imageHeight;
    position: absolute;
    top: 0;
    background:(25, 25, 25, 0);
    color: rgba(25, 25, 25, 0.8);
    -webkit-transition: background 300ms, color 300ms;
    transition: background 300ms, color 300ms;
    cursor: pointer;
  }
  .nav-btn:hover,
  .nav-btn:active {
    background: rgba(25, 25, 25, 0.1);
    color: rgba(25, 25, 25, 1);
  }
  .nav-btn#nav-left { left: 0; }
  .nav-btn#nav-right { right: 0; }

  .nav-btn > i {
    width: 100%;
    height: 100%;
    display: block;
  }
  .nav-btn > i:before {
    display:block;
    width: 100%;
    text-align: center;
    margin-top: $imageHeight / 2;
  }

  #nav-icons {
    height: $navIconSize + 4px;
    line-height: $navIconSize + 4px;
    bottom: 0;
    text-align: center;
  }

  .nav-icon {
    font: normal normal normal 14px/1 FontAwesome;
    display: inline-block;
    width: $navIconSize + 4px;
    height: $navIconSize + 4px;
    font-size: $navIconSize;
  }

  .nav-icon:before { content: "\f10c"; }
  .nav-icon.active:before { content: "\f111"; }
</style>
