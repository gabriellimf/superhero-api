import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { getLoggerToken } from 'nestjs-pino';
import { mockLogger } from 'test/helpers/mockLogger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTestDatabase } from 'src/helpers/db-tests-helper';
import { Alignment } from 'src/superhero/entities/alignment.entity';
import { Colour } from 'src/superhero/entities/colour.entity';
import { Gender } from 'src/superhero/entities/gender.entity';
import { Publisher } from 'src/superhero/entities/publisher.entity';
import { Race } from 'src/superhero/entities/race.entity';
import { Superhero } from 'src/superhero/entities/superhero.entity';
import { SuperheroService } from 'src/superhero/superhero.service';
import { CreateSuperheroDto } from 'src/superhero/dto/create-superhero.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateSuperheroDto } from 'src/superhero/dto/update-superhero.dto';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(
          createTestDatabase([
            Superhero,
            Gender,
            Publisher,
            Colour,
            Race,
            Alignment,
          ]),
        ),
        TypeOrmModule.forFeature([
          Superhero,
          Gender,
          Publisher,
          Colour,
          Race,
          Alignment,
        ]),
      ],
      providers: [
        SuperheroService,
        {
          provide: getLoggerToken(SuperheroService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero with valid data', async () => {
      const validAttrs: CreateSuperheroDto = {
        full_name: 'Bruce Wayne',
        superhero_name: 'Batman',
        gender_id: 1,
        race_id: 1,
        alignment_id: 1,
        eye_colour_id: 1,
        hair_colour_id: 1,
        height_cm: 180,
        weight_kg: 80,
        publisher_id: 1,
        skin_colour_id: 1,
      };

      const superhero = await service.create(validAttrs);
      expect(service.findAll()).resolves.toHaveLength(1);
      expect(superhero.full_name).toStrictEqual(validAttrs.full_name);
      expect(superhero.superhero_name).toStrictEqual(validAttrs.superhero_name);
    });

    it('should throw an error if a superhero with the same name exists', async () => {
      const validAttrs: CreateSuperheroDto = {
        full_name: 'Bruce Wayne',
        superhero_name: 'Batman',
        gender_id: 1,
        race_id: 1,
        alignment_id: 1,
        eye_colour_id: 1,
        hair_colour_id: 1,
        height_cm: 180,
        weight_kg: 80,
        publisher_id: 1,
        skin_colour_id: 1,
      };

      await service.create(validAttrs);

      try {
        await service.create(validAttrs);
      } catch (error) {
        expect(error.message).toStrictEqual(
          'Superhero already exists with this name',
        );
        expect(service.findAll()).resolves.toHaveLength(1);
        expect(mockLogger.error).toHaveBeenCalledWith({
          msg: 'Superhero already exists with this name',
          superhero_name: validAttrs.superhero_name,
        });
        expect(mockLogger.error).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('findAll', () => {
    it('should return an empty array if no superheroes exist', async () => {
      expect(service.findAll()).resolves.toHaveLength(0);
    });

    it('should return all superheroes', async () => {
      const validAttrs: CreateSuperheroDto = {
        full_name: 'Bruce Wayne',
        superhero_name: 'Batman',
        gender_id: 1,
        race_id: 1,
        alignment_id: 1,
        eye_colour_id: 1,
        hair_colour_id: 1,
        height_cm: 180,
        weight_kg: 80,
        publisher_id: 1,
        skin_colour_id: 1,
      };

      await service.create(validAttrs);

      expect(service.findAll()).resolves.toHaveLength(1);
      expect(mockLogger.info).toHaveBeenCalledWith({
        msg: 'Creating new superhero',
        superhero_name: validAttrs.superhero_name,
      });
    });
  });

  describe('findOne', () => {
    it('should return a superhero by id', async () => {
      const validAttrs: CreateSuperheroDto = {
        full_name: 'Bruce Wayne',
        superhero_name: 'Batman',
        gender_id: 1,
        race_id: 1,
        alignment_id: 1,
        eye_colour_id: 1,
        hair_colour_id: 1,
        height_cm: 180,
        weight_kg: 80,
        publisher_id: 1,
        skin_colour_id: 1,
      };

      await service.create(validAttrs);

      expect(service.findOneOrFail({ where: { id: 1 } })).resolves.toBeTruthy();
      expect(mockLogger.info).toHaveBeenCalledWith({
        msg: 'Creating new superhero',
        superhero_name: validAttrs.superhero_name,
      });
    });

    it('should throw an error if a superhero does not exist', async () => {
      try {
        await service.findOneOrFail({ where: { id: 1 } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a superhero with valid data', async () => {
      const validAttrs: CreateSuperheroDto = {
        full_name: 'Bruce Wayne',
        superhero_name: 'Batman',
        gender_id: 1,
        race_id: 1,
        alignment_id: 1,
        eye_colour_id: 1,
        hair_colour_id: 1,
        height_cm: 180,
        weight_kg: 80,
        publisher_id: 1,
        skin_colour_id: 1,
      };

      await service.create(validAttrs);

      const updatedAttrs: UpdateSuperheroDto = {
        ...validAttrs,
        full_name: 'Bruce Wayne Updated',
      };

      const superhero = await service.update(1, updatedAttrs);

      expect(superhero.full_name).toStrictEqual(updatedAttrs.full_name);
    });
  });
});
