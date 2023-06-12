import { ConfigEnum } from '@lib/types';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigEnum.SERVER, () => ({
  port: parseInt(process.env.BACKEND_APP_PORT) || 3300,
  productName: process.env.PRODUCT_NAME,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  authLoginLink: process.env.AUTH_LOGIN_LINK,
}));
