<template>
  <div id="calendar-container">
    <div id="calendar-header">
      <button class="cal-nav-btn" type="button" id="cal-nav-left" @click="onNavLeft">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button class="cal-nav-btn" type="button" id="cal-nav-right" @click="onNavRight">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
      <div id="cal-nav-center">

      </div>
    </div>
    <div id="calendar-header-labels">
      <div v-for="(label, index) in displayedData.daysPerWeekShown" class="header-label">
        <span>{{ label }}</span>
      </div>
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
        // todo: this actually should be something like eventData endpoint. Because this will be ajax ready.
        type: Array,
        required: false, // todo: change this to true and remove default
        default: function () {
          return [
            {start_date: '2017-05-18T13:00:00.419Z', end_date: '2017-05-18T14:00:00.419Z', title: 'Test Event 1'},
            {start_date: '2017-05-18T15:00:00.419Z', end_date: '2017-05-18T16:00:00.419Z', title: 'Test Event 2'}
          ]
        }
      },
      weeksShown: {
        type: Number,
        default: 6
      },
      daysPerWeekShown: {
        type: Number,
        default: 7
      },
      firstDayOfWeek: {
        type: String,
        default: 'Sunday'
      },
      initDateSelected: {
        type: String,
        default: function () {
          return moment().format()
        }
      },
      minDate: {
        type: String,
        default: function () {
          return moment().subtract(100, 'years').startOf('year').format()
        }
      },
      maxDate: {
        type: String,
        default: function () {
          return moment().add(100, 'years').endOf('year').format()
        }
      },
      maxWidth: '100%'
    },
    data () {
      return {
        dateToday: null,
        dateSelected: null,
        calCache: [],
        displayedData: {
          year: 0,
          month: 0,
          week: 0,
          daySelected: 0,
          daysPerWeekShown: {}
        }
      }
    },
    created: function () {
      this.init()
    },
    mounted: function () {},
    beforeDestroy: function () {},
    methods: {
      init: function () {
        this.setMaxWidth()
        this.dateToday = moment()
        this.setDateSelected()

        // todo: apparently you can't change the value of props. so I guess we won't do this right now.
        // todo: instead I could make a copy of these variables in this.data, and the value in this.props is just the initial value.
        // this.validateProps()

        this.updateDisplayedData()
      },
      setMaxWidth: function () {
        if (/^[0-9]+((px)|[%])$/g.test(this.maxWidth)) {
          document.getElementById('#calendar-container').css('max-width', this.maxWidth)
        }
      },
      updateDisplayedData: function () {
        this.updateCache()
        this.displayedData.year = this.dateSelected.get('year')
        this.displayedData.month = this.dateSelected.get('month')
        this.displayedData.daySelected = this.dateSelected.get('date')
        // todo
      },
      updateCache: function () {
        var thisYear = this.dateSelected.get('year')
        var thisMonth = this.dateSelected.get('month')
        // var thisDay = this.dateSelected.get('date')
        var tempDate = moment({
          year: thisYear,
          month: thisMonth,
          day: 1
        })

        var endOfMonth = moment(tempDate).endOf('month')

        // Create this year's cache if it doesn't exist
        if (this.calCache[thisYear] === undefined) { this.calCache[thisYear] = [] }

        // Create this month's cache if it doesn't exist
        if (this.calCache[thisYear][thisMonth] === undefined) { this.calCache[thisYear][thisMonth] = [] }

        for (var i = 1; i < endOfMonth.date(); i++) {
          this.calCache[thisYear][thisMonth][i] = [] // temp
          tempDate.add(1, 'days')
        }
      },
      setDateSelected: function (date) {
        // if (date !== undefined && date !== null && !/(invalid)/.test(moment(date).inspect())) {
        if (date !== undefined && date !== null && moment(date).isValid()) {
          this.dateSelected = moment(date)
        } else {
          this.dateSelected = moment(this.initDateSelected)
        }
      },
      getNumDaysDisplayed: function () {
        // return this.daysPerWeekShown * this.weeksShown
        // todo: if I need this function, I think it will be the difference between getDisplayedStartDate and getDisplayedEndDate
      },
      getDisplayedStartDate: function () {
        var startOfMonth = moment(this.dateSelected).startOf('month')
        // we need to figure out where in the row and where in the column the selected day lies.
        // if there are 7 days, we know we can just get the day of the week.
        // var daysDisplayed = this.weeksShown * this.daysPerWeekShown
        var startDate = moment(this.dateSelected)
        // todo
        return startDate
      },
      getDisplayedEndDate: function () {
        var endDate = moment(this.dateSelected)
        // todo
        return endDate
      },
      onNavLeft: function () {},
      onNavRight: function () {},
      validateProps: function () {
        // validate eventData
        // todo

        // Validate weeksShown
        if (this.weeksShown < 1 || this.weeksShown > 18) {
          console.warn('Value of weeksShown [' + this.weeksShown + '] is invalid. Setting to default.')
          this.weeksShown = this.weeksShown.default
        }

        // Validate daysPerWeekShown
        if (this.daysPerWeekShown < 1 || this.daysPerWeekShown > 7) {
          console.warn('Value of daysPerWeekShown [' + this.daysPerWeekShown + '] is invalid. Setting to default.')
          this.daysPerWeekShown = this.daysPerWeekShown.default
        }

        // Validate minDate
        if (/(invalid)/.test(moment(this.minDate).inspect())) {
          console.warn('Value of minDate [' + this.minDate + '] is invalid. setting to default.')
          this.minDate = this.minDate.default
        }

        // Validate maxDate
        if (/(invalid)/.test(moment(this.maxDate).inspect())) {
          console.warn('Value of maxDate [' + this.maxDate + '] is invalid. setting to default.')
          this.maxDate = this.maxDate.default
        }
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
