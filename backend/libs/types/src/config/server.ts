import { User } from 'src/modules/user/entities/user.entity';

export interface IServerConfig {
  port: number;
  productName: string;
  backendUrl: string;
  frontendUrl: string;
  authLoginLink: string;
  admin: IServerConfigAdmin;
}
export interface IServerConfigAdmin {
  email: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export enum ServerConfigEnum {
  PORT = 'port',
  ADMIN = 'admin',
  PRODUCT_NAME = 'productName',
  BACKEND_URL = 'backendUrl',
  FRONTEND_URL = 'frontendUrl',
  AUTH_LOGIN_LINK = 'authLoginLink',
}
