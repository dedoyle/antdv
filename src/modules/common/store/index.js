import vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getFileName } from '@/common/scripts/utils.js'

vue.use(vuex)

const whiteList = ['global', 'keepAlive']

const importAll = r => {
  return r.keys().reduce((acc, filePath) => {
    const rConf = r(filePath)
    const fileName = getFileName(filePath)
    whiteList.include(fileName) && (acc[fileName] = rConf.default || rConf)
    return acc
  }, {})
}

const modules = importAll(require.context('@/store/modules', false, /\.js$/))

const store = new vuex.Store({
  modules: modules,
  plugins: [
    createPersistedState({
      paths: ['global']
    })
  ]
})

export default store
