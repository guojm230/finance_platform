import {AccountInfo, Token} from "@/global/type";


const mutations = {
  commitAccountInfo(state, accountInfo: AccountInfo) {
    state.accountInfo = accountInfo;
  },
  commitToken(state, token: Token){
    state.token = token
  }
};

export default mutations;

