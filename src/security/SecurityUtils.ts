import cof from '@/global/config'
import {AccountInfo, Token} from "@/global/type";
import {Message as message} from "element-ui";
import {Store} from "vuex";
import {VueRouter} from "vue-router/types/router";
import {Axios} from "@/plugins/http/type";

class StorageSecurityUtils {
  public http: Axios;
  public store: Store<any>;
  public router: VueRouter;
  public loginPath: string;

  private token: Token;

  hasToken(): boolean {
    let access_token = this.getToken().access_token;
    return access_token !== undefined && access_token !== null;
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  setToken(token: Token) {
    this.store.commit("sys/commitToken", token);
  }

  getToken(): Token {
    return this.store.state.sys.token;
  }

  getAccessToken(): string {
    return this.getToken().access_token;
  }

  /**
   * 提前五分钟失效
   */
  isAccessTokenExpired(): boolean{
    let token = this.getToken();
    return token.expire_in_stamp - new Date().getTime() < 1000 * 60 * 30;
  }

  getAccountInfo(): AccountInfo {
    return this.store.state.sys.accountInfo;
  }

  setAccountInfo(info: AccountInfo): void {
    this.store.commit("sys/commitAccountInfo", info)
  }

  private clearToken(): void {
    this.store.commit("sys/commitToken",{});
  }

  logout(): void {
    this.clearToken();
  }

  toLogin(from?: string){
    this.router.push({
      path: this.loginPath,
      query:{
        from: from? from : "/"
      }
    });
  }

  login(username: string, password: string, type: string): Promise<any> {
    const param = {
      client_id: '',
      scope: "all",
      grant_type: "password",
      username,
      password
    };

    if (type == 'user') {
      param.client_id = cof.CLIENT_ID_CLIENT;
    } else {
      param.client_id = cof.CLIENT_ID_ADMIN;
    }
    return new Promise((resolve, reject) => {
      this.http.post(cof.ACCESS_TOKEN_PATH, param).then(res => {
        res.data.client_id = param.client_id;
        this.setToken(res.data);
        this.http.get("/accounts/self/account-info").then(res => {
          let accountInfo = res.data;
          this.setAccountInfo(accountInfo);
          resolve(res);
        });
      }).catch(rej => {
        message.error("账号或密码错误");
        reject(rej);
      })
    })
  }

  refreshToken(): Promise<any> {
    if (!this.hasToken()){
      return Promise.reject();
    }
    return new Promise<any>((resolve,reject)=>{
      const param = {
        client_id: this.getToken().client_id,
        scope: "all",
        grant_type: "refresh_token",
        refresh_token: this.getToken().refresh_token
      };
      this.http.post(cof.ACCESS_TOKEN_PATH,param).then(res=>{
        res.data.client_id = param.client_id;
        this.setToken(res.data);
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

}

const instance = new StorageSecurityUtils();

export default instance;

export function init(options: {
  axios: Axios,
  store: Store<any>,
  router: VueRouter,
  loginPath: string
}) {
  instance.http = options.axios;
  instance.router = options.router;
  instance.store = options.store;
  instance.loginPath = options.loginPath;
}
