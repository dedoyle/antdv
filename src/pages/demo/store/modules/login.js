import service from '@index/request'

export default {
  namespaced: true,
  state: {
    token: sessionStorage.getItem('token'),
  },
  getters: {
    token: state => state.token,
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
      sessionStorage.setItem('token', payload)
    },
  },
  actions: {
    login({ commit }, options) {
      return service.commonLogin(options).then(res => {
        commit('SET_TOKEN', res.token)
      })
    },
    logout({ commit }, options) {
      return service.commonLogout(options).then(() => {
        commit('SET_TOKEN', '')
      })
    }
  }
}
