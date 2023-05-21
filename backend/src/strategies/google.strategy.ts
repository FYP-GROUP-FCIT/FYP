import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || `519137942612-3ij9suj32d0j90g01hfo6fb0kfmteikv.apps.googleusercontent.com`,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || `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`,
      callbackURL: 'http://localhost:3300/auth/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      userName:profile._json.name,
      accessToken,
      refreshToken,
    };
    
    // console.log({refreshToken,accessToken,profile})
    if(user.email.match('pucit.edu.pk')){
        done(null,user)
    }
    else {
        console.log('you must be a pcuit staudent')
        throw new HttpException('You Must be a PUCIT Student!', HttpStatus.NOT_ACCEPTABLE)
        done(null,null)
    }

  }
}