import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperheroDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  @ApiProperty({ example: 'Superman', description: 'The superhero name' })
  readonly superhero_name: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  @ApiProperty({ example: 'Clark Kent', description: 'The full name of the superhero' })
  readonly full_name: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '1', description: 'The gender of the superhero, must exist on gender talbe' })
  readonly gender_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The eye colour of the superhero, must exist on colour table' })
  readonly eye_colour_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The hair colour of the superhero, must exist on colour table' })
  readonly hair_colour_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The skin colour of the superhero, must exist on colour table' })
  readonly skin_colour_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '1', description: 'The race of the superhero, must exist on race table' })
  readonly race_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '1', description: 'The publisher of the superhero, must exist on publisher table' })
  readonly publisher_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '1', description: 'The alignment of the superhero, must exist on alignment table' })
  readonly alignment_id: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The intelligence of the superhero' })
  readonly height_cm: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1', description: 'The weight of the superhero' })
  readonly weight_kg: number;
}
