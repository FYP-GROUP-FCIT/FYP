import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialProvider } from '@lib/types';

export class SocialLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  @IsEnum(SocialProvider)
  socialProvider: SocialProvider;
}
