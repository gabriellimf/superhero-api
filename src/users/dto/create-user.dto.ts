import { IsEmail, IsNotEmpty, IsOptional, Matches, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { regex } from '../../helpers/regex.helper';
import { messages } from '../../helpers/messages.helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCpfUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async validate(cpf: any, args: ValidationArguments) {
    const user = await this.userRepository.findOne({ where: { cpf } });
    return !user;
  }
}

export function IsCpfUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfUniqueConstraint,
    });
  };
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: '12345678901', description: 'The unique identifier of the user' })
  cpf: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @Matches(regex.password, { message: messages.PASSWORD_VALID })
  @ApiProperty({ example: 'John@Doe123', description: 'The password of the user, must be a strong password' })
  password: string;

  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'The bio of the user' })
  bio: string;

  @IsOptional()
  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'The profile picture of the user' })
  profile_picture: string;
}
