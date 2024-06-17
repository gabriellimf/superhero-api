import { Test, TestingModule } from '@nestjs/testing';
import { HeroAttributeService } from './attribute.service';
import { Repository } from 'typeorm';
import { HeroAttribute } from './entities/hero-attribute.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HeroAttributeService', () => {
  let service: HeroAttributeService;
  let repo: MockType<Repository<HeroAttribute>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroAttributeService,
        {
          provide: getRepositoryToken(HeroAttribute),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<HeroAttributeService>(HeroAttributeService);
    repo = module.get(getRepositoryToken(HeroAttribute));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a hero attribute', async () => {
    const dto = { hero_id: 1, attribute_id: 1, attribute_value: 10 };
    repo.save.mockReturnValue(dto);
    expect(await service.create(dto)).toEqual(dto);
  });
});

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOneBy: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  find: jest.fn(),
  delete: jest.fn(),
  findOneOrFail: jest.fn(),
}));