
import mutations from './mutation'
import actions from './action'

const state = {
  token: {},
  //system
  accountInfo: {},
  asideMenus: [],
  originalMenus: []
};

const sys = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default sys;
