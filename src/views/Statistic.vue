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
                <h3>Rp. 1.000.000</h3>
                <p>+2% Yesterday</p>
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
                <h3>3270</h3>
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
      ]
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
