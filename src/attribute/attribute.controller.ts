import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { HeroAttributeService } from './attribute.service';
import { CreateHeroAttributeDto } from './dto/create-hero-attribute.dto';
import { UpdateHeroAttributeDto } from './dto/update-hero-attribute.dto';
import { AuthGuard } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('hero-attribute')
@ApiTags('hero-attribute')
export class HeroAttributeController {
  constructor(private readonly heroAttributeService: HeroAttributeService, private logger: PinoLogger) {
    this.logger.setContext('HeroAttributeController');
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The hero attribute has been successfully created.' })
  async create(@Body() createHeroAttributeDto: CreateHeroAttributeDto) {
    this.logger.info({ msg: 'Creating new hero attribute', hero_id: createHeroAttributeDto.hero_id, attribute_id: createHeroAttributeDto.attribute_id });
    return this.heroAttributeService.create(createHeroAttributeDto);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The hero attribute has been successfully added.' })
  async addAttribute(@Body() createHeroAttributeDto: CreateHeroAttributeDto) {
    return this.heroAttributeService.addAttribute(createHeroAttributeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The hero attributes have been successfully retrieved.' })
  async findAll() {
    return this.heroAttributeService.findAll();
  }
  
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The hero attribute has been successfully retrieved.' })
  async findAttributesByHero(@Param('id') heroId: number) {
    return this.heroAttributeService.findByHero(heroId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The hero attribute has been successfully updated.' })
  async update(@Param('id') id: number, @Body() updateHeroAttributeDto: UpdateHeroAttributeDto) {
    this.logger.info({ msg: 'Updating hero attribute', id });
    return this.heroAttributeService.update(id, updateHeroAttributeDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The hero attribute has been successfully deleted.' })
  async remove(@Param('id') id: number) {
    this.logger.info({ msg: 'Deleting hero attribute', id });
    return this.heroAttributeService.remove(id);
  }
}
