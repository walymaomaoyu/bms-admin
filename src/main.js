// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import md5 from 'js-md5';
import 'iview/dist/styles/iview.css'
import '@/style/base.css'
Vue.use(iView);
Vue.prototype.md5 = md5;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
