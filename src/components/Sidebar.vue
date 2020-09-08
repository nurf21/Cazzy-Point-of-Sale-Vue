<template>
  <b-container fluid>
    <b-img :src="avatar" class="avatar" fluid />
    <h5 class="user">{{ user }}</h5>
    <hr />
    <b-navbar variant="faded" type="light">
      <router-link to="/">
        <b-navbar-brand>
          <img src="@/assets/img/waiter.png" class="mr-2 d-inline-block align-top" alt="foods" />
          Food and Drink
        </b-navbar-brand>
      </router-link>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <router-link to="/statistic">
        <b-navbar-brand>
          <img
            src="@/assets/img/dashboard.png"
            class="mr-2 d-inline-block align-top"
            alt="statistic"
          />
          Statistic
        </b-navbar-brand>
      </router-link>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <router-link to="/setting">
        <b-navbar-brand>
          <img src="@/assets/img/settings.png" class="mr-2 d-inline-block align-top" alt="setting" />
          Setting
        </b-navbar-brand>
      </router-link>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand>
        <img src="@/assets/img/settings.png" class="mr-2 d-inline-block align-top" alt="setting" />
        <a class="logout" @click="handleLogout">Logout</a>
      </b-navbar-brand>
    </b-navbar>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      user: 'Cashier #1',
      avatar: require('@/assets/img/blank.jpg')
    }
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' })
  }
}
</script>

<style scoped>
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

.logout {
  cursor: pointer;
}
</style>
