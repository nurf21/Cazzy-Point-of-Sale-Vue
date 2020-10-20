export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title,
        variant: variant,
        solid: true
      })
    }
  }
}
