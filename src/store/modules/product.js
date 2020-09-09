import axios from 'axios'

export default {
  state: {
    product: [],
    productItem: [],
    page: 1,
    limit: 6,
    totalData: null
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload.data
      state.product.map(value => {
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
        state.totalData = payload.pagination.totalData
      })
    },
    setPage(state, payload) {
      state.page(payload)
    }
  },
  actions: {
    getProduct(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_IP}/product?page=${context.state.page}&limit=100`
        )
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_IP}/product`, payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getTotalData(state) {
      return state.totalData
    },
    getPage(state) {
      return state.page
    },
    getProduct(state) {
      return state.productItem
    }
  }
}
