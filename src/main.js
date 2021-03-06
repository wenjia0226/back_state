// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base/reset.css'
import './assets/style/base/border.css'
import './assets/style/common/global.css'
import store from './store/'
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
