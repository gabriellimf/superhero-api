import { IsEmail, IsNotEmpty, IsOptional, Matches, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { regex } from '../../helpers/regex.helper';
import { messages } from '../../helpers/messages.helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
  cpf: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(regex.password, { message: messages.PASSWORD_VALID })
  password: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  profile_picture: string;
}
