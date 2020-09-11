import axios from 'axios'

export default {
  state: {
    cart: [],
    product: [],
    page: 1,
    limit: 8,
    sort: 'product_id'
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload.data
      // state.totalRows = payload.pagination.totalData
    },
    setSearchResult(state, payload) {
      state.product = payload
    },
    addCart(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_price: payload.product_price,
        qty: 1
      }
      state.cart = [...state.cart, setCart]
    },
    removeCart(state, payload) {
      return state.cart.splice(
        state.cart.findIndex(item => item.product_id === payload.product_id),
        1
      )
    },
    sortProduct(state, payload) {
      state.sort = payload
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
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    getProduct(state) {
      return state.product
    }
  }
  // state: {
  //   product: [],
  //   productItem: [],
  //   page: 1,
  //   totalData: null
  // },
  // mutations: {
  //   setProduct(state, payload) {
  //     state.product = payload.data
  //     state.product.map(value => {
  //       const setProduct = {
  //         ID: value.product_id,
  //         Name: value.product_name,
  //         Image: value.product_image,
  //         Price: `Rp. ${value.product_price
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
  //         price: value.product_price,
  //         category_id: value.category_id,
  //         Category: value.category_name,
  //         Created: value.product_created_at.slice(0, 10),
  //         Updated: value.product_updated_at.slice(0, 10)
  //       }
  //       state.productItem = [...state.productItem, setProduct]
  //       state.totalData = payload.pagination.totalData
  //     })
  //   },
  //   setPage(state, payload) {
  //     state.page(payload)
  //   }
  // },
  // actions: {
  //   getProduct(context, payload) {
  //     axios
  //       .get(
  //         `${process.env.VUE_APP_BASE_URL}/product?page=${context.state.page}&limit=100`
  //       )
  //       .then(response => {
  //         context.commit('setProduct', response.data)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   },
  //   addProduct(context, payload) {
  //     return new Promise((resolve, reject) => {
  //       axios
  //         .post(`${process.env.VUE_APP_BASE_URL}/product`, payload)
  //         .then(response => {
  //           console.log(response)
  //           resolve(response.data)
  //         })
  //         .catch(error => {
  //           console.log(error.response)
  //           reject(error.response)
  //         })
  //     })
  //   }
  // },
  // getters: {
  //   getLimit(state) {
  //     return state.limit
  //   },
  //   getTotalData(state) {
  //     return state.totalData
  //   },
  //   getPage(state) {
  //     return state.page
  //   },
  //   getProduct(state) {
  //     return state.productItem
  //   }
  // }
}
