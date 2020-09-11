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
  computed: {
    ...mapGetters({ cart: 'getCart' })
  }
}
</script>

<style scoped>
.cart-header {
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
}

.cart-header h2 {
  font-size: 25px;
  margin: 33px auto;
  text-align: center;
}

.badge {
  background: #57cad5;
  border-radius: 100%;
}
</style>
