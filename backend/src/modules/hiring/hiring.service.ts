import { InjectRepository } from '@nestjs/typeorm';
import { HiringRequestDto } from '@lib/dtos';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Hiring } from './entities/hiring.entity';
import { GlobalResponseDto } from '@lib/dtos/common';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { HiringPhotos } from './entities/hiringPhotos.entity';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Hiring)
    private readonly hiringRepository: Repository<Hiring>,
    @InjectRepository(HiringPhotos)
    private readonly hiringPhotoRepository: Repository<HiringPhotos>,
    @Inject(CloudinaryConfigService)
    private readonly cloudinaryConfigService: CloudinaryConfigService
  ) {}

  public async register(
    body: HiringRequestDto,
    file: Express.Multer.File
  ): Promise<GlobalResponseDto> {
    try {
      const { email, userName, phoneNumber, rollNumber, position } = body;
      const existingUser = await this.userRepository.findOneBy({ email });
      if (!existingUser)
        throw new HttpException(
          'User must be existing User',
          HttpStatus.NOT_FOUND
        );

      const hire = new Hiring();
      hire.userName = userName;
      hire.phoneNumber = phoneNumber;
      hire.rollNumber = rollNumber;
      hire.position = position;
      hire.user = existingUser;
      hire.email = email;
      await this.hiringRepository.save(hire);
      if (file) {
        const photo = new HiringPhotos();
        const result: any = await this.cloudinaryConfigService.uploadImage(
          file,
          'hiring'
        );
        const url = result?.url;
        photo.hiring = hire;
        photo.photos = url;
        await this.hiringPhotoRepository.save(photo);
      }
      return new GlobalResponseDto('Hiring Request Saved!');
    } catch (error) {
      console.log(error.message, error.status);
      throw new HttpException(error.message, error.status);
    }
  }
}
