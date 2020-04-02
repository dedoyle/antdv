import vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getFileName } from '@/common/scripts/utils.js'

vue.use(vuex)

const importAll = r => {
  return r.keys().reduce((acc, filePath) => {
    const rConf = r(filePath)
    const fileName = getFileName(filePath)
    acc[fileName] = rConf.default || rConf
    return acc
  }, {})
}

const modules = importAll(require.context('./modules', false, /\.js$/))

const store = new vuex.Store({
  key: 'common',
  modules: modules,
  plugins: [
    createPersistedState({
      paths: ['global', 'currentApp', 'init']
    })
  ]
})

export default store
