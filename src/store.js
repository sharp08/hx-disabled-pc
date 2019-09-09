import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: $K.getSession("userInfo"),
    dictList: $K.getSession("dictList"),
    baseInfo: {},
    documentInfo: {},
  },
  getters: {
    dictObj(state) {
      let o = {}
      if (state.dictList) {
        state.dictList.forEach(item => {
          o[item.typeCode] = item.dicInfos
        })
      }
      return o
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setDictList(state, payload) {
      state.dictList = payload
    },
    setBaseInfo(state, payload) {
      state.baseInfo = payload
    },
    setDocumentInfo(state, payload) {
      state.documentInfo = payload
    },
  },
  actions: {

  }
})
