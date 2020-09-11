<template>
  <b-col cols="12" lg="8" class="container-menu">
    <b-row class="menu-row">
      <b-col cols="12" class="option">
        <b-form v-on:submit.prevent="search" inline>
          <b-input placeholder="Enter keyword" v-model="keyword"></b-input>
          <b-button variant="info" type="submit" class="ml-md-2">Search</b-button>

          <b-dropdown
            id="sort"
            :text="sortDrop"
            class="m-2 sort-btn"
            variant="info"
            v-show="!isSearch"
          >
            <b-dropdown-item-button @click="onSort('category_id'); sort='Category'" active>Category</b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-1" header="Name">
              <b-dropdown-item-button @click="onSort('product_name ASC')">A-Z</b-dropdown-item-button>
              <b-dropdown-item-button @click="onSort('product_name DESC')">Z-A</b-dropdown-item-button>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-2" header="Date">
              <b-dropdown-item-button @click="onSort('product_created_at ASC')">Oldest</b-dropdown-item-button>
              <b-dropdown-item-button @click="onSort('product_created_at DESC')">Newest</b-dropdown-item-button>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-3" header="Price">
              <b-dropdown-item-button @click="onSort('product_price ASC')">Lowest</b-dropdown-item-button>
              <b-dropdown-item-button @click="onSort('product_price DESC')">Highest</b-dropdown-item-button>
            </b-dropdown-group>
          </b-dropdown>
        </b-form>
      </b-col>

      <b-col
        cols="12"
        lg="3"
        md="4"
        v-for="(value, index) in product"
        :key="index"
        class="product-list"
      >
        <b-img :src="url + '/' + value.product_image" fluid />
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

    <div class="mt-3 pagination">
      <b-pagination
        v-model="currPage"
        :total-rows="totalRows"
        :per-page="perPage"
        @change="onPage"
        v-show="!isSearch"
      ></b-pagination>
    </div>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Inventory',
  data() {
    return {
      keyword: '',
      sortDrop: 'Sort',
      isSearch: false,
      currPage: 1,
      url: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    ...mapActions(['getProduct', 'searchProduct']),
    ...mapMutations(['addCart', 'removeCart', 'sortProduct', 'pageChange']),
    onSort(value) {
      if (value === 'category_id') {
        this.sortDrop = 'Category'
      } else if (value === 'product_name ASC') {
        this.sortDrop = 'A-Z'
      } else if (value === 'product_name DESC') {
        this.sortDrop = 'Z-A'
      } else if (value === 'product_created_at ASC') {
        this.sortDrop = 'Oldest'
      } else if (value === 'product_created_at DESC') {
        this.sortDrop = 'Newest'
      } else if (value === 'product_price ASC') {
        this.sortDrop = 'Lowest Price'
      } else if (value === 'product_price DESC') {
        this.sortDrop = 'Highest Price'
      }
      this.sortProduct(value)
      this.getProduct()
      this.$router.push(`?ob=${value}&p=${this.currPage}`)
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    search() {
      this.$router.push(`?q=${this.keyword}`)
      if (this.keyword === '') {
        this.getProduct()
        this.isSearch = false
      } else {
        this.isSearch = true
        this.sortDrop = 'Sort'
        this.searchProduct(this.keyword)
      }
    },
    onPage(value) {
      this.pageChange(value)
      this.$router.push(`?ob=${this.sort}&p=${value}`)
      this.getProduct()
    }
  },
  computed: {
    ...mapGetters({ cart: 'getCart', product: 'getProduct', totalRows: 'getTotalRows', perPage: 'getLimit', page: 'getPage', sort: 'getSort' })
  },
  created() {
    this.getProduct()
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
