import { Uuid } from '@lib/utils';

export enum UserStatusEnum {
  ACTIVE = `ACTIVE`,
  INACTIVE = `INACTIVE`,
  DEACTIVATE = `DEACTIVATE`,
}

export enum UserRoleEnum {
  ADMIN = `ADMIN`,
  PRESIDENT = `PRESIDENT`,
  COORDINATOR = `COORDINATOR`,
  MEMBER = `MEMBER`,
}

export enum SocialProviderEnum {
  GOOGLE = `google`,
  FACEBOOK = `FACEBOOK`,
}

export interface IUser {
  id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  salt?: string;
  status?: UserStatusEnum;
  role?: UserRoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserParams {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status?: UserStatusEnum;
  role?: UserRoleEnum;
  socialProvide?: SocialProviderEnum;
}
