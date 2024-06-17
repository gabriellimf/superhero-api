import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeroAttributeDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The unique identifier of the user' })
  readonly attribute_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The value of the attribute' })
  readonly attribute_value?: number;
}