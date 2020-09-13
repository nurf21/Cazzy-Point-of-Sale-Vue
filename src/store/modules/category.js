import axios from 'axios'

export default {
  state: {
    category: []
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload
      state.category.map(value => {
        value.category_created_at = value.category_created_at.slice(0, 10)
        value.category_updated_at = value.category_updated_at.slice(0, 10)
      })
    },
    clearCategory(state) {
      state.category = []
    }
  },
  actions: {
    getCategory(context) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/category`)
        .then(response => {
          context.commit('setCategory', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/category`, payload)
          .then(response => {
            context.commit('clearCategory')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/category/${payload.id}`,
            payload.form
          )
          .then(response => {
            context.commit('clearCategory')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_BASE_URL}/category/${payload}`)
          .then(response => {
            context.commit('clearCategory')
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getCategory(state) {
      return state.category
    },
    getRowsCat(state) {
      return state.category.length
    }
  }
}
