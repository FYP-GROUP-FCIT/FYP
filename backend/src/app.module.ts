import { Module } from '@nestjs/common';

// config imports
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigEnum } from '@lib/types';
import * as ORMConfig from './config/orm.config';
import { MulterModule } from '@nestjs/platform-express';

// config imports files
import serverConfig from './config/server.config';
import swaggerConfig from './config/swagger.config';

// Module imports
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HiringModule } from './modules/hiring/hiring.module';
import { CloudinaryConfigService } from '@config/cloudinary.config';
export const typeOrmConfig: TypeOrmModuleOptions = ORMConfig;
export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return ORMConfig;
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, swaggerConfig],
    }),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    AuthModule,
    UserModule,
    HiringModule,
  ],
  controllers: [],
  providers: [CloudinaryConfigService],
  exports: [CloudinaryConfigService],
})
export class AppModule {}
