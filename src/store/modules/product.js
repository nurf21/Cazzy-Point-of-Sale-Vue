import axios from 'axios'

export default {
  state: {
    cart: [],
    product: [],
    page: 1,
    limit: 8,
    sort: 'product_id',
    totalRows: null,
    invoice: ''
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload.data
      state.totalRows = payload.pagination.totalData
    },
    setSearchResult(state, payload) {
      state.product = payload
    },
    addCart(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_image: payload.product_image,
        product_price: payload.product_price,
        qty: 1
      }
      state.cart = [...state.cart, setCart]
    },
    removeCart(state, payload) {
      state.cart.splice(
        state.cart.findIndex(item => item.product_id === payload.product_id),
        1
      )
    },
    sortProduct(state, payload) {
      state.sort = payload
    },
    pageChange(state, payload) {
      state.page = payload
    },
    minQty(state, payload) {
      const findCart = state.cart.find(
        value => value.product_id === payload.product_id
      )
      findCart.qty -= 1
    },
    plusQty(state, payload) {
      const findCart = state.cart.find(
        value => value.product_id === payload.product_id
      )
      findCart.qty += 1
    },
    cancelCart(state) {
      state.cart = []
    },
    setInvoice(state, payload) {
      state.invoice = payload
    }
  },
  actions: {
    getProduct(context) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    searchProduct(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product/search?keyword=${payload}`
        )
        .then(response => {
          context.commit('setSearchResult', response.data.data.searchResult)
          context.commit('sortProduct', 'product_id')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    postOrder(context, payload) {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/order`, payload)
        .then(response => {
          context.commit('setInvoice', response.data.data.invoice)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    getProduct(state) {
      return state.product
    },
    getTotalRows(state) {
      return state.totalRows
    },
    getPage(state) {
      return state.page
    },
    getLimit(state) {
      return state.limit
    },
    getSort(state) {
      return state.sort
    },
    getInvoice(state) {
      return state.invoice
    }
  }
}
