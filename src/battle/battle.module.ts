import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { Superhero } from '../superhero/entities/superhero.entity';
import { HeroAttribute } from '../attribute/entities/hero-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, HeroAttribute])], // Importação dos repositórios necessários
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}