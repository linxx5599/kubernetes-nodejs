import { Test } from '@nestjs/testing';
import { NamespaceService } from './namespace.service';
import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Namespace } from '@kubernetes/client-node';

describe('NamespaceService', () => {
  let service: NamespaceService;
  let mockK8sApi: Partial<CoreV1Api>;

  beforeEach(async () => {
    mockK8sApi = {
      createNamespace: jest.fn(),
      listNamespace: jest.fn(),
      readNamespace: jest.fn(),
      patchNamespace: jest.fn(),
      deleteNamespace: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        NamespaceService,
        {
          provide: K8S_API,
          useValue: mockK8sApi as CoreV1Api,
        },
      ],
    }).compile();

    service = moduleRef.get<NamespaceService>(NamespaceService);
  });

  it('should create a namespace', async () => {
    const namespace = {};
    await service.create(namespace);
    expect(mockK8sApi.createNamespace).toHaveBeenCalledWith(namespace);
  });

  it('should find all namespace', async () => {
    await service.findAll();
    expect(mockK8sApi.listNamespace).toHaveBeenCalled();
  });

  it('should find one namespace', async () => {
    const name = 'test';
    await service.findOne(name);
    expect(mockK8sApi.readNamespace).toHaveBeenCalledWith(name);
  });

  it('should update a namespace', async () => {
    const name = 'test';
    const body = {} as V1Namespace;
    await service.update(name, body);
    expect(mockK8sApi.patchNamespace).toHaveBeenCalledWith(name, body);
  });

  it('should remove a namespace', async () => {
    const name = 'test';
    await service.remove(name);
    expect(mockK8sApi.deleteNamespace).toHaveBeenCalledWith(name);
  });
});
