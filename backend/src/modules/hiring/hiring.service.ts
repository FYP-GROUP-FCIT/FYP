import { InjectRepository } from '@nestjs/typeorm';
import {
  HiringRequestDto,
  HiringStatusChangeDto,
  ShowHiringDto,
} from '@lib/dtos';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Hiring } from './entities/hiring.entity';
import { GlobalResponseDto } from '@lib/dtos/common';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { ConfigEnum, HiringStatus, IServerConfig } from '@lib/types';
import { HiringTable } from './entities/hiringTable.entity';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Hiring)
    private readonly hiringRepository: Repository<Hiring>,
    @InjectRepository(HiringTable)
    private readonly hiringTableRepository: Repository<HiringTable>,
    @Inject(CloudinaryConfigService)
    private readonly cloudinaryConfigService: CloudinaryConfigService,
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(ConfigService)
    private readonly configService: ConfigService
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
      const existingHiring = await this.hiringRepository.findOneBy({
        email,
        position,
      });
      console.log(body);
      if (existingHiring)
        throw new HttpException(
          'User cannot apply for same position more than once!',
          HttpStatus.CONFLICT
        );
      const hire = new Hiring();
      hire.userName = userName;
      hire.phoneNumber = phoneNumber;
      hire.rollNumber = rollNumber;
      hire.position = position;
      hire.user = existingUser;
      hire.email = email;
      if (file) {
        const result: any = await this.cloudinaryConfigService.uploadImage(
          file,
          'hiring'
        );
        const url = result?.url;
        hire.photos = url;
        await this.hiringRepository.save(hire);
      }
      return new GlobalResponseDto('Hiring Request Saved!');
    } catch (error) {
      console.log(error.message, error.status);
      throw new HttpException(error?.message, error?.status);
    }
  }

  public async changeStatus({
    email,
    status,
    position,
  }: HiringStatusChangeDto): Promise<GlobalResponseDto> {
    try {
      const existingHiring = await this.hiringRepository.findOneBy({
        email,
        position,
      });
      let message = '';
      if (!existingHiring)
        throw new HttpException(
          'Existing User not found!',
          HttpStatus.NOT_FOUND
        );
      if (status === HiringStatus.APPROVED) {
        existingHiring.status = HiringStatus.APPROVED;
        message = 'Hiring Approved!';
        const { productName, frontendUrl } =
          this.configService.get<IServerConfig>(ConfigEnum.SERVER);
        this.mailService.sendVerificationMail(existingHiring.email, {
          authLoginLink: frontendUrl,
          firstName: existingHiring.userName,
          productName,
        });
      }
      if (status === HiringStatus.REJECTED) {
        existingHiring.status = HiringStatus.REJECTED;
        message = 'Hiring Rejected!';
      }
      await this.hiringRepository.save(existingHiring);
      return new GlobalResponseDto(message);
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  public async showHideHiring({
    setting,
  }: ShowHiringDto): Promise<GlobalResponseDto> {
    try {
      let message = '';

      if (setting) {
        await this.hiringTableRepository.update(
          { enable: false },
          { enable: setting }
        );
        message = 'Hiring Enabled!';
      }
      if (setting === false) {
        await this.hiringTableRepository.update(
          { enable: true },
          { enable: setting }
        );
        message = 'Hiring Disabled!';
      }
      return new GlobalResponseDto(message);
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  public async showHiring(): Promise<HiringTable[]> {
    try {
      const table = await this.hiringTableRepository.find();
      if (!table)
        throw new HttpException(
          'Hiring table could not be fetched',
          HttpStatus.BAD_REQUEST
        );
      return table;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
  async mockHiringTable() {
    const hiringTable = new HiringTable();
    hiringTable.enable = false;
    await this.hiringTableRepository.save(hiringTable);
  }

  public async getSocietyBody(): Promise<Hiring[]> {
    try {
      const res = await this.hiringRepository.findBy({
        status: HiringStatus.APPROVED,
      });
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException('could not fetch body', HttpStatus.BAD_REQUEST);
    }
  }

  public async getStatus(email: string): Promise<Hiring> {
    try {
      const res = await this.hiringRepository.findOneBy({
        email,
      });
      if (!res) {
        throw new HttpException('record not found', HttpStatus.NOT_FOUND);
      }
      return res;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
