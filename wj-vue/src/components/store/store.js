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
      mer_id: ''
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
      state.toGoodsPage.mer_id = goodsId
    }
  },
  actions: {

  },
  modules: {

  },
  plugins: [createPersistedState()]
})
