<template>
  <b-col cols="12" lg="4" class="cart-list" v-if="cart.length > 0">
    <div class="cart-overflow">
      <b-row v-for="(value, index) in cart" :key="index" class="cart-items">
        <b-col cols="3" md="4">
          <b-img :src="url + '/' + value.product_image" fluid />
        </b-col>
        <b-col cols="5" md="5" style="padding: 0">
          <p class="name-cart">{{value.product_name}}</p>
          <b-input-group>
            <b-button class="plus-minus" variant="success" @click="onMin(value)">-</b-button>
            <input type="text" v-model="value.qty" class="qty" />
            <b-button class="plus-minus" variant="success" @click="plusQty(value)">+</b-button>
          </b-input-group>
        </b-col>
        <b-col cols="4" md="3" style="padding: 0" align-self="end">
          <p
            class="price-cart"
          >Rp. {{(value.product_price * value.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</p>
        </b-col>
      </b-row>
    </div>
    <b-row class="checkout">
      <b-col cols="6">
        <p>
          Total :
          <br />
          <span>*Tax not included</span>
        </p>
      </b-col>
      <b-col cols="6" style="text-align: end;">
        <p>Rp. {{countTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}*</p>
      </b-col>
      <b-button
        class="checkout-btn"
        variant="info"
        style="background: #57cad5;"
        @click="onCheckout(cart)"
        v-b-modal.modal-checkout
      >Checkout</b-button>
      <b-button
        class="cancel-btn"
        variant="danger"
        style="background: #F24F8A;"
        @click="cancelCart()"
      >Cancel</b-button>
    </b-row>
  </b-col>
</template>

<script>
import mixins from '../mixins/mixins'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  mixins: [mixins],
  data() {
    return {
      setOrder: []
    }
  },
  methods: {
    ...mapMutations(['removeCart', 'minQty', 'plusQty', 'cancelCart']),
    ...mapActions(['postOrder']),
    onMin(data) {
      if (data.qty === 1) {
        this.removeCart(data)
      } else {
        this.minQty(data)
      }
    },
    countTotal() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].qty
      }
      return total
    },
    onCheckout(data) {
      for (let i = 0; i < data.length; i++) {
        const dataOrder = {
          product_id: data[i].product_id,
          qty: data[i].qty
        }
        this.setOrder = [...this.setOrder, dataOrder]
      }
      const setDataOrder = {
        user_id: this.user.user_id,
        orders: this.setOrder
      }
      this.postOrder(setDataOrder)
    }
  },
  computed: {
    ...mapGetters({ cart: 'getCart', user: 'getUser' })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
