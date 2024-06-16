import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateSuperpowerDto {
  @IsString()
  @IsOptional()
  @Length(2, 200)
  readonly power_name?: string;
}