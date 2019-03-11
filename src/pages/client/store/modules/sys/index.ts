
import mutations from './mutation'
import actions from './action'

const state = {
  //system
  token: {},
  accountInfo: {}
};

const sys = {
    namespaced: true,
    state,
    mutations,
    actions
};

export default sys;
