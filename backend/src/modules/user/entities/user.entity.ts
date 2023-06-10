import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Uuid } from '@lib/utils';
import { IUserParams, IUser, UserStatusEnum, UserRoleEnum } from '@lib/types';
import { Hiring } from 'src/modules/hiring/entities/hiring.entity';
import { Sports } from 'src/modules/sports/entities/sports.entity';

@Entity({ name: `user` })
export class User implements IUser {
  constructor(params?: IUserParams) {
    if (params) {
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.email = params.email;
      if (params.status) this.setStatus(params.status);
    }
  }

  // PrimaryGeneratedColumn decorator create error it store in uuid but return string
  // which cause in cassandra that's why we are using transformer feature
  @PrimaryGeneratedColumn(`uuid`)
  readonly id: string;

  @Column({
    length: 30,
    nullable: false,
    unique: true,
  })
  userName: string;

  @Column({
    length: 30,
    nullable: true,
  })
  firstName: string;

  @Column({
    length: 30,
    nullable: true,
  })
  lastName: string;

  @Index()
  @Column({
    length: 100,
    nullable: false,
  })
  readonly email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: `enum`,
    enum: UserStatusEnum,
    default: UserStatusEnum.INACTIVE,
  })
  status: UserStatusEnum = UserStatusEnum.INACTIVE;

  @Column({
    type: `enum`,
    enum: UserRoleEnum,
    default: UserRoleEnum.MEMBER,
  })
  role: UserRoleEnum = UserRoleEnum.MEMBER;

  @OneToMany(() => Hiring, (hiring) => hiring.user, {
    cascade: true,
  })
  hiring: Hiring;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  // Methods
  setStatus(status: UserStatusEnum) {
    this.status = status;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }
}
