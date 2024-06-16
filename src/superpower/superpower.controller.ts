import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { CreateSuperpowerDto } from './dto/create-hero-power.dto';
import { UpdateSuperpowerDto } from './dto/update-hero-power.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('superpower')
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createSuperpowerDto: CreateSuperpowerDto) {
    return this.superpowerService.create(createSuperpowerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.superpowerService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return this.superpowerService.findOneOrFail({ 
      where: { id },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSuperpowerDto: UpdateSuperpowerDto) {
    return this.superpowerService.update(id, updateSuperpowerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.superpowerService.remove(id);
  }
}