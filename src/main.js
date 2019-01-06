// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
// 引入element-ui框架
import ElementUI from 'element-ui'
import Http from './plugins/http'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'
import moment from 'moment'
// 全局使用
Vue.use(ElementUI)
Vue.use(Http)
Vue.config.productionTip = false
Vue.filter('fmtDate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
