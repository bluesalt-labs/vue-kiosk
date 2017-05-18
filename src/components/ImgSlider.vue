<template>
    <v-touch id="slider-container"  v-on:swipeleft="navRight" v-on:swiperight="navLeft">
      <div class="nav-btn" id="nav-left" v-if="navBtns" @click="navLeft"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
      <div class="nav-btn" id="nav-left-inactive" v-else ></div>

      <div id="img-window">
        <div id="images-container" :style="{ width: (100 * numImages()) + '%' }">
          <div v-for="(image,index) in imageData" class="img-container">
            <img :src="getImg(image.file)" :alt="image.source" />
          </div>
        </div>
      </div>

      <div class="nav-btn" id="nav-right" v-if="navBtns" @click="navRight"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
      <div class="nav-btn" id="nav-right-inactive" v-else></div>

      <div id="nav-icons" @click="goToImage" v-if="navIcons">
        <i v-for="(image,index) in imageData" class="nav-icon" :id="'nav-icon-' + index" :class="{ active: imgActive(index) }"></i>
      </div>
    </v-touch>
</template>


<script>
  export default {
    name: 'img-slider',
    props: {
      imageData: {
        type: Array,
        default: [
          {file: 'buildings-2297210_1920.jpg', source: 'https://pixabay.com/photo-2297210/'},
          {file: 'lighthouse-2225445_1920.jpg', source: 'https://pixabay.com/photo-2225445/'},
          {file: 'landscape-2211587_1920.jpg', source: 'https://pixabay.com/photo-2211587/'},
          {file: 'water-2208931_1920.jpg', source: 'https://pixabay.com/photo-2208931/'},
          {file: 'ama-dablam-2064522_1920.jpg', source: 'https://pixabay.com/photo-2064522/'},
          {file: 'ring-nebula-1995076_1920.jpg', source: 'https://pixabay.com/photo-1995076/'}
        ]
      },
      navIcons: { type: Boolean, default: false },
      navBtns: { type: Boolean, default: true },
      navImgs: { type: Boolean, default: false }
    },
    data () {
      return {
        activeImg: 0,
        resizeTimeout: false,
        resizeDelay: 250,
        scrollTimeout: false,
        scrollDelay: 450,
        scrollThreshold: 40
      }
    },
    created: function () {
      window.addEventListener('resize', this.onScreenResize)
      window.addEventListener('wheel', this.onScroll)
    },
    mounted: function () {
      document.getElementById('slider-container').addEventListener('mouseenter', this.mouseEnterSlider)
      document.getElementById('slider-container').addEventListener('mouseleave', this.mouseLeaveSlider)
    },
    destroyed: function () {
      window.removeEventListener('resize', this.onScreenResize)
      window.removeEventListener('wheel', this.onScroll)
      document.getElementById('slider-container').removeEventListener('mouseenter', this.mouseEnterSlider)
      document.getElementById('slider-container').removeEventListener('mouseleave', this.mouseLeaveSlider)
    },
    methods: {
      onScreenResize: function () {
        clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(this.goToImage(this.activeImg), this.resizeDelay)
      },
      onScroll: function (e) {
        if (e.target.parentElement.className === 'img-container') {
          e.preventDefault()
          if (this.scrollTimeout) { clearTimeout(this.scrollTimeout) }

          this.checkImgScrollTrigger(e, function () {
            window.removeEventListener('wheel', this.onScroll)

            this.scrollTimeout = setTimeout(function () {
              window.addEventListener('wheel', this.onScroll)
            }.bind(this), this.scrollDelay)
          }.bind(this))
        }
      },
      checkImgScrollTrigger: function (e, callback) {
        if (e.deltaX > 0) {
          if (e.deltaX > this.scrollThreshold) { this.navRight(); callback() }
        } else if (e.deltaX < 0) {
          if (-e.deltaX > this.scrollThreshold) { this.navLeft(); callback() }
        }
      },
      mouseEnterSlider: function () {
        window.addEventListener('keydown', this.keyDownInSlider)
      },
      mouseLeaveSlider: function () {
        window.removeEventListener('keydown', this.keyDownInSlider)
      },
      keyDownInSlider: function (event) {
        var k = event.keyCode
        if (k === 37 || k === 38) { this.navLeft() }
        if (k === 39 || k === 40) { this.navRight() }
      },
      getImg: function (file) {
        if (file !== '') { return require('../images/' + file) }
      },
      numImages: function () {
        return this.imageData.length
      },
      isValidImgId: function (id) {
        id = parseInt(id) // just in case this gets a number as a string
        return id >= 0 && id < this.numImages()
      },
      imgActive: function (index) {
        if (index !== 'undefined') {
          return index === this.activeImg
        } // else
        return false
      },
      imgWidth: function () {
        return document.getElementById('img-window').offsetWidth
      },
      navLeft: function () {
        var prev = (this.activeImg - 1 < 0 ? this.numImages() - 1 : this.activeImg - 1)

        this.isValidImgId(prev) ? this.goToImage(prev) : console.log('could not go to image ' + prev)
      },
      navRight: function () {
        var next = (this.activeImg + 1 > this.numImages() - 1 ? 0 : this.activeImg + 1)

        this.isValidImgId(next) ? this.goToImage(next) : console.log('could not go to image ' + next)
      },
      goToImage: function (e) {
        var imgId = null

        if (typeof e === 'object') {
          imgId = parseInt(e.target.id.split(/ /)[0].replace(/[^\d]/g, ''))
        } else {
          imgId = parseInt(e)
        }

        if (this.isValidImgId(imgId)) {
          // Do animation
          document.getElementById('images-container').style.left = (imgId === 0 ? '0' : -(this.imgWidth() * imgId) + 'px')
          this.activeImg = imgId
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/css/font-awesome.min.css';
  @import '../sass/_variables.scss';

  // General
  $navIconSizeHoverAdjust: 4;
  $navTextColor: rgba(25, 25, 25, 0.8);
  $navTextColorActive: rgba(25, 25, 25, 1);
  $hoverTransTime: 300ms;
  $imageTransTime: 200ms;
  $imageBackground: rgba(0, 0, 0, 1);

  //media4K
  $imageWidth4K: 1920px;
  $imageHeight4K: 1080px;
  $navBtnWidth4K: 150px;
  $navIconSize4K: 32px;

  //mediaHD
  $imageWidthHD: 1024px;
  $imageHeightHD: 576px;
  $navBtnWidthHD: 125px;
  $navIconSizeHD: 24px;

  //mediaXL
  $imageWidthXL: 920px;
  $imageHeightXL: 518px;
  $navBtnWidthXL: 100px;
  $navIconSizeXL: 16px;

  //mediaLG
  $imageWidthLG: 768px;
  $imageHeightLG: 432px;
  $navBtnWidthLG: 75px;
  $navIconSizeLG: 16px;

  //mediaMD
  $imageWidthMD: 640px;
  $imageHeightMD: 360px;
  $navBtnWidthMD: 60px;
  $navIconSizeMD: 16px;

  //mediaSM
  $imageWidthSM: 480px;
  $imageHeightSM: 270px;
  $navBtnWidthSM: 50px;
  $navIconSizeSM: 14px;

  #slider-container {
    position: relative;
    overflow: hidden;
    margin: 30px auto;
  }

  #images-container {
    display: inline-block;
    margin: 0;
    left: 0;
    position: relative;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;

    -webkit-transition: left $imageTransTime;
    transition: left $imageTransTime;
  }

  #img-window { overflow: hidden; }

  .img-container {
    background: $imageBackground;
    float:left;
    display: flex;
    justify-content: center;
  }

  #images-container img {
    display: block;
    margin: auto;
    -webkit-user-drag: none;
  }

  .nav-btn, #img-window { float: left; }

  .nav-btn {
    background: rgba(25, 25, 25, 0);
    color: $navTextColor;
    -webkit-transition: background $hoverTransTime, color $hoverTransTime;
    transition: background $hoverTransTime, color $hoverTransTime;
  }
  .nav-btn:hover,
  .nav-btn:focus,
  .nav-btn:active {
    cursor: pointer;
    background: rgba(25, 25, 25, 0.1);
    color: $navTextColorActive;
  }
  .nav-btn#nav-left {
    -webkit-border-top-left-radius: 3px;
    -webkit-border-bottom-left-radius: 3px;
    -moz-border-radius-topleft: 3px;
    -moz-border-radius-bottomleft: 3px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .nav-btn#nav-right {
    -webkit-border-top-right-radius: 3px;
    -webkit-border-bottom-right-radius: 3px;
    -moz-border-radius-topright: 3px;
    -moz-border-radius-bottomright: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  /* todo: fix this. use flex? */
  .nav-btn#nav-left-inactive:hover,
  .nav-btn#nav-right-inactive:hover,
  .nav-btn#nav-left:focus,
  .nav-btn#nav-right:focus,
  .nav-btn#nav-left:active,
  .nav-btn#nav-right:active {
    background: rgba(25, 25, 25, 0);
    cursor: default;
  }

  .nav-btn > i {
    width: 100%;
    height: 50%;
    display: block;
  }
  .nav-btn > i:before {
    display:block;
    width: 100%;
    text-align: center;
  }

  .nav-btn, #nav-icons { z-index: 999; }

  #nav-icons {
    clear: both;
    bottom: 0;
    text-align: center;
  }

  .nav-icon {
    position: relative;
    font: normal normal normal 14px/1 FontAwesome;
    display: inline-block;
    cursor: pointer;
    color: $navTextColor;
    -webkit-transition: color $hoverTransTime;
    transition: color $hoverTransTime;
  }

  .nav-icon:before { content: "\f10c"; }

  .nav-icon:not(.active):after {
    content: "\f111";
    position: absolute;
    color: rgba(0,0,0,0);
    -webkit-transition: color $hoverTransTime;
    transition: color $hoverTransTime;
  }

  .nav-icon:hover:after,
  .nav-icon:focus:after,
  .nav-icon:active:after { color: $navTextColor; }

  .nav-icon.active { color: $navTextColorActive; }
  .nav-icon.active:before { content: "\f111"; }
  .nav-icon.active:after { content: ""; }


  /* Screen Size Adjustments */
  /* height: 0.5625vw;  */
  #slider-container { height: 75vw; width: 100vw; }
  #img-window { height: 56.25vw; width: 80vw; }
  #images-container { height: 56.25vw; }

  .img-container {  height: 56.25vw; width: 80vw; }
  #images-container img { max-width: 80vw; height: auto; }
  .nav-btn { width: 10vw; height: 56.25vw; }
  .nav-btn > i:before { margin-top: 28.125vw; }
  #nav-icons { height: $navIconSizeSM + 4px; line-height: $navIconSizeSM + 4px; }
  .nav-icon { width: $navIconSizeSM + 4px; height: $navIconSizeSM + 4px; font-size: $navIconSizeSM; }
  .nav-icon:not(.active):after { left: ($navIconSizeSM / $navIconSizeHoverAdjust); }

  @media(min-width: $mediaMD) {
    #slider-container { height: $imageHeightMD + $navIconSizeMD + 10; width: $imageWidthMD + ($navBtnWidthMD * 2); }
    #images-container { height: $imageHeightMD; }
    #img-window { width: $imageWidthMD; height: $imageHeightMD; }
    .img-container {  height: $imageHeightMD; width: $imageWidthMD; }
    #images-container img { max-width: $imageWidthMD; height: $imageHeightMD; }
    .nav-btn { width: $navBtnWidthMD; height: $imageHeightMD; }
    .nav-btn > i:before { margin-top: $imageHeightMD / 2; }
    #nav-icons { height: $navIconSizeMD + 4px; line-height: $navIconSizeMD + 4px; }
    .nav-icon { width: $navIconSizeMD + 4px; height: $navIconSizeMD + 4px; font-size: $navIconSizeMD; }
    .nav-icon:not(.active):after { left: ($navIconSizeMD / $navIconSizeHoverAdjust); }
  }
  @media(min-width: $mediaLG) {
    #slider-container { height: $imageHeightLG + $navIconSizeLG + 10; width: $imageWidthLG + ($navBtnWidthLG * 2); }
    #images-container { height: $imageHeightLG; }
    #img-window { width: $imageWidthLG; height: $imageHeightLG; }
    .img-container {  height: $imageHeightLG; width: $imageWidthLG; }
    #images-container img { max-width: $imageWidthLG; height: $imageHeightLG; }
    .nav-btn { width: $navBtnWidthLG; height: $imageHeightLG; }
    .nav-btn > i:before { margin-top: $imageHeightLG / 2; }
    #nav-icons { height: $navIconSizeLG + 4px; line-height: $navIconSizeLG + 4px; }
    .nav-icon { width: $navIconSizeLG + 4px; height: $navIconSizeLG + 4px; font-size: $navIconSizeLG; }
    .nav-icon:not(.active):after { left: ($navIconSizeLG / $navIconSizeHoverAdjust); }
  }
  @media(min-width: $mediaXL) {
    #slider-container { height: $imageHeightXL + $navIconSizeXL + 10; width: $imageWidthXL + ($navBtnWidthXL * 2); }
    #images-container { height: $imageHeightXL; }
    #img-window { width: $imageWidthXL; height: $imageHeightXL; }
    .img-container {  height: $imageHeightXL; width: $imageWidthXL; }
    #images-container img { max-width: $imageWidthXL; height: $imageHeightXL; }
    .nav-btn { width: $navBtnWidthXL; height: $imageHeightXL; }
    .nav-btn > i:before { margin-top: $imageHeightXL / 2; }
    #nav-icons { height: $navIconSizeXL + 4px; line-height: $navIconSizeXL + 4px; }
    .nav-icon { width: $navIconSizeXL + 4px; height: $navIconSizeXL + 4px; font-size: $navIconSizeXL; }
    .nav-icon:not(.active):after { left: ($navIconSizeXL / $navIconSizeHoverAdjust); }
  }
  @media(min-width: $mediaHD) {
    #slider-container { height: $imageHeightHD + $navIconSizeHD + 10; width: $imageWidthHD + ($navBtnWidthHD * 2); }
    #images-container { height: $imageHeightHD; }
    #img-window { width: $imageWidthHD; height: $imageHeightHD; }
    .img-container {  height: $imageHeightHD; width: $imageWidthHD; }
    #images-container img { max-width: $imageWidthHD; height: $imageHeightHD; }
    .nav-btn { width: $navBtnWidthHD; height: $imageHeightHD; }
    .nav-btn > i:before { margin-top: $imageHeightHD / 2; }
    #nav-icons { height: $navIconSizeHD + 4px; line-height: $navIconSizeHD + 4px; }
    .nav-icon { width: $navIconSizeHD + 4px; height: $navIconSizeHD + 4px; font-size: $navIconSizeHD; }
    .nav-icon:not(.active):after { left: ($navIconSizeHD / $navIconSizeHoverAdjust); }
  }
  @media(min-width: $media4K) {
    #slider-container { height: $imageHeight4K + $navIconSize4K + 10; width: $imageWidth4K + ($navBtnWidth4K * 2); }
    #images-container { height: $imageHeight4K; }
    #img-window { width: $imageWidth4K; height: $imageHeight4K; }
    .img-container {  height: $imageHeight4K; width: $imageWidth4K; }
    #images-container img { max-width: $imageWidth4K; height: $imageHeight4K; }
    .nav-btn { width: $navBtnWidth4K; height: $imageHeight4K; }
    .nav-btn > i:before { margin-top: $imageHeight4K / 2; }
    #nav-icons { height: $navIconSize4K + 4px; line-height: $navIconSize4K + 4px; }
    .nav-icon { width: $navIconSize4K + 4px; height: $navIconSize4K + 4px; font-size: $navIconSize4K; }
    .nav-icon:not(.active):after { left: ($navIconSize4K / $navIconSizeHoverAdjust); }
  }

</style>
