import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSuperpowerDto {
  @IsString()
  @IsOptional()
  @Length(2, 200)
  @ApiProperty({ example: 'Super Strength', description: 'The name of the superpower' })
  readonly power_name?: string;
}