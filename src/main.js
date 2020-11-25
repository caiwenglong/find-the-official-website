import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as _ from 'lodash'
import { tools } from './utils/tools/index'
import * as filters from './share/filters'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import OverlayScrollbars from 'overlayscrollbars'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
import { i18n } from './share/i18n'
Vue.use(OverlayScrollbarsPlugin)
Vue.use(OverlayScrollbars)
Vue.use(i18n)

// 调用国际化初始化函数
initLocalLang()

// 国际化初始化函数
function initLocalLang() {
  Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
  })
}

Vue.prototype._lodash = _
Vue.prototype._tools = tools

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
