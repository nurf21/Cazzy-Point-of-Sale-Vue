import axios from 'axios'

export default {
  state: {
    todayIncome: null,
    prevIncome: null,
    countThisWeek: null,
    countPrevWeek: null,
    yearIncome: null,
    prevYearIncome: null,
    chartData: [],
    recentOrder: [],
    recentGroup: 'Today'
  },
  mutations: {
    setTodayIncome(state, payload) {
      state.todayIncome = payload
    },
    setPrevIncome(state, payload) {
      state.prevIncome = payload
    },
    setCountThisWeek(state, payload) {
      state.countThisWeek = payload
    },
    setCountPrevWeek(state, payload) {
      state.countPrevWeek = payload
    },
    setYearIncome(state, payload) {
      state.yearIncome = payload
    },
    setPrevYearIncome(state, payload) {
      state.prevYearIncome = payload
    },
    setChartData(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.chartData.push([payload[i].date, payload[i].sum])
      }
    },
    clearChart(state) {
      state.chartData = []
    },
    setRecent(state, payload) {
      payload.map(value => {
        const setItem = {
          INVOICES: `#${value.history_invoice}`,
          CASHIER: value.user_name,
          DATE: value.history_created_at.slice(0, 10),
          ORDERS: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          AMOUNT: `Rp. ${value.history_subtotal
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        }
        state.recentOrder = [...state.recentOrder, setItem]
      })
    },
    clearRecent(state) {
      state.recentOrder = []
    },
    setGroup(state, payload) {
      state.recentGroup = payload
    }
  },
  actions: {
    getIncome(context, payload) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/history/income?date=${payload}`)
        .then(response => {
          if (payload === new Date().toJSON().slice(0, 10)) {
            context.commit('setTodayIncome', response.data.data)
          } else if (
            payload === new Date(Date.now() - 864e5).toJSON().slice(0, 10)
          ) {
            context.commit('setPrevIncome', response.data.data)
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getCountHistoryWeek(context, payload) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/history/count?date=${payload}`)
        .then(response => {
          if (payload === new Date().toJSON().slice(0, 10)) {
            context.commit('setCountThisWeek', response.data.data)
          } else if (
            payload ===
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - 7
            )
              .toJSON()
              .slice(0, 10)
          ) {
            context.commit('setCountPrevWeek', response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getYearIncome(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/history/incomeyear?date=${payload}`
        )
        .then(response => {
          if (payload === new Date().toJSON().slice(0, 10)) {
            context.commit('setYearIncome', response.data.data)
          } else if (
            payload ===
            new Date(
              new Date().getFullYear() - 1,
              new Date().getMonth(),
              new Date().getDate()
            )
              .toJSON()
              .slice(0, 10)
          ) {
            context.commit('setPrevYearIncome', response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChartData(context, payload) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/history/chart?date=${payload}`)
        .then(response => {
          context.commit('setChartData', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRecent(context, payload) {
      context.commit('clearRecent')
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/history/${payload}`)
        .then(response => {
          context.commit('setRecent', response.data.data)
          if (payload === 'today') {
            context.commit('setGroup', 'Today')
          } else if (payload === 'week') {
            context.commit('setGroup', 'This Week')
          } else if (payload === 'month') {
            context.commit('setGroup', 'This Month')
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  getters: {
    getTodayIncome(state) {
      return state.todayIncome
    },
    getPrevIncome(state) {
      return state.prevIncome
    },
    getCountThisWeek(state) {
      return state.countThisWeek
    },
    getCountPrevWeek(state) {
      return state.countPrevWeek
    },
    getThisYearIncome(state) {
      return state.yearIncome
    },
    getPrevYearIncome(state) {
      return state.prevYearIncome
    },
    getChart(state) {
      return state.chartData
    },
    getRecentOrder(state) {
      return state.recentOrder
    },
    getRecentGroup(state) {
      return state.recentGroup
    },
    getRows(state) {
      return state.recentOrder.length
    }
  }
}
