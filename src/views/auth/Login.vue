<template>
  <b-container fluid>
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-template">
          <form @submit.prevent="onSubmit" @reset.prevent="onReset">
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
            <p class="sign-up text-center mt-2 mb-4">
              Not registered?
              <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form).then((result) => {
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container-fluid {
  background: #76b852 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

.vue-template,
.vertical-center {
  width: 100%;
  height: 100%;
}

.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.vertical-center .form-control:focus {
  border-color: #2554FF;
  box-shadow: none;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: bold;
}

.sign-up,
.sign-up a {
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.sign-up a {
  color: #2554FF;
}
</style>
