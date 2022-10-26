import { Test, TestingModule } from '@nestjs/testing';
import { CreateTrainerDTO } from './dto/trainer.dto';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

describe('TrainerController', () => {
  let controller: TrainerController;

  const mockTrainerService = {
    createTrainer: jest.fn((dto) => {
      return { dto };
    }),
  };
  const mockCreateTrainerDTO: CreateTrainerDTO = {
    name: 'Nicolas',
    medals: 0,
    pokeballs: 10,
    pokemons: [],
    createdAt: undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerController],
      providers: [TrainerService],
    })
      .overrideProvider(TrainerService)
      .useValue(mockTrainerService)
      .compile();

    controller = module.get<TrainerController>(TrainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a trainer successfully', () => {
    //remake when have some time
    expect(
      mockTrainerService.createTrainer(mockCreateTrainerDTO),
    ).toMatchObject({ dto: mockCreateTrainerDTO });
  });
});
