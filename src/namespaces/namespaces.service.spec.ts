import { Test } from '@nestjs/testing';
import { NamespacesService } from './namespaces.service';
import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Namespace } from '@kubernetes/client-node';

describe('NamespacesService', () => {
  let service: NamespacesService;
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
        NamespacesService,
        {
          provide: K8S_API,
          useValue: mockK8sApi as CoreV1Api,
        },
      ],
    }).compile();

    service = moduleRef.get<NamespacesService>(NamespacesService);
  });

  it('should create a namespace', async () => {
    const namespace = {};
    await service.create(namespace);
    expect(mockK8sApi.createNamespace).toHaveBeenCalledWith(namespace);
  });

  it('should find all namespaces', async () => {
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
