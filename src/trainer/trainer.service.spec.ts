import { Test, TestingModule } from '@nestjs/testing';
import { TrainerService } from './trainer.service';

describe('TrainerService', () => {
  let service: TrainerService;

  const mockUserRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerService],
    })
      .overrideProvider(TrainerService)
      .useValue(mockUserRepository)
      .compile();

    service = module.get<TrainerService>(TrainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
