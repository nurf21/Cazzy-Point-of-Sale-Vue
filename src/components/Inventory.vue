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
        md="6"
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

    <!-- <div class="mt-3">
      <b-pagination
        v-model="page"
        :total-rows="totalData"
        :per-page="limit"
        @change="pageChange"
        v-show="showPagination"
      ></b-pagination>
    </div>-->
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
    ...mapMutations(['addCart', 'removeCart', 'sortProduct']),
    onSort(value) {
      this.sortDrop = value
      this.sortProduct(value)
      this.getProduct()
      this.$router.push(`?ob=${this.sortDrop}&p=${this.currPage}`)
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    search() {
      this.$router.push(`?q=${this.keyword}`)
      this.sortDrop = 'Sort'
      if (this.keyword === '') {
        this.getProduct()
        this.isSearch = false
      } else {
        this.isSearch = true
        this.searchProduct(this.keyword)
        // .then((response) => {
        //     this.showPagination = false
        //     this.sortText = 'Sort'
        //     this.sort = ''
        //     this.product = response.data.data.searchResult
        //     this.totalData = response.data.data.totalData
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
      }
    }
  },
  computed: {
    ...mapGetters({ cart: 'getCart', product: 'getProduct' })
  },
  created() {
    this.getProduct()
  }
}
</script>

<style scoped>
.container-menu {
  background: rgba(190, 195, 202, 0.3);
  min-height: 85vh;
}

.menu-row {
  margin: 20px auto;
  max-height: 500px;
  overflow: scroll;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.product-list {
  margin: 20px 0;
}

.product-list img {
  margin-bottom: 15px;
  border: 1px solid;
  width: 150px;
  height: 150px;
}

.product-list p {
  font-size: 25px;
  margin: 0;
}

.add-cart {
  border: none;
  margin-top: 10px;
}

.remove-cart {
  background: #f24f8a;
  border: none;
  margin-top: 10px;
}

.add-cart:hover,
.add-cart:focus {
  background-color: #5fe7ff;
}
</style>
