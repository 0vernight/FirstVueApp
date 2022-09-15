// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import X2js from 'x2js'
import Vconsole from 'vconsole'

Vue.prototype.$axios = axios
Vue.prototype.$x2js = new X2js()

let vConsole = new Vconsole()
export default vConsole

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
