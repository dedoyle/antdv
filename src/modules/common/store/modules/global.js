import service from '@/modules/common/request'

export default {
  namespaced: true,
  state: {
    user: {},
    apps: []
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload }
    },
    setApps(state, payload) {
      state.apps = payload
    },
  },
  actions: {
    getUserDetail({ commit }, options) {
      return service.userDetail(options).then(res => {
        commit('SET_USER', res.user)
        commit('SET_APPS', res.apps)
      })
    }
  }
}
