import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userId: '',
    userStatus: 0,
    isChatting: false,
    toGoodsPage: {
      merId: ''
    },
    toUserPage: {
      userId: ''
    },
    toOrderPage: {
      orderDetail: {},
      from: ''
    },
    toTaskPage: {
      detail: {}
    },
    toBuyPage: {
      goodsId: ''
    },
    toSearchPage: {
      searchContent: undefined,
      labels: undefined,
      status: undefined,
      orderMethod: undefined
    }
  },
  mutations: {
    setUserName (state, name) {
      state.userName = name
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserStatus (state, status) {
      state.userStatus = status
    },
    setIsChatting (state, currentStatus) {
      state.isChatting = currentStatus
    },
    setToGoodsPage (state, goodsId) {
      state.toGoodsPage.merId = goodsId
    },
    setToUserPage (state, userId) {
      state.toUserPage.userId = userId
    },
    setToOrderPage (state, params) {
      state.toOrderPage.orderDetail = params.orderDetail
      state.toOrderPage.from = params.from
    },
    setToTaskPage (state, detail) {
      state.toTaskPage.detail = detail
    },
    setToBuyPage (state, goodsId) {
      state.toBuyPage.goodsId = goodsId
    },
    setToSearchPage (state, params) {
      state.toSearchPage = params
    }
  },
  actions: {

  },
  modules: {

  },
  plugins: [createPersistedState()]
})
