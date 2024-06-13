import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroesService: SuperheroService) {}

  @UseGuards()
  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  @UseGuards()
  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }

  @UseGuards()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superheroesService.findOne(+id);
  }

  @UseGuards()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroesService.update(+id, updateSuperheroDto);
  }

  @UseGuards()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superheroesService.remove(+id);
  }
}
