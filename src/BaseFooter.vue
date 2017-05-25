<template>
  <footer>
    <div class="container-primary footer-container">
      &copy;  BlueSalt Labs
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'base-footer'
  }
</script>

<style lang="scss">
  @import "sass/variables.scss";

  footer,
  .footer-container {
    background: $headerBg;
    color: $footerFontColor;
    line-height: $footerHeight;
    min-height: $footerHeight;
  }
</style>
