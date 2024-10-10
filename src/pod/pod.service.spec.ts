import { Test } from '@nestjs/testing';
import { PodService } from './pod.service';
import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Pod } from '@kubernetes/client-node';

describe('PodService', () => {
  let service: PodService;
  let mockK8sApi: Partial<CoreV1Api>;

  beforeEach(async () => {
    mockK8sApi = {
      createNamespacedPod: jest.fn(),
      listPodForAllNamespaces: jest.fn(),
      readNamespacedPod: jest.fn(),
      patchNamespacedPod: jest.fn(),
      deleteNamespacedPod: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PodService,
        {
          provide: K8S_API,
          useValue: mockK8sApi as CoreV1Api,
        },
      ],
    }).compile();

    service = moduleRef.get<PodService>(PodService);
  });

  it('should create a pod', async () => {
    const pod = {};
    const namespace = 'default';
    await service.create(pod);
    expect(mockK8sApi.createNamespacedPod).toHaveBeenCalledWith(namespace, pod);
  });

  it('should find all pod', async () => {
    await service.findAll();
    expect(mockK8sApi.listPodForAllNamespaces).toHaveBeenCalled();
  });

  it('should find one pod', async () => {
    const name = 'test';
    const namespace = 'default';
    await service.findOne(name);
    expect(mockK8sApi.readNamespacedPod).toHaveBeenCalledWith(name, namespace);
  });

  it('should update a pod', async () => {
    const name = 'test';
    const namespace = 'default';
    const body = {} as V1Pod;
    await service.update(name, body);
    expect(mockK8sApi.patchNamespacedPod).toHaveBeenCalledWith(
      name,
      namespace,
      body,
    );
  });

  it('should remove a pod', async () => {
    const name = 'test';
    const namespace = 'default';
    await service.remove(name);
    expect(mockK8sApi.deleteNamespacedPod).toHaveBeenCalledWith(
      name,
      namespace,
    );
  });
});
