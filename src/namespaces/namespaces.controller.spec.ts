import { Test, TestingModule } from '@nestjs/testing';
import { NamespacesController } from './namespaces.controller';
import { NamespacesService } from './namespaces.service';

describe('NamespacesController', () => {
  let controller: NamespacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NamespacesController],
      providers: [NamespacesService],
    }).compile();

    controller = module.get<NamespacesController>(NamespacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
