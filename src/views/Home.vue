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
                @click="addCart(index)"
                v-show="!addCartBtn[index].isAdd"
              >Add to cart</b-button>
              <b-button
                class="remove-cart"
                variant="danger"
                v-show="addCartBtn[index].isAdd"
                @click="removeCart(index)"
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
      sortText: 'Sort',
      cartCount: 0,
      totalData: 0,
      page: 1,
      limit: 6,
      keyword: '',
      sort: '',
      product: [],
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
          for (let i = 0; i < this.product.length; i++) {
            this.addCartBtn.push({ isAdd: false })
          }
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
    addCart(index) {
      this.addCartBtn[index].isAdd = true
      this.cartCount += 1
    },
    removeCart(index) {
      this.addCartBtn[index].isAdd = false
      this.cartCount -= 1
    },
    pageChange(value) {
      this.page = value
      this.getProduct()
      this.scrollToTop()
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
