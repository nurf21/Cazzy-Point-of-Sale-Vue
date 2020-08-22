<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="8" class="home-header">
          <b-row>
            <b-col cols="2" class="header-icon">
              <img src="@/assets/img/menu.png" alt="toggle-menu" v-b-toggle.sidebar-backdrop />
            </b-col>
            <b-col cols="8" class="header-text">
              <h1>Menu</h1>
            </b-col>
            <b-col cols="2" class="header-icon"></b-col>
          </b-row>
        </b-col>

        <b-col cols="12" lg="4" class="cart-header">
          <h2>
            Cart
            <b-badge>{{ cart }}</b-badge>
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="8" class="container-menu">
          <b-navbar>
            <b-nav-form>
              <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button variant="info" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-dropdown id="sort" text="Sort" class="m-2" variant="info">
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
          </b-navbar>

          <b-row class="menu-row">
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
              <b-button>Add to cart</b-button>
            </b-col>

            <div class="mt-3">
              <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
            </div>
          </b-row>
        </b-col>

        <b-col cols="12" lg="4" class="cart-list-empty">
          <img src="@/assets/img/empty-cart.png" alt />
          <p>
            Your cart is empty
            <br />
            <span class="text-muted">Please add some items from the menu</span>
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
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1',
      isSearch: false,
      cart: 0,
      limit: 6,
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
