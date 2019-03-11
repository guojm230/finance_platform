import Vue from 'vue'
import VueX from 'vuex'
//持久化插件
import createPersistedState from 'vuex-persistedstate'

import sys from './modules/sys'

Vue.use(VueX);

const store = new VueX.Store({
    plugins:[createPersistedState({storage:window.sessionStorage})],
    modules:{
        sys,
    }
});
export default store;
