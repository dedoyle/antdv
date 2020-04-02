import jsCallClient from '@/common/scripts/jsCallClient'
import appUrlsMap from '@/common/scripts/appUrlsMap.json'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('global', ['client'])
  },
  methods: {
    openApp(item) {
      // display-disable:显示但不可用,not-display:不显示,display:显示且可用
      if (this.isCustom || item.display_status !== 'display') {
        return false
      }
      const url = appUrlsMap[item.id].url
      if (/^http[s]?:\/\//.test(url)) {
        if (this.client === 'pc') {
          jsCallClient({ func: 'openUrl', params: { url: item.target } })
        } else {
          window.open(url, item.target)
        }
      } else if (url.indexOf('%appId:') > -1) {
        const res = url.match(/%appId:(\w+)%/)
        if (res) {
          jsCallClient({ func: 'pullUpApp', params: { appid: res[1] } })
        }
      } else if (url.indexOf('%routerName:') > -1) {
        const name = url.match(/%routerName:(\w+)%/)
        if (name) {
          this.$router.push({
            name: name[1],
            params: {
              appId: item.id
            }
          })
        }
      }
    },
  }
}
