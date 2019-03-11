import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import axios from '@/plugins/http/index'
import sec,{init as secInit} from '@/security/SecurityUtils'

import '@/assets/font/iconfont.css'
import '@/assets/css/global.css'
import 'nprogress/nprogress.css'

import '@/plugins/element.js'

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$sec = sec;
//设置securityUtils的属性
secInit({
  axios,store,router,loginPath :"/"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
