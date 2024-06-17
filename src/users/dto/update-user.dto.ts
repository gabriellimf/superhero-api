import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { regex } from '../../helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'The email of the user' })
  email: string;

  @IsOptional()
  @Matches(regex.password, { message: 'Password too weak' })
  @ApiProperty({ example: 'John@Doe123', description: 'The password of the user, must be a strong password' })
  password: string;

  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: 'The bio of the user' })
  bio: string;

  @IsOptional()
  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'The profile picture of the user' })
  profile_picture: string;
}
