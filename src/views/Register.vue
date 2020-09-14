<template>
  <b-container fluid class="auth-container">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="form-container">
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
            <p class="link text-center mt-2 mb-4">
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
      modalShow: false
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
        this.makeToast('danger')
        console.log(error)
      })
    },
    makeToast(variant) {
      this.$bvToast.toast(this.error(), {
        title: 'Error',
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
