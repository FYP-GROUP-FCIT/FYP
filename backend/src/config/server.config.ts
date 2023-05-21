import { ConfigEnum } from '@lib/types';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigEnum.SERVER, () => ({
  port: parseInt(process.env.BACKEND_APP_PORT) || 3300,
}));
