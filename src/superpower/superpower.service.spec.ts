import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerService } from './superpower.service';

describe('SuperpowerService', () => {
  let service: SuperpowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperpowerService],
    }).compile();

    service = module.get<SuperpowerService>(SuperpowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
