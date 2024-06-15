import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { Superhero } from './entities/superhero.entity';
import { Gender } from './entities/gender.entity';
import { Publisher } from './entities/publisher.entity';
import { Colour } from './entities/colour.entity';
import { Race } from './entities/race.entity';
import { Alignment } from './entities/alignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Superhero, Gender, Publisher, Colour, Race, Alignment])
  ],
  controllers: [SuperheroController],
  providers: [SuperheroService],
})
export class SuperheroModule {}
