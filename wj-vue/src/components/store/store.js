import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userId: '',
    userStatus: 0,
    isChatting: false
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
      this.state.isChatting = currentStatus
    }
  },
  actions: {

  },
  modules: {

  },
  plugins: [createPersistedState()]
})
