import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { AuthGuard } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('superhero')
@ApiTags('superhero')
export class SuperheroController {
  constructor(private readonly superheroesService: SuperheroService, private logger: PinoLogger) {
    this.logger.setContext('SuperheroController');
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({ status: 201, description: 'The superhero has been successfully created.' })
  async create(@Body() createSuperheroDto: CreateSuperheroDto) {
    this.logger.info({ msg: 'Creating new superhero', superhero_name: createSuperheroDto.superhero_name });
    return this.superheroesService.create(createSuperheroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'The superheroes have been successfully retrieved.' })
  async findAll() {
    return this.superheroesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The superhero has been successfully retrieved.' })
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return this.superheroesService.findOneOrFail({ 
      where: { id },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The superhero has been successfully updated.' })
  async update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    this.logger.info({ msg: 'Updating superhero', id });
    return this.superheroesService.update(+id, updateSuperheroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The superhero has been successfully deleted.' })
  async remove(@Param('id') id: string) {
    this.logger.info({ msg: 'Deleting superhero', id });
    return this.superheroesService.remove(+id);
  }
}
