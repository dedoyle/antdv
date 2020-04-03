export default {
  namespaced: true,
  state: {
    id: '',
    url: '',
    name: '',
    params: undefined
  },
  getters: {
    id: state => state.id,
    url: state => state.url,
  },
  mutations: {
    setId(state, payload) {
      state.id = payload
    },
    setUrl(state, payload) {
      state.url = payload
    }
  }
}
