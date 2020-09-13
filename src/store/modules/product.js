import axios from 'axios'

export default {
  state: {
    cart: [],
    product: [],
    productItem: [],
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
    setProductItem(state, payload) {
      payload.data.map(value => {
        const setProduct = {
          ID: value.product_id,
          Name: value.product_name,
          Image: value.product_image,
          Price: `Rp. ${value.product_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
          price: value.product_price,
          category_id: value.category_id,
          Category: value.category_name,
          Created: value.product_created_at.slice(0, 10),
          Updated: value.product_updated_at.slice(0, 10)
        }
        state.productItem = [...state.productItem, setProduct]
        state.totalRows = payload.pagination.totalData
      })
    },
    clearProductItem(state) {
      state.productItem = []
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
    getProductItem(context) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product?page=${context.state.page}&limit=100`
        )
        .then(response => {
          context.commit('setProductItem', response.data)
        })
        .catch(error => {
          console.log(error)
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
    addProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/product`, payload)
          .then(response => {
            context.commit('clearProductItem')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/product/${payload.id}`,
            payload.form
          )
          .then(response => {
            context.commit('clearProductItem')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_BASE_URL}/product/${payload}`)
          .then(response => {
            context.commit('clearProductItem')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
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
    getProductItem(state) {
      return state.productItem
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
