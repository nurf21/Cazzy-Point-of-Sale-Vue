<template>
  <b-col cols="12" lg="4" class="cart-header">
    <h2>
      Cart
      <b-badge>{{ cart.length }}</b-badge>
    </h2>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Counter',
  computed: {
    ...mapGetters({ cart: 'getCart' })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
