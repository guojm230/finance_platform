import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import axios from '@/plugins/http/index'
import sec, {init as secInit} from '@/security/SecurityUtils'

import '../../assets/font/iconfont.css'
import '@/assets/css/global.css'

import '@/plugins/element.js'

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$sec = sec;

secInit({
  axios,store,router,loginPath :"/"
});

//恢复路由
(function () {
  const menusStr = sessionStorage.getItem("SYS_MENUS");
  if (menusStr != null) {
    store.commit("sys/commitAdminMenus", JSON.parse(menusStr));
  }
})();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
