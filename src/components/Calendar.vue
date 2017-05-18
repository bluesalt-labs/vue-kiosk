<template>
  <div id="calendar-container">
    <div id="calendar-header">
      <button class="cal-nav-btn" type="button" id="cal-nav-left"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
      <button class="cal-nav-btn" type="button" id="cal-nav-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
      <div id="cal-nav-center">

      </div>
    </div>
    <div id="calendar-header-labels">

    </div>
    <div id="calendar-body">

    </div>
  </div>
</template>

<script>
  var moment = require('moment')

  export default {
    name: 'calendar',
    props: {
      eventData: {
        type: Array,
        default: function () {
          return [
            {start_date: '2017-05-18T13:00:00.419Z', end_date: '2017-05-18T14:00:00.419Z', title: 'Test Event 1'},
            {start_date: '2017-05-18T15:00:00.419Z', end_date: '2017-05-18T16:00:00.419Z', title: 'Test Event 2'}
          ]
        }
      }
    },
    data () {
      return {
        dateToday: null
      }
    },
    created: function () {},
    mounted: function () {
      this.init()
    },
    beforeDestroy: function () {},
    methods: {
      init: function () {
        this.dateToday = moment()
      },
      setMaxWidth: function (maxWidth) {
        document.getElementById('#calendar-container').css('max-width', maxWidth)
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/css/font-awesome.min.css';
  @import '../sass/_variables.scss';

  // Variables
  $calHeaderHeight: 50px;
  $calBorderColor: #888;

  #calendar-container {
    border: 1px solid $calBorderColor;
    flex-flow: column wrap;
  }

  #calendar-container,
  #calendar-container > #calendar-header,
  #calendar-container > #calendar-header-labels,
  #calendar-container > #calendar-body { display: flex; width: 100%; }

  #calendar-container > #calendar-header {
    flex-flow: row nowrap;
    font-size: 1.5em;
  }

  #calendar-container > #calendar-header,
  #calendar-container > #calendar-header > .cal-nav-btn,
  #calendar-container > #calendar-header > #cal-nav-center {
    height: $calHeaderHeight;
  }

  .cal-nav-btn {
    display: block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: none;
    cursor: pointer;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: hidden;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    width: $calHeaderHeight;
    flex-shrink: 0;
  }
  .cal-nav-btn:hover,
  .cal-nav-btn:active { background: $calBorderColor; } /* todo: don't keep this color */

  #calendar-header > #cal-nav-left { order: 0; border-right: 1px solid $calBorderColor; }
  #calendar-header > #cal-nav-center { order: 1; flex-grow: 1; width: 100%; }
  #calendar-header > #cal-nav-right { order: 2; border-left: 1px solid $calBorderColor; }

  #calendar-header-labels {
    border-top: 1px solid $calBorderColor;
    border-bottom: 1px solid $calBorderColor;
  }
</style>
