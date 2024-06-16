import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSuperpowerDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  readonly power_name: string;
}