import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth
  },
  state: {
    name: 'Giri Said Nurfauzan'
  },
  mutations: {},
  actions: {},
  getters: {}
})
