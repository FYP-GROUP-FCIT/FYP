import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from './user';

export const USER_ROLE_KEY = 'roles';
export const UserRole = (...roles: UserRoleEnum[]) =>
  SetMetadata(USER_ROLE_KEY, roles);
