/**
 * 菜单
 */
export interface Menu {
  id: number,
  pid: number,
  name: string,
  url: string,
  componentPath: string,
  type: string,
  orderNo: number,
  subMenus: Array<Menu>
  description?: string,
  level : number,
  leaf? : boolean
}

/**
 * 登录后拉取的登录者的必要信息
 */
export interface AccountInfo {
  accountId: number, //账户Id
  id: number | string ,
  username: number | string,
  name: string,
  type: string,
  roles: Array<string>, //角色列表
  permission: Array<string> //权限列表
}

export interface Token {
  client_id: string,
  access_token: string,
  token_type: string,
  refresh_token: string,
  scope: string,
  expires_in: number,
  sign_stamp: number,
  expire_in_stamp: number
}
