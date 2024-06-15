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

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroesService: SuperheroService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.superheroesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return this.superheroesService.findOneOrFail({ 
      where: { id },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroesService.update(+id, updateSuperheroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.superheroesService.remove(+id);
  }
}
