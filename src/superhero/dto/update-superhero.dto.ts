import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateSuperheroDto {
  @IsString()
  @Length(2, 200)
  @IsOptional()
  readonly superhero_name?: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  readonly full_name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly gender_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly eye_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly hair_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly skin_colour_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly race_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly publisher_id?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly alignment_id?: number;

  @IsInt()
  @IsOptional()
  readonly height_cm: number;

  @IsInt()
  @IsOptional()
  readonly weight_kg: number;
}
