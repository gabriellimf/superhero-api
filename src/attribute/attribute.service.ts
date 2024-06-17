import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroAttribute } from './entities/hero-attribute.entity';
import { Superhero } from '../superhero/entities/superhero.entity';
import { Attribute } from './entities/attribute.entity';
import { CreateHeroAttributeDto } from './dto/create-hero-attribute.dto';
import { UpdateHeroAttributeDto } from './dto/update-hero-attribute.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class HeroAttributeService {
  constructor(
    @InjectRepository(HeroAttribute)
    private heroAttributeRepository: Repository<HeroAttribute>,
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
    private logger: PinoLogger
  ) {
    this.logger.setContext('HeroAttributeService');
  }

  async create(createHeroAttributeDto: CreateHeroAttributeDto): Promise<HeroAttribute> {
    const hero = await this.superheroRepository.findOneBy({ id: createHeroAttributeDto.hero_id })
    this.logger.info({ msg: 'Creating new hero attribute', hero_id: createHeroAttributeDto.hero_id, attribute_id: createHeroAttributeDto.attribute_id });
    if (!hero) {
      this.logger.error({ msg: 'Hero not found', hero_id: createHeroAttributeDto.hero_id });
      throw new NotFoundException('Hero not found');
    }
    const attribute = await this.attributeRepository.findOneBy({ id: createHeroAttributeDto.attribute_id })
    if (!attribute) {
      this.logger.error({ msg: 'Attribute not found', attribute_id: createHeroAttributeDto.attribute_id });
      throw new NotFoundException('Attribute not found');
    }
    
    const heroAttribute = new HeroAttribute();
    heroAttribute.hero = hero;
    heroAttribute.attribute = attribute;
    heroAttribute.attribute_value = createHeroAttributeDto.attribute_value;

    this.logger.info({ msg: 'Saving hero attribute', hero_id: createHeroAttributeDto.hero_id, attribute_id: createHeroAttributeDto.attribute_id });
    return this.heroAttributeRepository.save(heroAttribute);
  }

  async addAttribute(createHeroAttributeDto: CreateHeroAttributeDto): Promise<HeroAttribute> {
    const heroAttribute = this.heroAttributeRepository.create(createHeroAttributeDto);
    this.logger.info({ msg: 'Adding new attribute to hero', hero_id: createHeroAttributeDto.hero_id, attribute_id: createHeroAttributeDto.attribute_id });
    return this.heroAttributeRepository.save(heroAttribute);
  }

  async findByHero(heroId: number): Promise<HeroAttribute[]> {
    return this.heroAttributeRepository.find({
      where: { hero: { id: heroId } }
    });
  }

  async findAll(): Promise<HeroAttribute[]> {
    return this.heroAttributeRepository.find();
  }

  async update(id: number, updateHeroAttributeDto: UpdateHeroAttributeDto): Promise<HeroAttribute> {
    this.logger.warn({ msg: 'You will update this hero attribute', id });
    const heroAttribute = await this.heroAttributeRepository.findOneBy({ id });
    if (!heroAttribute) {
      this.logger.error({ msg: 'Hero attribute not found', id });
      throw new NotFoundException('Hero attribute not found');
    }
    this.logger.info({ msg: 'Updating hero attribute', id });
    this.heroAttributeRepository.merge(heroAttribute, updateHeroAttributeDto);
    return this.heroAttributeRepository.save(heroAttribute);
  }

  async remove(id: number): Promise<void> {
    this.logger.warn({ msg: 'You will delete this hero attribute', id });
    const result = await this.heroAttributeRepository.delete(id);
    if (result.affected === 0) {
      this.logger.error({ msg: 'Hero attribute not found', id });
      throw new NotFoundException('Hero attribute not found');
    }
  }
}