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
        <label for="month-dd" class="sr-only">Calendar Month</label>
        <select name="month-dd" id="month-dd" dir="rtl" @change="onMonthChange">
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <label for="year-dd">Calendar Year</label>
        <select name="year-dd" id="year-dd" @change="onYearChange">
          <option v-for="yearVal in Object.keys(calCache)" :value="yearVal">{{ yearVal }}</option>
        </select>
        <button id="btn-today" class="month-is-cur" @click="onTodayClick">Today</button>
      </div>
    </div>
    <div id="calendar-header-labels">
      <div v-for="num in daysPerWeekShown" class="header-label">
        <span>{{ getDayName(num - 1) }}</span>
      </div>
    </div>
    <div id="calendar-body">
      <div v-for="weekId in weeksShown" class="week-container" :id="'week-' + weekId">
        <div v-for="dayId in daysPerWeekShown" class="day-container" :id="'day-' + (((weekId - 1) * daysPerWeekShown) + (dayId - 1))">
          {{ (((weekId - 1) * daysPerWeekShown) + (dayId - 1)) }}
        </div>
      </div>
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
            { start_date: '2017-05-18T13:00:00.419Z', end_date: '2017-05-18T14:00:00.419Z', title: 'Test Event 1' },
            { start_date: '2017-05-18T15:00:00.419Z', end_date: '2017-05-18T16:00:00.419Z', title: 'Test Event 2' }
          ]
        }
      },
      initDateSelected: {
        type: String,
        default: function () {
          return moment().format()
        }
      },
      initMinDate: {
        type: String,
        default: function () {
          return moment().subtract(100, 'years').startOf('year').format()
        }
      },
      initMaxDate: {
        type: String,
        default: function () {
          return moment().add(100, 'years').endOf('year').format()
        }
      },
      initFirstDayOfWeek: {
        type: String,
        default: 'Sunday'
      },
      weeks: {
        type: Number,
        default: 6
      },
      daysPerWeek: {
        type: Number,
        default: 7
      },
      maxWidth: {
        type: String,
        default: '100%'
      }
    },
    data () {
      return {
        dateToday: null,
        dateSelected: null,
        weeksShown: 0,
        daysPerWeekShown: 0,
        firstDayOfWeek: 0,
        minDate: {},
        maxDate: {},
        calCache: [],
        displayedData: {
          year: 0,
          month: 0,
          week: 0,
          daySelected: 0
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
        this.validateProps()
        this.dateToday = moment()
        this.updateDisplayedData()
      },
      setMaxWidth: function () {
        var calendarContainer = document.getElementById('calendar-container')
        if (calendarContainer !== null && /^[0-9]+((px)|[%])$/g.test(this.maxWidth)) {
          calendarContainer.style.maxWidth = this.maxWidth
        }
      },
      updateDisplayedData: function () {
        this.updateCache()
        this.displayedData.year = this.dateSelected.year()
        this.displayedData.month = this.dateSelected.month()
        this.displayedData.daySelected = this.dateSelected.date()
        // todo
      },
      updateCache: function () {
        var tempDate = this.getDisplayedStartDate()
        var endDate = this.getDisplayedEndDate()

        var thisYear = this.dateSelected.year()
        var thisMonth = this.dateSelected.month()
        // var thisDay = this.dateSelected.date()

        // Create this year's cache if it doesn't exist
        if (this.calCache[thisYear] === undefined) { this.calCache[thisYear] = [] }

        // Create this month's cache if it doesn't exist
        if (this.calCache[thisYear][thisMonth] === undefined) { this.calCache[thisYear][thisMonth] = [] }

        // Create and/or update each day's cache
        // for (null; startDate < endDate; startDate.add(1, 'days')) {
        var i = 0
        var max = this.getNumDaysDisplayed()
        var y = tempDate.year()
        var m = tempDate.month()
        var d = tempDate.date()

        while (tempDate.diff(endDate, 'days') > 0 && i < max) {
          this.calCache[y][m][d] = [] // temp

          // Increment everything
          i++
          tempDate.add(1, 'days')
          y = tempDate.year()
          m = tempDate.month()
          d = tempDate.date()
        }
      },
      setDateSelected: function (date) {
        if (date !== undefined && date !== null && moment(date).isValid()) {
          this.dateSelected = moment(date)

          if (!this.isDateSelectedDisplayed()) { this.updateDisplayedData() }
        }
      },
      getNumDaysDisplayed: function () {
        return this.daysPerWeekShown * this.weeksShown
      },
      isDateSelectedDisplayed: function () {
        // todo: this logic probably needs to change when I implement different views besides by month.
        // todo: basically this should be a function that checks if the selected date is between displayed start date
        // todo: and displayed end date.
        return (
          this.dateSelected.year() !== this.displayedData.year ||
          this.dateSelected.month() !== this.displayedData.month
        )
      },
      getDisplayedStartDate: function () {
        // todo: I need to figure out where in the row and where in the column the selected day lies.
        // todo: if there are 7 days, we know we can just get the day of the week.
        // todo: for now, I'm just going to write this assuming a full 6 weeks are displayed. (6 rows, 7 columns).
        var startDate = moment(this.dateSelected).startOf('month')
        var tempDayOfWeek = startDate.date()

        if (tempDayOfWeek !== 0) {
          startDate.subtract(tempDayOfWeek, 'days')
        } else {
          startDate.subtract(7, 'days')
        }

        return startDate
      },
      getDisplayedEndDate: function () {
        // todo: see notes in getDisplayedStartDate
        var daysDisplayed = this.weeksShown * this.daysPerWeekShown
        var endDate = this.getDisplayedStartDate()

        // endDate.add(daysDisplayed - 1, 'days') // todo This instead?
        endDate.add(daysDisplayed, 'days')
        return endDate
      },
      getDayName: function (day) {
        var offset = moment().day(this.firstDayOfWeek).day()
        return moment().day(day + offset).format('dddd')
      },
      onNavLeft: function () {},
      onNavRight: function () {},
      onMonthChange: function () {

      },
      onYearChange: function () {},
      onTodayClick: function () {},
      validateProps: function () {
        // Validate maxWidth
        this.setMaxWidth()

        // Validate eventData
        // todo

        // Validate weeksShown
        if (this.weeks < 1 || this.weeks > 18) {
          console.warn('Value of weeks [' + this.weeksShown + '] is invalid. Setting to default.')
          this.weeksShown = this.weeks.default
        } else {
          this.weeksShown = this.weeks
        }

        // Validate daysPerWeekShown
        if (this.daysPerWeek < 1 || this.daysPerWeek > 7) {
          console.warn('Value of daysPerWeek [' + this.daysPerWeekShown + '] is invalid. Setting to default.')
          this.daysPerWeekShown = this.daysPerWeek.default
        } else {
          this.daysPerWeekShown = this.daysPerWeek
        }

        // Validate minDate
        if (!moment(this.initMinDate).isValid()) {
          console.warn('Value of initMinDate [' + this.initMinDate + '] is invalid. setting to default.')
          this.minDate = moment(this.initMinDate.default())
        } else {
          this.minDate = moment(this.initMinDate)
        }

        // Validate maxDate
        if (!moment(this.initMaxDate).isValid()) {
          console.warn('Value of initMaxDate [' + this.initMaxDate + '] is invalid. setting to default.')
          this.maxDate = moment(this.initMaxDate.default())
        } else {
          this.maxDate = moment(this.initMaxDate)
        }

        // Validate dateSelected
        if (!moment(this.initDateSelected).isValid()) {
          console.warn('Value of initDateSelected [' + this.initDateSelected + '] is invalid. setting to default.')
          this.dateSelected = moment(this.initDateSelected.default())
        } else {
          this.dateSelected = moment(this.initDateSelected)
        }

        // Validate firstDayOfWeek
        if (!moment().day(this.initFirstDayOfWeek).isValid()) {
          console.warn('Value of initFirstDayOfWeek [' + this.initFirstDayOfWeek + '] is invalid. setting to default.')
          this.firstDayOfWeek = moment(this.initFirstDayOfWeek.default).day()
        } else {
          this.firstDayOfWeek = moment(this.initFirstDayOfWeek).day()
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
    flex-flow: row wrap;
    align-content: flex-start;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }

  #calendar-container,
  #calendar-container > #calendar-header,
  #calendar-container > #calendar-header-labels,
  #calendar-container > #calendar-body { display: flex; width: 100%; }

  #calendar-container > #calendar-header {
    flex-flow: row nowrap;
    font-size: 3.5vmin;
    text-align: center;
  }

  #calendar-container > #calendar-header,
  #calendar-container > #calendar-header select,
  #calendar-container > #calendar-header button,
  #calendar-container > #calendar-header > #cal-nav-center { height: $calHeaderHeight; }

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

  #calendar-header button,
  #calendar-header select {
    -webkit-transition: background 150ms;
    transition: background 150ms;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  #calendar-header button:hover, #calendar-header button:focus, #calendar-header button:active,
  #calendar-header select:hover, #calendar-header select:focus, #calendar-header select:active {
    background: rgba(166, 166, 166, 0.5)
  }

  #calendar-header > #cal-nav-left { order: 0; border-right: 1px solid $calBorderColor; }
  #calendar-header > #cal-nav-center { order: 1; flex-grow: 1; width: 100%; }
  #calendar-header > #cal-nav-right { order: 2; border-left: 1px solid $calBorderColor; }

  #calendar-header-labels {
    height: $calHeaderHeight;
    border-top: 1px solid $calBorderColor;
    border-bottom: 1px solid $calBorderColor;
  }

  #calendar-header-labels > .header-label,
  #calendar-header-labels > .header-label > span {
    width: 100%;
    text-align: center;
    font-size: 2vmin;
    line-height: $calHeaderHeight;
    font-weight: bold;
  }

  #calendar-body > .week-container:not(:last-child) { border-bottom: 1px solid $calBorderColor; }
  #calendar-header-labels > .header-label:not(:last-child),
  #calendar-body > .week-container > .day-container:not(:last-child) { border-right: 1px solid $calBorderColor; }

  #calendar-header label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  #calendar-header select {
    display: inline-block;
    margin: 0 -3px;
    background: transparent;
    font-size: 3.5vmin;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    padding: 0 8px;
  }

  #cal-nav-center button#btn-today { position: absolute; }
  #cal-nav-center button.month-is-cur#btn-today { visibility: hidden; }

  #calendar-body {
    flex: 1 0 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #calendar-body > .week-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
  .week-container > .day-container {
    width: 100%;
    height: 100%;
  }
</style>
