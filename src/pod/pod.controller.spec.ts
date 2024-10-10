import { Test, TestingModule } from '@nestjs/testing';
import { PodController } from './pod.controller';
import { PodService } from './pod.service';

describe('PodController', () => {
  let controller: PodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodController],
      providers: [PodService],
    }).compile();

    controller = module.get<PodController>(PodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
