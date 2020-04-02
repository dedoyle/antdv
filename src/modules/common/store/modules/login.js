import service from '@/modules/common/request'

export default {
  namespaced: true,
  state: {
    token: '',
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
      return service.login(options).then(res => {
        commit('SET_TOKEN', res.token)
      })
    },
    logout({ commit }, options) {
      return service.logout(options).then(() => {
        commit('SET_TOKEN', '')
      })
    }
  }
}
