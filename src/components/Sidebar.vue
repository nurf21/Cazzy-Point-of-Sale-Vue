<template>
  <b-container fluid>
    <b-img :src="avatar" class="avatar" fluid />
    <h5 class="user">{{user}}</h5>
    <hr />
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="home">
        <img src="@/assets/img/waiter.png" class="d-inline-block align-top" alt="foods" />
        Food and Drink
      </b-navbar-brand>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="statistic">
        <img src="@/assets/img/dashboard.png" class="d-inline-block align-top" alt="statistic" />
        Statistic
      </b-navbar-brand>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="setting">
        <img src="@/assets/img/settings.png" class="d-inline-block align-top" alt="setting" />
        Setting
      </b-navbar-brand>
    </b-navbar>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: 'Cashier #1',
      avatar: require('@/assets/img/blank.jpg')
    }
  }
}
</script>

<style>
  .avatar {
    border-radius: 100%;
    padding: 1.25rem;
  }
  .user {
    text-align: center;
    margin: 0;
  }
  .navbar {
    margin: 10px auto;
  }
  a.navbar-brand:hover {
    color: red;
  }
  .navbar img {
    width: 30px;
    height: 30px;
  }
</style>
