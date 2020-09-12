<template>
  <b-row>
    <b-col cols="12" lg="4" md="4">
      <article class="today-income">
        <div class="article-container">
          <p>Today's Income</p>
          <h3>
            Rp.
            {{
            todayIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }}
          </h3>
          <p v-if="todayIncome > prevIncome && prevIncome !== 0">+{{ profitGrowth() }}% Yesterday</p>
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
          <p
            v-if="countThisWeek > countPrevWeek && countPrevWeek !== 0"
          >+{{ orderGrowth() }}% Last Week</p>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Card',
  methods: {
    ...mapActions(['getIncome', 'getCountHistoryWeek', 'getYearIncome']),
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
    }
  },
  computed: {
    ...mapGetters({ todayIncome: 'getTodayIncome', prevIncome: 'getPrevIncome', countThisWeek: 'getCountThisWeek', countPrevWeek: 'getCountPrevWeek', yearIncome: 'getThisYearIncome', prevYearIncome: 'getPrevYearIncome' })
  },
  created() {
    this.getIncome(new Date().toJSON().slice(0, 10))
    this.getIncome(new Date(Date.now() - 864e5).toJSON().slice(0, 10))
    this.getCountHistoryWeek(new Date().toJSON().slice(0, 10))
    this.getCountHistoryWeek(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7).toJSON().slice(0, 10))
    this.getYearIncome(new Date().toJSON().slice(0, 10))
    this.getYearIncome(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()).toJSON().slice(0, 10))
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
