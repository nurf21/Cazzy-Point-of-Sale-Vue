<template>
  <b-sidebar id="sidebar-backdrop" :title="greet" backdrop-variant="dark" backdrop shadow>
    <b-img :src="url + '/' + user.user_image" class="avatar" fluid />
    <div class="user">
      <p>{{ user.user_name }}</p>
    </div>
    <hr />
    <b-navbar variant="faded" type="light">
      <router-link to="/">
        <b-navbar-brand>
          <img src="@/assets/img/waiter.png" class="mr-2 d-inline-block align-top" alt="foods" />
          Food and Drink
        </b-navbar-brand>
      </router-link>
    </b-navbar>
    <b-navbar variant="faded" type="light" v-if="user.user_role === 1" >
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
    <b-navbar variant="faded" type="light" v-if="user.user_role === 1">
      <router-link to="/setting">
        <b-navbar-brand>
          <img src="@/assets/img/settings.png" class="mr-2 d-inline-block align-top" alt="setting" />
          Setting
        </b-navbar-brand>
      </router-link>
    </b-navbar>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand @click="confirmLogout" class="logout">
        <img src="@/assets/img/logout.png" class="mr-2 d-inline-block align-top" alt="setting" />
        Logout
      </b-navbar-brand>
    </b-navbar>
  </b-sidebar>
</template>

<script>
import mixins from '../mixins/mixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  mixins: [mixins],
  data() {
    return {
      user: {
        user_image: 'blank-profile.jpg'
      },
      isLogout: false
    }
  },
  methods: {
    ...mapActions({ handleLogout: 'logout', getUserData: 'userData' }),
    ...mapGetters(['getUser']),
    confirmLogout() {
      this.$bvModal.msgBoxConfirm('Are you sure want to logout?', {
        cancelVariant: 'danger',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      }).then(value => {
        this.isLogout = value
        if (this.isLogout) {
          this.handleLogout()
        }
      })
    }
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
    })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
