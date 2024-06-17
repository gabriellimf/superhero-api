import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSuperheroDto {
  @IsString()
  @Length(2, 200)
  @IsOptional()
  @ApiProperty({ example: 'Superman', description: 'The superhero name' })
  readonly superhero_name?: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  @ApiProperty({ example: 'Clark Kent', description: 'The full name of the superhero' })
  readonly full_name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The gender of superhero. Must exist on gender table' })
  readonly gender_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The eye colour of superhero. Must exist on colour table' })
  readonly eye_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The hair colour of superhero. Must exist on colour table' })
  readonly hair_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The skin colour of superhero. Must exist on colour table' })
  readonly skin_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The race of superhero. Must exist on race table' })
  readonly race_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The publisher of superhero. Must exist on publisher table' })
  readonly publisher_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The alignment of superhero. Must exist on alignment table' })
  readonly alignment_id?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The height of superhero in cm' })
  readonly height_cm: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The weight of superhero in kg' })
  readonly weight_kg: number;
}
