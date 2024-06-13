import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateSuperheroDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  readonly superhero_name: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  readonly full_name: string;

  @IsInt()
  @Min(1)
  readonly gender_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly eye_colour_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly hair_colour_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly skin_colour_id: number;

  @IsInt()
  @Min(1)
  readonly race_id: number;

  @IsInt()
  @Min(1)
  readonly publisher_id: number;

  @IsInt()
  @Min(1)
  readonly alignment_id: number;

  @IsInt()
  @IsOptional()
  readonly height_cm: number;

  @IsInt()
  @IsOptional()
  readonly weight_kg: number;
}
