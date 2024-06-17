import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { createTestDatabase } from 'src/helpers/db-tests-helper';
import { Alignment } from 'src/superhero/entities/alignment.entity';
import { Colour } from 'src/superhero/entities/colour.entity';
import { Gender } from 'src/superhero/entities/gender.entity';
import { Publisher } from 'src/superhero/entities/publisher.entity';
import { Race } from 'src/superhero/entities/race.entity';
import { Superhero } from 'src/superhero/entities/superhero.entity';
import { CreateSuperpowerDto } from 'src/superpower/dto/create-hero-power.dto';
import { HeroPower } from 'src/superpower/entities/hero_power.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { SuperpowerService } from 'src/superpower/superpower.service';
import { mockLogger } from 'test/helpers/mockLogger';
import { beforeEach, describe, expect, it } from 'vitest';
import { superPowerFixture } from './superpower.fixtures';

describe('SuperPowerService', () => {
  let superPowerService: SuperpowerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(
          createTestDatabase([
            Superpower,
            HeroPower,
            Superhero,
            Gender,
            Publisher,
            Colour,
            Race,
            Alignment,
          ]),
        ),
        TypeOrmModule.forFeature([Superpower]),
      ],
      providers: [
        SuperpowerService,
        {
          provide: getLoggerToken(SuperpowerService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    superPowerService = module.get<SuperpowerService>(SuperpowerService);
  });

  describe('create superpower', () => {
    it('should create a superpower', async () => {
      const validAttrs: CreateSuperpowerDto = {
        power_name: 'Super strength',
      };

      const superPower = await superPowerService.create(validAttrs);
      expect(superPower).toBeDefined();
      expect(superPower.power_name).toStrictEqual(validAttrs.power_name);
    });
  });

  describe('find all superpowers', () => {
    it('should return all superpowers', async () => {
      await superPowerFixture(superPowerService);
      const superPowers = await superPowerService.findAll();
      expect(superPowers).toBeDefined();
      expect(superPowers).toBeInstanceOf(Array);
      expect(superPowers.length).toBeGreaterThan(0);
    });
  });

  describe('find one superpower', () => {
    it('should return a superpower', async () => {
      const superPower = await superPowerFixture(superPowerService);
      const foundSuperPower = await superPowerService.findOneOrFail({
        where: { id: superPower.id },
        select: ['power_name', 'id'],
      });
      expect(foundSuperPower).toBeDefined();
      expect(foundSuperPower).toStrictEqual(superPower);
    });

    it('should throw an error if invalid id is given', async () => {
      try {
        await superPowerService.findOneOrFail({
          where: { id: 9999 },
        });
      } catch (error) {
        expect(error.message).toBe('Superpower not found');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('update superpower', () => {
    it('should update a superpower', async () => {
      const superPower = await superPowerFixture(superPowerService);
      const updatedSuperPower = await superPowerService.update(superPower.id, {
        power_name: 'Super speed',
      });
      expect(updatedSuperPower).toBeDefined();
      expect(updatedSuperPower.power_name).toBe('Super speed');
    });

    it('should throw an error if invalid id is given', async () => {
      try {
        await superPowerService.update(9999, {
          power_name: 'Super speed',
        });
      } catch (error) {
        expect(error.message).toBe('Superpower not found');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('delete superpower', () => {
    it('should delete a superpower', async () => {
      const superPower = await superPowerFixture(superPowerService);
      await superPowerService.remove(superPower.id);
      try {
        await superPowerService.findOneOrFail({
          where: { id: superPower.id },
        });
      } catch (error) {
        expect(error.message).toBe('Superpower not found');
        expect(error.status).toBe(404);
      }
    });

    it('should throw an error if invalid id is given', async () => {
      try {
        await superPowerService.remove(9999);
      } catch (error) {
        expect(error.message).toBe('Superpower not found');
        expect(error.status).toBe(404);
      }
    });
  });
});
