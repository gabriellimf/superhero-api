import { Module } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { Superhero } from './entities/superhero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero])],
  controllers: [SuperheroController],
  providers: [SuperheroService],
})
export class SuperheroModule {}
