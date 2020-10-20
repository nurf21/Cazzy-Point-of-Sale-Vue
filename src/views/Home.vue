<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" lg="8" class="header">
        <Header text="Menu" />
      </b-col>
      <Counter />
    </b-row>

    <b-row>
      <Inventory />
      <CartEmpty />
      <Cart />
    </b-row>

    <Sidebar />

    <b-modal id="modal-checkout" title="Checkout Success!" hide-footer centered>
      <b-row>
        <b-col cols="6">
          <p>Checkout</p>
        </b-col>
        <b-col cols="6" style="text-align: end;">
          <p>Receipt no: #{{invoice}}</p>
        </b-col>
      </b-row>
      <p style="margin-bottom: 50px; font-size: 13px;">Cashier: {{user.user_name}}</p>
      <b-row v-for="(value, index) in cart" :key="index" class="checkout-list">
        <b-col cols="6">
          <p>{{value.product_name}} {{value.qty}}x</p>
        </b-col>
        <b-col cols="6" style="text-align: end;">
          <p>Rp. {{(value.product_price * value.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <p>Tax 10%</p>
        </b-col>
        <b-col cols="6" style="text-align: end;">
          <p>Rp. {{(countTotal() * 0.1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</p>
        </b-col>
        <b-col cols="12" style="text-align: end;">
          <p>Total: Rp. {{(countTotal() + (countTotal() * 0.1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</p>
        </b-col>
        <b-col cols="12">
          <p>Payment: Cash</p>
        </b-col>
        <b-button
          class="checkout-btn"
          variant="info"
          style="background: #57cad5;"
          @click="endCheck()"
        >Download as PDF</b-button>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Counter from '@/components/Counter'
import Inventory from '@/components/Inventory'
import CartEmpty from '@/components/CartEmpty'
import Cart from '@/components/Cart'
import mixins from '../mixins/mixins'
import Jspdf from 'jspdf'
import 'jspdf-autotable'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  mixins: [mixins],
  components: {
    Header,
    Sidebar,
    Counter,
    Inventory,
    CartEmpty,
    Cart
  },
  methods: {
    ...mapMutations(['cancelCart']),
    endCheck() {
      const conf = {
        margin: {
          top: 75
        }
      }
      const columns = ['Item', 'Amount', 'Total']
      const rows = []
      for (let i = 0; i < this.cart.length; i++) {
        rows.push([this.cart[i].product_name, this.cart[i].qty, `Rp. ${this.cart[i].qty * this.cart[i].product_price}`])
      }
      const doc = new Jspdf()
      doc.setFont('helvetica')
      doc.setFontSize(12)
      doc.text(
        `Checkout \n
        Receipt no: #${this.invoice} \n
        Cashier: ${this.user.user_name} \n
        Tax 10%: Rp. ${(this.countTotal() * 0.1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} \n
        Total: Rp. ${(this.countTotal() + (this.countTotal() * 0.1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} \n
        Payment: Cash`,
        15,
        15
      )
      doc.autoTable(columns, rows, conf)
      doc.save('checkout.pdf')
      this.$bvModal.hide('modal-checkout')
      this.cancelCart()
      this.makeToast('success', 'Success', 'Checkout Printed')
    },
    countTotal() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].qty
      }
      return total
    }
  },
  computed: {
    ...mapGetters({ invoice: 'getInvoice', user: 'getUser', cart: 'getCart' })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
