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
          <b-row v-for="(value, index) in cart" :key="index" class="cart-items">
            <b-col cols="4">
              <b-img :src="img" fluid />
            </b-col>
            <b-col cols="5" style="padding: 0">
              <p class="name-cart">{{value.product_name}}</p>
              <b-button class="plus-minus" variant="success">-</b-button>
              <input type="text" v-model="value.qty" class="qty" />
              <b-button class="plus-minus" variant="success">+</b-button>
            </b-col>
            <b-col cols="3" style="padding: 0" align-self="end">
              <p
                class="price-cart"
              >Rp. {{(value.product_price * value.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}</p>
            </b-col>
          </b-row>
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
          </b-row>
        </b-col>
      </b-row>

      <b-sidebar id="sidebar-backdrop" :title="msg" backdrop-variant="dark" backdrop shadow>
        <Sidebar />
      </b-sidebar>
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
      sort: '',
      product: [],
      cart: [],
      img: require('@/assets/img/blank-product.jpg'),
      addCartBtn: [],
      showPagination: true
    }
  },
  created() {
    this.getProduct()
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
      if (this.keyword === '') {
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
      this.getProduct()
    },
    sortNameAsc() {
      this.sortText = 'Name (A-Z)'
      this.sort = 'product_name ASC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
    },
    sortNameDesc() {
      this.sortText = 'Name (Z-A)'
      this.sort = 'product_name DESC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
    },
    sortDateAsc() {
      this.sortText = 'Date (Oldest)'
      this.sort = 'product_created_at ASC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
    },
    sortDateDesc() {
      this.sortText = 'Date (Newest)'
      this.sort = 'product_created_at DESC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
    },
    sortPriceAsc() {
      this.sortText = 'Price (Lowest)'
      this.sort = 'product_price ASC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
    },
    sortPriceDesc() {
      this.sortText = 'Price (Highest)'
      this.sort = 'product_price DESC'
      this.page = 1
      this.showPagination = true
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
    pageChange(value) {
      this.page = value
      this.getProduct()
      this.scrollToTop()
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
