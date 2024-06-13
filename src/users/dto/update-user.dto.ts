import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { regex } from '../../helpers/regex.helper';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(regex.password, { message: 'Password too weak' })
  password: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  profile_picture: string;
}
