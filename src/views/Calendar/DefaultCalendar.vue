<template>
  <!-- todo: these css style settings are temporary -->
  <div class="container-primary" style="height:90vh">
    <div class="component-container"  style="height:90vh">
      <calendar></calendar>
    </div>
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
