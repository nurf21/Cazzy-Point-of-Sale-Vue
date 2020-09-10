<template>
  <b-sidebar id="sidebar-backdrop" :title="greet" backdrop-variant="dark" backdrop shadow>
    <b-img :src="url + '/' + user.user_image" class="avatar" fluid />
    <router-link to="/profile" class="user">
      <p>{{ user.user_name }}</p>
    </router-link>
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
      <b-navbar-brand @click="handleLogout" class="logout">
        <img src="@/assets/img/settings.png" class="mr-2 d-inline-block align-top" alt="setting" />
        Logout
      </b-navbar-brand>
    </b-navbar>
  </b-sidebar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      user: {},
      url: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    ...mapActions({ handleLogout: 'logout', getUserData: 'userData' }),
    ...mapGetters(['getUser'])
  },
  computed: {
    greet: {
      get() {
        return `Welcome, ${this.getUser().user_name}!`
      }
    }
  },
  created() {
    this.getUserData(this.getUser().user_id).then(result => {
      this.user = result.data[0]
    }).catch(error => {
      console.log(error)
      alert('Please login first')
      this.handleLogout()
    })
  }
}
</script>

<style scoped>
.avatar {
  border-radius: 100%;
  padding: 10px 55px 10px 55px;
}
.user {
  text-align: center;
  font-size: 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.9);;
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
