import { User } from 'src/modules/user/entities/user.entity';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigEnum, IServerConfig, ISwaggerConfig } from '@lib/types';
import { HiringService } from './modules/hiring/hiring.service';
import { UserService } from './modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api');
  const userService = app.get<UserService>(UserService);
  await userService.createAdmin();
  const configService = app.get<ConfigService>(ConfigService);
  const hiringService = app.get<HiringService>(HiringService);
  await hiringService.mockHiringTable();

  const { port: SERVER_PORT } = configService.get<IServerConfig>(
    ConfigEnum.SERVER
  );

  const swaggerConfig = configService.get<ISwaggerConfig>(ConfigEnum.SWAGGER);

  // swagger configuration
  const swaggerConfigDoc = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfigDoc);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  await app.listen(SERVER_PORT);
  logger.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();
