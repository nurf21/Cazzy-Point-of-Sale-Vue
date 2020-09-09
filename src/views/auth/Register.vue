<template>
  <b-container fluid>
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-template">
          <form @submit.prevent="onSubmit">
            <h3>Welcome !</h3>

            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                v-model="form.user_name"
                placeholder="Name"
                class="form-control form-control-lg"
              />
            </div>

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

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
            <p class="warning text-center mt-2 mb-4" v-show="isError">{{ error() }}</p>
            <p class="sign-up text-center mt-2 mb-4">
              Already have account?
              <router-link to="/login">
                <span>Login here</span>
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
  name: 'Register',
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      },
      isError: false,
      modalShow: false,
      msg: ''
    }
  },
  methods: {
    ...mapGetters({ error: 'getError' }),
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form).then((result) => {
        this.$bvModal.msgBoxOk(result.msg, {
          title: 'Success',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(value => {
          this.$router.push('/login')
        })
      }).catch((error) => {
        this.isError = true
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

.warning {
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  color: red;
  margin: 0;
}

.sign-up,
.sign-up a {
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.sign-up span {
  color: #2554FF;
}

@media (max-width: 480px) {
  .inner-block {
    width: 100%;
  }
}
</style>
