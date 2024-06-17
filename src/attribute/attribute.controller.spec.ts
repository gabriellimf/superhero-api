import { Test, TestingModule } from '@nestjs/testing';
import { HeroAttributeController } from './attribute.controller';
import { HeroAttributeService } from './attribute.service';
import { HeroAttribute } from './entities/hero-attribute.entity';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('HeroAttributeController', () => {
  let app: INestApplication;
  let controller: HeroAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([HeroAttribute]),
      ],
      controllers: [HeroAttributeController],
      providers: [HeroAttributeService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = app.get<HeroAttributeController>(HeroAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and retrieve an attribute', async () => {
    const dto = { hero_id: 1, attribute_id: 1, attribute_value: 10 };
    await controller.create(dto);
    expect(await controller.findAttributesByHero(1)).toEqual([dto]);
  });

  afterEach(async () => {
    await app.close();
  });
});