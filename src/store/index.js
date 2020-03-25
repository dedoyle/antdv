import vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getFileName } from '@/common/scripts/utils.js'

vue.use(vuex)

const importAll = r => {
  const modules = {}
  r.keys().forEach(filename => {
    const rConf = r(filename)
    modules[getFileName(filename)] = rConf.default || rConf
  })
  return modules
}

const modules = importAll(require.context('@/store/modules', false, /\.js$/))

const store = new vuex.Store({
  modules: modules,
  plugins: [
    createPersistedState({
      paths: []
    })
  ]
})

export default store
