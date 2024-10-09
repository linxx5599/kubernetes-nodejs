import { Test } from '@nestjs/testing';
import { HostService } from './host.service';
import { CustomObjectsApi } from '@kubernetes/client-node';

describe('HostService', () => {
  let hostService: HostService;
  let mockK8sCustomApi: CustomObjectsApi;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HostService,
        {
          provide: 'K8S_CUSTOM_API',
          useValue: mockK8sCustomApi,
        },
      ],
    }).compile();

    hostService = moduleRef.get<HostService>(HostService);
    mockK8sCustomApi = moduleRef.get<CustomObjectsApi>('K8S_CUSTOM_API');
  });

  describe('create', () => {
    it('should call k8sCustomApi.createClusterCustomObject', async () => {
      const mockBody = {} as any;
      mockK8sCustomApi.createClusterCustomObject = jest
        .fn()
        .mockResolvedValue({} as any);
      await hostService.create(mockBody);
      expect(mockK8sCustomApi.createClusterCustomObject).toHaveBeenCalledWith(
        'virt.cum.io/v1',
        'v1',
        'hosts',
        mockBody,
      );
    });
  });

  describe('findAll', () => {
    it('should call k8sCustomApi.listClusterCustomObject and return response body', async () => {
      const mockResponse = { body: {} } as any;
      mockK8sCustomApi.listClusterCustomObject = jest
        .fn()
        .mockResolvedValue(mockResponse);
      const result = await hostService.findAll();
      expect(mockK8sCustomApi.listClusterCustomObject).toHaveBeenCalledWith(
        'virt.cum.io/v1',
        'v1',
        'hosts',
      );
      expect(result).toEqual(mockResponse.body);
    });
  });

  describe('findOne', () => {
    it('should call k8sCustomApi.getClusterCustomObject', async () => {
      const mockName = 'testName';
      mockK8sCustomApi.getClusterCustomObject = jest
        .fn()
        .mockResolvedValue({} as any);
      await hostService.findOne(mockName);
      expect(mockK8sCustomApi.getClusterCustomObject).toHaveBeenCalledWith(
        'virt.cum.io/v1',
        'v1',
        'hosts',
        mockName,
      );
    });
  });

  describe('update', () => {
    it('should call k8sCustomApi.patchClusterCustomObject', async () => {
      const mockName = 'testName';
      const mockBody = {} as any;
      mockK8sCustomApi.patchClusterCustomObject = jest
        .fn()
        .mockResolvedValue({} as any);
      await hostService.update(mockName, mockBody);
      expect(mockK8sCustomApi.patchClusterCustomObject).toHaveBeenCalledWith(
        'virt.cum.io/v1',
        'v1',
        'hosts',
        mockName,
        mockBody,
      );
    });
  });

  describe('remove', () => {
    it('should call k8sCustomApi.deleteClusterCustomObject', async () => {
      const mockName = 'testName';
      mockK8sCustomApi.deleteClusterCustomObject = jest
        .fn()
        .mockResolvedValue({} as any);
      await hostService.remove(mockName);
      expect(mockK8sCustomApi.deleteClusterCustomObject).toHaveBeenCalledWith(
        'virt.cum.io/v1',
        'v1',
        'hosts',
        mockName,
      );
    });
  });
});
