import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Superhero } from '../superhero/entities/superhero.entity';
import { HeroAttribute } from '../attribute/entities/hero-attribute.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
    @InjectRepository(HeroAttribute)
    private heroAttributeRepository: Repository<HeroAttribute>
  ) {}

  async battleBetweenPublishers(publisher1Id: number, publisher2Id: number, paginationOptions: { page: number, limit: number }): Promise<any> {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;
  
    const heroesPublisher1 = await this.superheroRepository.find({
      where: { publisher: { id: publisher1Id } },
      skip,
      take: limit,
      relations: ['publisher']
    });
    const heroesPublisher2 = await this.superheroRepository.find({
      where: { publisher: { id: publisher2Id } },
      skip,
      take: limit,
      relations: ['publisher']
    });

    const battles = [];
    let publisher1Wins = 0;
    let publisher2Wins = 0;

    for (const hero1 of heroesPublisher1) {
      for (const hero2 of heroesPublisher2) {
        const battleResult = await this.battleBetweenTwoHeroes(hero1, hero2);
        battles.push({
          match: `${hero1.superhero_name} vs ${hero2.superhero_name}`,
          winner: battleResult.overallWinner,
          details: battleResult.results.map(detail => ({
            attribute: detail.attribute,
            scores: {
              [hero1.superhero_name]: detail.hero1Value,
              [hero2.superhero_name]: detail.hero2Value
            },
            winner: detail.winner
          }))
        });
        if (battleResult.overallWinner === hero1.superhero_name) {
          publisher1Wins++;
        } else {
          publisher2Wins++;
        }
      }
    }

    const overallPublisherWinner = publisher1Wins > publisher2Wins ? heroesPublisher1[0].publisher.publisher_name : heroesPublisher2[0].publisher.publisher_name;
    return {
      summary: {
        totalBattles: battles.length,
        publisher1Wins,
        publisher2Wins,
        overallWinner: overallPublisherWinner
      },
      battles
    };  
  }

  async battleBetweenTwoHeroes(hero1: Superhero, hero2: Superhero): Promise<any> {
    const hero1Attributes = await this.heroAttributeRepository.find({
      where: { hero: hero1 },
      relations: ['attribute']
    });
  
    const hero2Attributes = await this.heroAttributeRepository.find({
      where: { hero: hero2 },
      relations: ['attribute']
    });

    const results = [];
    let hero1Wins = 0;
    let hero2Wins = 0;

    for (const hero1Attribute of hero1Attributes) {
      const hero2Attribute = hero2Attributes.find(
        attribute => attribute.attribute && hero1Attribute.attribute && attribute.attribute.id === hero1Attribute.attribute.id
      );

      if (hero2Attribute && hero1Attribute) {
        const winner = hero1Attribute.attribute_value > hero2Attribute.attribute_value ? hero1.superhero_name : hero2.superhero_name;
        results.push({
          attribute: hero1Attribute.attribute.attribute_name,
          winner,
          hero1Value: hero1Attribute.attribute_value,
          hero2Value: hero2Attribute.attribute_value
        });

        if (winner === hero1.superhero_name) {
          hero1Wins++;
        } else {
          hero2Wins++;
        }
      } else {
        results.push({
          attribute: hero1Attribute.attribute ? hero1Attribute.attribute.attribute_name : "Unknown",
          winner: "No contest",
          hero1Value: hero1Attribute.attribute_value,
          hero2Value: hero2Attribute ? hero2Attribute.attribute_value : 0
        });
      }
    }

    const overallWinner = hero1Wins > hero2Wins ? hero1.superhero_name : hero2.superhero_name;
    return {
      results,
      overallWinner
    };
  }
}