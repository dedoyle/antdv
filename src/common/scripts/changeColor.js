import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate.js'

const getAntdCssUrl = () => {
  var res = [].slice.call(document.styleSheets).find(item => {
    return item.href && item.href.indexOf('ant-design-vue')
  })
  return res && res.href
}
export default {
  primaryColor: '#1890ff',
  changeColor(newColor) {
    var lastColor = this.lastColor || this.primaryColor
    var options = {
      appendToEl: 'head',
      cssUrl: getAntdCssUrl(),
      oldColors: generate(lastColor), // current colors array. The same as `matchColors`
      newColors: generate(newColor) // new colors array, one-to-one corresponde with `oldColors`
    }
    var promise = client.changer.changeColor(options)
    this.lastColor = lastColor
    return promise
  }
}
