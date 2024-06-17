import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroAttributeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'The unique identifier of the user' })
  readonly hero_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'The unique identifier of the attribute' })
  readonly attribute_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '1', description: 'The value of the attribute' })
  readonly attribute_value: number;
}