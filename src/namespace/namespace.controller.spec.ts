import { Test, TestingModule } from '@nestjs/testing';
import { NamespaceController } from './namespace.controller';
import { NamespaceService } from './namespace.service';

describe('NamespaceController', () => {
  let controller: NamespaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NamespaceController],
      providers: [NamespaceService],
    }).compile();

    controller = module.get<NamespaceController>(NamespaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
