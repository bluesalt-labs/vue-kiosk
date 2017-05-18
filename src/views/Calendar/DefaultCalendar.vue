<template>
  <div class="container-primary">
    <calendar></calendar>
  </div>
</template>

<script>
  import Calendar from '@/components/Calendar'

  export default {
    name: 'DefaultCalendar',
    data () {
      return {
        title: 'Default Calendar'
      }
    },
    components: { Calendar },
    head: {
      title () {
        return {
          inner: this.title
        }
      }
    }
  }
</script>
