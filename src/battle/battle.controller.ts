import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BattleService } from './battle.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('battle')
@ApiTags('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/publishers')
  @ApiResponse({ status: 200, description: 'The publishers have been successfully retrieved.' })
  async battleBetweenPublishers(
    @Query('publisher1Id') publisher1Id: number,
    @Query('publisher2Id') publisher2Id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.battleService.battleBetweenPublishers(publisher1Id, publisher2Id, { page, limit });
  }
}