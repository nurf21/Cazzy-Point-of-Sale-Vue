<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="8" class="header">
          <Header text="Menu" />
        </b-col>

        <b-col cols="12" lg="4" class="cart-header">
          <h2>
            Cart
            <b-badge>{{ cartCount() }}</b-badge>
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="8" class="container-menu">
          <b-row class="menu-row">
            <b-col cols="12" class="option">
              <b-form v-on:submit.prevent="searchProduct" inline>
                <b-input placeholder="Enter keyword" v-model="keyword"></b-input>
                <b-button variant="info" type="submit" class="ml-md-2">Search</b-button>

                <b-dropdown id="sort" :text="sortText" class="m-2 sort-btn" variant="info">
                  <b-dropdown-item-button @click="sortCategory()" active>Category</b-dropdown-item-button>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-1" header="Name">
                    <b-dropdown-item-button @click="sortNameAsc()">A-Z</b-dropdown-item-button>
                    <b-dropdown-item-button @click="sortNameDesc()">Z-A</b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-2" header="Date">
                    <b-dropdown-item-button @click="sortDateAsc()">Oldest</b-dropdown-item-button>
                    <b-dropdown-item-button @click="sortDateDesc()">Newest</b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-3" header="Price">
                    <b-dropdown-item-button @click="sortPriceAsc()">Lowest</b-dropdown-item-button>
                    <b-dropdown-item-button @click="sortPriceDesc()">Highest</b-dropdown-item-button>
                  </b-dropdown-group>
                </b-dropdown>
              </b-form>
            </b-col>

            <b-col
              cols="12"
              lg="4"
              md="6"
              v-for="(value, index) in product"
              :key="index"
              class="product-list"
            >
              <b-img :src="img" fluid />
              <p>{{ value.product_name }}</p>
              <p>
                <strong>
                  Rp.
                  {{ value.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
                </strong>
              </p>
              <b-button
                class="add-cart"
                variant="info"
                @click="addCart(value)"
                v-if="!checkCart(value)"
              >Add to cart</b-button>
              <b-button
                class="remove-cart"
                variant="danger"
                @click="removeCart(value)"
                v-else
              >Remove from cart</b-button>
            </b-col>
          </b-row>

          <div class="mt-3">
            <b-pagination
              v-model="page"
              :total-rows="totalData"
              :per-page="limit"
              @change="pageChange"
              v-show="showPagination"
            ></b-pagination>
          </div>
        </b-col>

        <b-col cols="12" lg="4" class="cart-list-empty" v-if="cartCount() < 1">
          <img src="@/assets/img/empty-cart.png" alt />
          <p>
            Your cart is empty
            <br />
            <span>Please add some items from the menu</span>
          </p>
        </b-col>

        <b-col cols="12" lg="4" class="cart-list" v-else>
          <div class="cart-overflow">
            <b-row v-for="(value, index) in cart" :key="index" class="cart-items">
              <b-col cols="3" md="4">
                <b-img :src="img" fluid />
              </b-col>
              <b-col cols="5" md="5" style="padding: 0">
                <p class="name-cart">{{value.product_name}}</p>
                <b-input-group>
                  <b-button class="plus-minus" variant="success" @click="minus(value)">-</b-button>
                  <input type="text" v-model="value.qty" class="qty" />
                  <b-button class="plus-minus" variant="success" @click="plus(value)">+</b-button>
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
              @click="postOrder(cart)"
              v-b-modal.modal-checkout
            >Checkout</b-button>
            <b-button
              class="cancel-btn"
              variant="danger"
              style="background: #F24F8A;"
              @click="cart = []"
            >Cancel</b-button>
          </b-row>
        </b-col>
      </b-row>

      <b-sidebar id="sidebar-backdrop" :title="msg" backdrop-variant="dark" backdrop shadow>
        <Sidebar />
      </b-sidebar>

      <b-modal id="modal-checkout" title="Checkout Success!" hide-footer centered>
        <b-row>
          <b-col cols="6">
            <p>Checkout</p>
          </b-col>
          <b-col cols="6" style="text-align: end;">
            <p>Receipt no: #{{invoice}}</p>
          </b-col>
        </b-row>
        <p style="margin-bottom: 50px; font-size: 13px;">Cashier: {{user}}</p>
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
          >Print</b-button>
        </b-row>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1',
      sortText: 'Sort',
      totalData: 0,
      page: 1,
      limit: 6,
      keyword: '',
      sort: 'product_id',
      product: [],
      cart: [],
      setOrder: [],
      img: require('@/assets/img/blank-product.jpg'),
      addCartBtn: [],
      showPagination: true,
      invoice: null
    }
  },
  created() {
    this.getProduct()
  },
  updated() {
    this.page = this.$route.query.p
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    getProduct() {
      axios
        .get(`http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`)
        .then((response) => {
          this.keyword = ''
          this.product = response.data.data
          this.totalData = response.data.pagination.totalData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    searchProduct() {
      this.$router.push(`?q=${this.keyword}`)
      if (this.keyword === '') {
        this.page = 1
        this.getProduct()
        this.showPagination = true
      } else {
        axios
          .get(`http://127.0.0.1:3001/product/search?keyword=${this.keyword}`)
          .then((response) => {
            this.showPagination = false
            this.sortText = 'Sort'
            this.sort = ''
            this.product = response.data.data.searchResult
            this.totalData = response.data.data.totalData
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    sortCategory() {
      this.sortText = 'Category'
      this.sort = 'category_id'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortNameAsc() {
      this.sortText = 'Name (A-Z)'
      this.sort = 'product_name ASC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortNameDesc() {
      this.sortText = 'Name (Z-A)'
      this.sort = 'product_name DESC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortDateAsc() {
      this.sortText = 'Date (Oldest)'
      this.sort = 'product_created_at ASC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortDateDesc() {
      this.sortText = 'Date (Newest)'
      this.sort = 'product_created_at DESC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortPriceAsc() {
      this.sortText = 'Price (Lowest)'
      this.sort = 'product_price ASC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    sortPriceDesc() {
      this.sortText = 'Price (Highest)'
      this.sort = 'product_price DESC'
      this.page = 1
      this.showPagination = true
      this.$router.push(`?ob=${this.sort}&p=${this.page}`)
      this.getProduct()
    },
    addCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        qty: 1
      }
      this.cart = [...this.cart, setCart]
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    removeCart(data) {
      return this.cart.splice(this.cart.findIndex(item => item.product_id === data.product_id), 1)
    },
    minus(data) {
      if (data.qty === 1) {
        this.removeCart(data)
      } else {
        data.qty -= 1
      }
    },
    plus(data) {
      data.qty += 1
    },
    pageChange(value) {
      this.page = value
      this.getProduct()
      this.scrollToTop()
      this.$router.push(`?ob=${this.sort}&p=${value}`)
    },
    cartCount() {
      return this.cart.length
    },
    countTotal() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].qty
      }
      return total
    },
    postOrder(data) {
      for (let i = 0; i < data.length; i++) {
        const dataOrder = {
          product_id: data[i].product_id,
          qty: data[i].qty
        }
        this.setOrder = [...this.setOrder, dataOrder]
      }
      axios
        .post('http://127.0.0.1:3001/order', this.setOrder)
        .then((response) => {
          this.invoice = response.data.data.invoice
        })
        .catch((error) => {
          console.log(error)
        })
    },
    endCheck() {
      this.$bvModal.hide('modal-checkout')
      this.cart = []
      this.makeToast('success')
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Checkout Printed', {
        title: 'Success',
        variant: variant,
        solid: true
      })
    }
  },
  computed: {
    msg: {
      get() {
        return `${this.greet}, ${this.user} !`
      }
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
