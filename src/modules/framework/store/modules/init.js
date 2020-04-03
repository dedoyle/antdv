const init = {
  namespaced: true,
  state: {
    initData: null
  },
  getters: {
    initData: state => state.initData
  },
  mutations: {
    SET_INIT_DATA(state, payload) {
      state.initData = payload
    }
  },
  actions: {
    getInitData({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('SET_INIT_DATA', 1)
          resolve(1)
        }, 50)
      })
    }
  }
}

export default init
