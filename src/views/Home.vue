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
            <b-badge>{{ cartCount }}</b-badge>
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="8" class="container-menu">
          <b-row class="menu-row">
            <b-col cols="12" class="option">
              <b-form v-on:submit.prevent="searchProduct" inline>
                <b-input placeholder="Enter the keyword" v-model="keyword"></b-input>
                <b-button variant="info" type="submit" class="ml-md-2">Search</b-button>

                <b-dropdown id="sort" text="Sort" class="m-2 sort-btn" variant="info">
                  <b-dropdown-group id="dropdown-group-1" header="Name">
                    <b-dropdown-item-button>A-Z</b-dropdown-item-button>
                    <b-dropdown-item-button>Z-A</b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button>Category</b-dropdown-item-button>
                  <b-dropdown-group id="dropdown-group-2" header="Date">
                    <b-dropdown-item-button>Oldest</b-dropdown-item-button>
                    <b-dropdown-item-button>Newest</b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-group id="dropdown-group-3" header="Price">
                    <b-dropdown-item-button>Lowest</b-dropdown-item-button>
                    <b-dropdown-item-button>Highest</b-dropdown-item-button>
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
              <b-button class="add-cart">Add to cart</b-button>
            </b-col>
          </b-row>
          <div class="mt-3">
            <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
          </div>
        </b-col>

        <b-col cols="12" lg="4" class="cart-list-empty">
          <img src="@/assets/img/empty-cart.png" alt />
          <p>
            Your cart is empty
            <br />
            <span>Please add some items from the menu</span>
          </p>
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
      cartCount: 0,
      limit: 6,
      keyword: '',
      product: [],
      img: require('@/assets/img/blank-product.jpg'),
      rows: 100,
      currentPage: 1
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
        .get(`http://127.0.0.1:3001/product?limit=${this.limit}`)
        .then((response) => {
          this.product = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    searchProduct() {
      axios
        .get(`http://127.0.0.1:3001/product/search?keyword=${this.keyword}`)
        .then((response) => {
          this.product = response.data.data.searchResult
          console.log(this.product)
        })
        .catch((error) => {
          console.log(error)
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
