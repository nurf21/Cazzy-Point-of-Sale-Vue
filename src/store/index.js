import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/auth'
import Product from './modules/product'
import History from './modules/history'
import Category from './modules/category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    History,
    Category
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      path: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
