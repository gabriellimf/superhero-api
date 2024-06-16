import { Module } from '@nestjs/common';
import { SuperpowerController } from './superpower.controller';
import { SuperpowerService } from './superpower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from './entities/superpower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Superpower]),
  ],
  controllers: [SuperpowerController],
  providers: [SuperpowerService]
})
export class SuperpowerModule {}
