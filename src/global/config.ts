

/**
 * 全局配置
 */

// const app_key = "e1d93987f8189a5e17e13b7a0be2b381";
// const map_api_version = "1.4.8";

export default {
  // SERVER_URL: "http://47.93.97.245/api/",
  SERVER_URL:"http://localhost:8089/",
  LOGIN_URL:"/login",
  ACCESS_TOKEN_PATH: "/oauth/token",
  TOKEN_PARAM: "authorization",
  DEFAULT_TOKEN_SAVE_MODE: "session",
  CLIENT_ID_ADMIN: "com.finance.admin",
  CLIENT_ID_CLIENT: "com.finance.client",
  // CLIENT_SECRET_ADMIN: "123456",
  // CLIENT_SECRET_CLIENT: "123456"
}

export const statusCode = {
  INVALID_TOKEN: 401002,
  BAD_CREDENTIALS: 401005
};



