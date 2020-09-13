<template>
  <b-container fluid class="auth-container">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="form-container">
          <form @submit.prevent="onSubmit">
            <h3>Welcome !</h3>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="form.user_email"
                placeholder="Email"
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                v-model="form.user_password"
                placeholder="Password"
                class="form-control form-control-lg"
              />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
            <p class="warning text-center mt-2 mb-4" v-show="isError">{{ error() }}</p>
            <p class="link text-center mt-2 mb-4">
              Not registered?
              <router-link to="/register">
                <span>Create an account</span>
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isError: false
    }
  },
  methods: {
    ...mapGetters({ error: 'getError' }),
    ...mapActions(['login']),
    onSubmit() {
      this.isError = false
      this.login(this.form).then((result) => {
        this.$router.push('/')
      }).catch((error) => {
        this.isError = true
        console.log(error)
      })
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
