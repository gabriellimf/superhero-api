import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { regex } from '../../helpers/regex.helper';
import { messages } from '../../helpers/messages.helper';

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
