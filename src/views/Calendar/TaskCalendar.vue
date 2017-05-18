<template>
  <div class="container-primary">
    <div class="component-container">
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
  import Calendar from '@/components/Calendar'

  export default {
    name: 'TaskCalendar',
    data () {
      return {
        title: 'Task Calendar'
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
