
import mutations from './mutation'
import actions from './action'

const state = {
  home:{}
};

const config = {
    namespaced: true,
    state,
    mutations,
    actions
};

export default config;
