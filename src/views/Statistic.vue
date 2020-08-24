<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" class="header">
        <b-row>
          <b-col cols="2" class="header-icon">
            <img src="@/assets/img/menu.png" alt="toggle-menu" v-b-toggle.sidebar-backdrop />
          </b-col>
          <b-col cols="8" class="header-text">
            <h1>Statistic</h1>
          </b-col>
          <b-col cols="2" class="header-icon"></b-col>
        </b-row>
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
                <h3>3270</h3>
                <p>+5% Last Week</p>
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
                <h3>Rp. 100.000.000.000</h3>
                <p>+10% Last Year</p>
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse1" />
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse2" />
                <img src="@/assets/img/Ellipse 3.png" alt="ellipse" class="ellipse3" />
              </div>
            </article>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-sidebar id="sidebar-backdrop" :title="msg" backdrop-variant="dark" backdrop shadow>
      <Sidebar />
    </b-sidebar>
  </b-container>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1'
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
