export * from './swagger';
export * from './server';
export * from './jwt';

export enum ConfigEnum {
  TYPEORM = 'typeorm',
  SERVER = 'server',
  SWAGGER = 'swagger',
  JWT_TOKEN = 'jwtToken',
}
