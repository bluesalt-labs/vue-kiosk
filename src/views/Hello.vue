<template>
  <div class="container">
    <h1>Hello.</h1>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      title: 'Hello'
    }
  },
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  }
}
</script>

