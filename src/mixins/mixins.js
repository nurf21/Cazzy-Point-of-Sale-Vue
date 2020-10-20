export default {
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
