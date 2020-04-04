import createService from '@/request/createService.js'

const service = createService(require.context('./modules', false, /\.js$/))

export default service
