import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { CreateSuperpowerDto } from './dto/create-hero-power.dto';
import { UpdateSuperpowerDto } from './dto/update-hero-power.dto';
import { AuthGuard } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('superpower')
@ApiTags('superpower')
export class SuperpowerController {
  constructor(private superpowerService: SuperpowerService, private logger: PinoLogger) {
    this.logger.setContext('SuperpowerController');
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({ status: 201, description: 'The superpower has been successfully created.' })
  async create(@Body() createSuperpowerDto: CreateSuperpowerDto) {
    this.logger.info({ msg: 'Creating new superpower', power_name: createSuperpowerDto.power_name });
    return this.superpowerService.create(createSuperpowerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'The superpowers have been successfully retrieved.' })
  async findAll() {
    return this.superpowerService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The superpower has been successfully retrieved.' })
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return this.superpowerService.findOneOrFail({ 
      where: { id },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The superpower has been successfully updated.' })
  async update(@Param('id') id: number, @Body() updateSuperpowerDto: UpdateSuperpowerDto) {
    this.logger.info({ msg: 'Updating superpower', id });
    return this.superpowerService.update(id, updateSuperpowerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The superpower has been successfully deleted.' })
  async remove(@Param('id') id: number) {
    this.logger.info({ msg: 'Deleting superpower', id });
    return this.superpowerService.remove(id);
  }
}