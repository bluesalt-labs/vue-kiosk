<template>
  <header>
    <div class="container-primary header-container">
      <router-link v-bind:to="'/'">Home</router-link>
      <router-link v-bind:to="'/blank'">Blank Page</router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'base-header'
  }
</script>

<style lang="scss">
  @import "sass/variables.scss";

  header,
  .header-container {
    height: $headerHeight;
    background: $headerBg;
    max-height: $headerHeight;
    line-height: $headerHeight;
  }

  .header-container { overflow: hidden; }

  .header-container a,
  .header-container a:visited {
    display: block;
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0;
    text-decoration: none;
    color: $headerLinkColor;
    border-color: darken($headerLinkColor, 50%);
    border-right: 1px solid;

    font-size: $headerFontSize;
  }

  .header-container a:last-child { border-right: none; }

  .header-container a:hover,
  .header-container a:focus,
  .header-container a:active {
    color: $headerLinkColorHover;
    text-decoration: none;
    background: lighten($headerBg, 30%);
  }
</style>
