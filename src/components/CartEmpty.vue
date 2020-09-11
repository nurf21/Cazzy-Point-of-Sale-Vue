<template>
  <b-col cols="12" lg="4" class="cart-list-empty" v-if="cart.length < 1">
    <img src="@/assets/img/empty-cart.png" alt />
    <p>
      Your cart is empty
      <br />
      <span>Please add some items from the menu</span>
    </p>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartEmpty',
  computed: {
    ...mapGetters({ cart: 'getCart' })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
