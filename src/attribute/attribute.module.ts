import { Module } from '@nestjs/common';
import { HeroAttributeController } from './attribute.controller';
import { HeroAttributeService } from './attribute.service';
import { HeroAttribute } from './entities/hero-attribute.entity';
import { Attribute } from './entities/attribute.entity';
import { Superhero } from '../superhero/entities/superhero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroAttribute, Attribute, Superhero])
  ],
  controllers: [HeroAttributeController],
  providers: [HeroAttributeService],
})
export class AttributeModule {}