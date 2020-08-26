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
                <p v-if="todayIncome > prevIncome">
                  +{{ dailyProfit() }}% Yesterday
                </p>
                <p v-else>{{ dailyProfit() }}% Yesterday</p>
                <img
                  src="@/assets/img/Ellipse 1.png"
                  alt="ellipse"
                  class="ellipse1"
                />
                <img
                  src="@/assets/img/Ellipse 1.png"
                  alt="ellipse"
                  class="ellipse2"
                />
                <img
                  src="@/assets/img/Ellipse 1.png"
                  alt="ellipse"
                  class="ellipse3"
                />
              </div>
            </article>
          </b-col>

          <b-col cols="12" lg="4" md="6">
            <article class="order">
              <div class="article-container">
                <p>Orders</p>
                <h3>{{ totalData }}</h3>
                <p>+5% Last Week</p>
                <img
                  src="@/assets/img/Ellipse 2.png"
                  alt="ellipse"
                  class="ellipse1"
                />
                <img
                  src="@/assets/img/Ellipse 2.png"
                  alt="ellipse"
                  class="ellipse2"
                />
                <img
                  src="@/assets/img/Ellipse 2.png"
                  alt="ellipse"
                  class="ellipse3"
                />
              </div>
            </article>
          </b-col>

          <b-col cols="12" lg="4" md="6">
            <article class="year-income">
              <div class="article-container">
                <p>This Year's Income</p>
                <h3>Rp. 100.000.000.000</h3>
                <p>+10% Last Year</p>
                <img
                  src="@/assets/img/Ellipse 3.png"
                  alt="ellipse"
                  class="ellipse1"
                />
                <img
                  src="@/assets/img/Ellipse 3.png"
                  alt="ellipse"
                  class="ellipse2"
                />
                <img
                  src="@/assets/img/Ellipse 3.png"
                  alt="ellipse"
                  class="ellipse3"
                />
              </div>
            </article>
          </b-col>
        </b-row>
        <b-row class="revenue">
          <b-col cols="6" style="margin-top: 20px">
            <p style="font-size: 30px;">Revenue</p>
          </b-col>
          <b-col cols="6" style="text-align: end; margin-top: 20px">
            <b-dropdown id="dropdown-1" text="Month" class="m-md-2">
              <b-dropdown-item v-for="(value, index) in month" :key="index">{{
                value
              }}</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <div class="chart-container">
            <line-chart :data="chartData" legend="bottom" />
          </div>
        </b-row>

        <b-row class="recent">
          <b-col cols="6" style="margin-top: 20px">
            <p style="font-size: 30px;">Recent Order</p>
          </b-col>
          <b-col cols="6" style="text-align: end; margin-top: 20px">
            <b-dropdown id="dropdown-1" text="Today" class="m-md-2">
              <b-dropdown-item>Today</b-dropdown-item>
              <b-dropdown-item>This Week</b-dropdown-item>
              <b-dropdown-item>This Month</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <div style="width: 100%">
            <b-table
              striped
              hover
              :items="items"
              style="text-align: center"
            ></b-table>
          </div>
        </b-row>
      </b-col>
    </b-row>

    <b-sidebar
      id="sidebar-backdrop"
      :title="msg"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <Sidebar />
    </b-sidebar>
  </b-container>
</template>

<script>
import axios from 'axios'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Header
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1',
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      items: [
        {
          INVOICES: '#10928',
          CASHIER: 'Cashier 1',
          DATE: '06 October 2019',
          ORDERS: 'Ice Tea, Salad With peanut sauce',
          AMOUNT: 'Rp. 120.000'
        }
      ],
      chartData: [
        {
          name: 'This Month',
          data: {
            '2020-08-21': Math.floor(Math.random() * 100000 + 1),
            '2020-08-22': Math.floor(Math.random() * 100000 + 1)
          }
        },
        {
          name: 'Last Month',
          data: {
            '2020-08-21': Math.floor(Math.random() * 100000 + 1),
            '2020-08-22': Math.floor(Math.random() * 100000 + 1)
          }
        }
      ],
      currDate: new Date().toJSON().slice(0, 10),
      todayIncome: 0,
      prevDate: new Date(Date.now() - 864e5).toJSON().slice(0, 10),
      prevIncome: 0,
      totalData: 0,
      history: []
    }
  },
  created() {
    this.getHistory()
    this.getTodayIncome()
    this.getPrevIncome()
  },
  methods: {
    getHistory() {
      axios.get('http://127.0.0.1:3001/history?limit=100').then(response => {
        this.history = response.data.data
        this.totalData = response.data.pagination.totalData
      })
    },
    getTodayIncome() {
      axios
        .get(`http://127.0.0.1:3001/history/income?date=${this.currDate}`)
        .then(response => {
          this.todayIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPrevIncome() {
      axios
        .get(`http://127.0.0.1:3001/history/income?date=${this.prevDate}`)
        .then(response => {
          this.prevIncome = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    dailyProfit() {
      const count =
        ((this.todayIncome - this.prevIncome) / this.prevIncome) * 100
      return Math.ceil(count)
    }
  },
  computed: {
    msg: {
      get() {
        return `${this.greet}, ${this.user} !`
      }
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
