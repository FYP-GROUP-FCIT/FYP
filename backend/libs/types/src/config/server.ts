export interface IServerConfig {
  port: number;
  productName: string;
  backendUrl: string;
  frontendUrl: string;
  authLoginLink: string;
}

export enum ServerConfigEnum {
  PORT = 'port',
  PRODUCT_NAME = 'productName',
  BACKEND_URL = 'backendUrl',
  FRONTEND_URL = 'frontendUrl',
  AUTH_LOGIN_LINK = 'authLoginLink',
}
