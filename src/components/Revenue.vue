<template>
  <b-row class="revenue">
    <b-col cols="6" style="margin-top: 20px">
      <p style="font-size: 30px;">Revenue</p>
    </b-col>
    <b-col cols="6" style="text-align: end; margin-top: 20px">
      <b-dropdown id="dropdown-1" :text="month" class="m-md-2">
        <b-dropdown-item @click="onMonth('Jan')">January</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Feb')">February</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Mar')">March</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Apr')">April</b-dropdown-item>
        <b-dropdown-item @click="onMonth('May')">May</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Jun')">June</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Jul')">July</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Aug')">August</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Sep')">September</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Oct')">October</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Nov')">November</b-dropdown-item>
        <b-dropdown-item @click="onMonth('Dec')">December</b-dropdown-item>
      </b-dropdown>
    </b-col>
    <div class="chart-container">
      <line-chart :data="chartData" />
    </div>
  </b-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Revenue',
  data() {
    return {
      month: 'Month'
    }
  },
  methods: {
    ...mapActions(['getChartData']),
    ...mapMutations(['clearChart']),
    onMonth(value) {
      if (value === 'Jan') {
        this.month = 'January'
        this.getChartData(new Date(new Date().getFullYear(), 0, 2).toJSON().slice(0, 10))
      } else if (value === 'Feb') {
        this.month = 'February'
        this.getChartData(new Date(new Date().getFullYear(), 1, 2).toJSON().slice(0, 10))
      } if (value === 'Mar') {
        this.month = 'March'
        this.getChartData(new Date(new Date().getFullYear(), 2, 2).toJSON().slice(0, 10))
      } else if (value === 'Apr') {
        this.month = 'April'
        this.getChartData(new Date(new Date().getFullYear(), 3, 2).toJSON().slice(0, 10))
      } else if (value === 'May') {
        this.month = 'May'
        this.getChartData(new Date(new Date().getFullYear(), 4, 2).toJSON().slice(0, 10))
      } else if (value === 'Jun') {
        this.month = 'June'
        this.getChartData(new Date(new Date().getFullYear(), 5, 2).toJSON().slice(0, 10))
      } else if (value === 'Jul') {
        this.month = 'July'
        this.getChartData(new Date(new Date().getFullYear(), 6, 2).toJSON().slice(0, 10))
      } else if (value === 'Aug') {
        this.month = 'August'
        this.getChartData(new Date(new Date().getFullYear(), 7, 2).toJSON().slice(0, 10))
      } else if (value === 'Sep') {
        this.month = 'September'
        this.getChartData(new Date(new Date().getFullYear(), 8, 2).toJSON().slice(0, 10))
      } else if (value === 'Oct') {
        this.month = 'October'
        this.getChartData(new Date(new Date().getFullYear(), 9, 2).toJSON().slice(0, 10))
      } else if (value === 'Nov') {
        this.month = 'November'
        this.getChartData(new Date(new Date().getFullYear(), 10, 2).toJSON().slice(0, 10))
      } else if (value === 'Dec') {
        this.month = 'December'
        this.getChartData(new Date(new Date().getFullYear(), 11, 2).toJSON().slice(0, 10))
      }
    }
  },
  computed: {
    ...mapGetters({ chartData: 'getChart' })
  },
  created() {
    this.clearChart()
    this.getChartData(new Date().toJSON().slice(0, 10))
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
