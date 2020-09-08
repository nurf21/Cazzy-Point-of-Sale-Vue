<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" class="header">
        <Header text="Statistic" />
      </b-col>
    </b-row>

    <b-row class="statistic-container">
      <b-col cols="12" class="statistic-content">
        <b-row>
          <b-col cols="12" lg="4" md="6">
            <article class="today-income">
              <div class="article-container">
                <p>Today's Income</p>
                <h3>
                  Rp.
                  {{
                  todayIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }}
                </h3>
                <p v-if="todayIncome > prevIncome">+{{ profitGrowth() }}% Yesterday</p>
                <p v-else-if="todayIncome < prevIncome">{{ profitGrowth() }}% Yesterday</p>
                <img src="@/assets/img/Ellipse 1.png" alt="ellipse" class="ellipse1" />
                <img src="@/assets/img/Ellipse 1.png" alt="ellipse" class="ellipse2" />
                <img src="@/assets/img/Ellipse 1.png" alt="ellipse" class="ellipse3" />
              </div>
            </article>
          </b-col>

          <b-col cols="12" lg="4" md="6">
            <article class="order">
              <div class="article-container">
                <p>Orders</p>
                <h3>{{ countThisWeek }}</h3>
                <p v-if="countThisWeek > countPrevWeek">+{{ orderGrowth() }}% Last Week</p>
                <p v-else-if="countThisWeek < countPrevWeek">{{ orderGrowth() }}% Last Week</p>
                <img src="@/assets/img/Ellipse 2.png" alt="ellipse" class="ellipse1" />
                <img src="@/assets/img/Ellipse 2.png" alt="ellipse" class="ellipse2" />
                <img src="@/assets/img/Ellipse 2.png" alt="ellipse" class="ellipse3" />
              </div>
            </article>
          </b-col>

          <b-col cols="12" lg="4" md="6">
            <article class="year-income">
              <div class="article-container">
                <p>This Year's Income</p>
                <h3>Rp. {{yearIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</h3>
                <p v-if="yearIncome > prevYearIncome">+{{ yearGrowth() }}% Last Year</p>
                <p v-else-if="yearIncome < prevYearIncome">{{ yearGrowth() }}% Last Year</p>
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse1" />
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse2" />
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse3" />
              </div>
            </article>
          </b-col>
        </b-row>
        <b-row class="revenue">
          <b-col cols="6" style="margin-top: 20px">
            <p style="font-size: 30px;">Revenue</p>
          </b-col>
          <b-col cols="6" style="text-align: end; margin-top: 20px">
            <b-dropdown id="dropdown-1" :text="month" class="m-md-2">
              <b-dropdown-item @click="chartJan()">January</b-dropdown-item>
              <b-dropdown-item @click="chartFeb()">February</b-dropdown-item>
              <b-dropdown-item @click="chartMar()">March</b-dropdown-item>
              <b-dropdown-item @click="chartApr()">April</b-dropdown-item>
              <b-dropdown-item @click="chartMay()">May</b-dropdown-item>
              <b-dropdown-item @click="chartJun()">June</b-dropdown-item>
              <b-dropdown-item @click="chartJul()">July</b-dropdown-item>
              <b-dropdown-item @click="chartAug()">August</b-dropdown-item>
              <b-dropdown-item @click="chartSep()">September</b-dropdown-item>
              <b-dropdown-item @click="chartOct()">October</b-dropdown-item>
              <b-dropdown-item @click="chartNov()">November</b-dropdown-item>
              <b-dropdown-item @click="chartDec()">December</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <div class="chart-container">
            <line-chart :data="chartData" />
          </div>
        </b-row>

        <b-row class="recent">
          <b-col cols="6" style="margin-top: 20px">
            <p style="font-size: 30px;">Recent Order</p>
          </b-col>
          <b-col cols="6" style="text-align: end; margin-top: 20px">
            <b-dropdown id="dropdown-1" :text="text" class="m-md-2">
              <b-dropdown-item @click="getHistoryToday()">Today</b-dropdown-item>
              <b-dropdown-item @click="getHistoryWeek()">This Week</b-dropdown-item>
              <b-dropdown-item @click="getHistoryMonth()">This Month</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <div style="width: 100%">
            <b-table
              id="my-table"
              responsive
              striped
              hover
              :items="items"
              :per-page="perPage"
              :current-page="currentPage"
              style="text-align: center"
            ></b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              align="center"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </b-row>
      </b-col>
    </b-row>

    <b-sidebar id="sidebar-backdrop" :title="msg" backdrop-variant="dark" backdrop shadow>
      <Sidebar />
    </b-sidebar>
  </b-container>
</template>

<script>
import axios from 'axios'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default {
  name: 'Statistic',
  components: {
    Sidebar,
    Header
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1',
      month: 'Month',
      text: 'Today',
      perPage: 5,
      currentPage: 1,
      items: [],
      chartData: [],
      currDate: new Date().toJSON().slice(0, 10),
      prevDate: new Date(Date.now() - 864e5).toJSON().slice(0, 10),
      prevWeek: new Date(new Date().getFullYear(), new Date().getMonth(),
        new Date().getDate() - 7).toJSON().slice(0, 10),
      prevYear: new Date(new Date().getFullYear() - 1, new Date().getMonth(),
        new Date().getDate()).toJSON().slice(0, 10),
      todayIncome: 0,
      prevIncome: 0,
      countThisWeek: 0,
      countPrevWeek: 0,
      yearIncome: 0,
      prevYearIncome: 0,
      history: []
    }
  },
  created() {
    this.getHistoryToday()
    this.getDataChart()
    this.getTodayIncome()
    this.getPrevIncome()
    this.getYearIncome()
    this.getPrevYearIncome()
    this.getCountHistoryWeek()
    this.getCountHistoryLastWeek()
  },
  methods: {
    getHistoryToday() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_IP}/history/today`)
        .then(response => {
          this.history = response.data.data
          this.history.map((value) => {
            const setItem = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: this.user,
              DATE: value.history_created_at.slice(0, 10),
              ORDERS: value.orders.map(item => item.product_name.concat(` ${item.order_qty}x`)).join(', '),
              AMOUNT: `Rp. ${value.history_subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
            }
            this.items = [...this.items, setItem]
          })
          this.text = 'Today'
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryWeek() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_IP}/history/week`)
        .then(response => {
          this.history = response.data.data
          this.history.map((value) => {
            const setItem = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: this.user,
              DATE: value.history_created_at.slice(0, 10),
              ORDERS: value.orders.map(item => item.product_name.concat(` ${item.order_qty}x`)).join(', '),
              AMOUNT: `Rp. ${value.history_subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
            }
            this.items = [...this.items, setItem]
          })
          this.text = 'This Week'
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryMonth() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_IP}/history/month`)
        .then(response => {
          this.history = response.data.data
          this.history.map((value) => {
            const setItem = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: this.user,
              DATE: value.history_created_at.slice(0, 10),
              ORDERS: value.orders.map(item => item.product_name.concat(` ${item.order_qty}x`)).join(', '),
              AMOUNT: `Rp. ${value.history_subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
            }
            this.items = [...this.items, setItem]
          })
          this.text = 'This Month'
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDataChart() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/chart?date=${this.currDate}`)
        .then(response => {
          const setChart = response.data.data
          for (let i = 0; i < setChart.length; i++) {
            this.chartData.push([setChart[i].date, setChart[i].sum])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTodayIncome() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/income?date=${this.currDate}`)
        .then(response => {
          this.todayIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPrevIncome() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/income?date=${this.prevDate}`)
        .then(response => {
          this.prevIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getYearIncome() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/incomeyear?date=${this.currDate}`)
        .then(response => {
          this.yearIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPrevYearIncome() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/incomeyear?date=${this.prevYear}`)
        .then(response => {
          this.prevYearIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCountHistoryWeek() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/count?date=${this.currDate}`)
        .then(response => {
          this.countThisWeek = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCountHistoryLastWeek() {
      axios
        .get(`${process.env.VUE_APP_IP}/history/count?date=${this.prevWeek}`)
        .then(response => {
          this.countPrevWeek = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    profitGrowth() {
      const count =
        ((this.todayIncome - this.prevIncome) / this.prevIncome) * 100
      return Math.ceil(count)
    },
    orderGrowth() {
      const count = ((this.countThisWeek - this.countPrevWeek) / this.countPrevWeek) * 100
      return Math.ceil(count)
    },
    yearGrowth() {
      const count = ((this.yearIncome - this.prevYearIncome) / this.prevYearIncome) * 100
      return Math.ceil(count)
    },
    chartJan() {
      this.month = 'January'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 0, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartFeb() {
      this.month = 'February'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 1, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartMar() {
      this.month = 'March'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 2, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartApr() {
      this.month = 'April'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 3, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartMay() {
      this.month = 'May'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 4, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartJun() {
      this.month = 'June'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 5, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartJul() {
      this.month = 'July'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 6, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartAug() {
      this.month = 'August'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 7, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartSep() {
      this.month = 'September'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 8, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartOct() {
      this.month = 'October'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 9, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartNov() {
      this.month = 'November'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 10, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    },
    chartDec() {
      this.month = 'December'
      this.chartData = []
      this.currDate = new Date(new Date().getFullYear(), 11, 2).toJSON().slice(0, 10)
      console.log(this.currDate)
      this.getDataChart()
    }
  },
  computed: {
    msg: {
      get() {
        return `${this.greet}, ${this.user} !`
      }
    },
    rows() {
      return this.items.length
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
