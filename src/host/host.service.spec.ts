import { Test } from '@nestjs/testing';
import { HostService } from './host.service';
import { CustomObjectsApi } from '@kubernetes/client-node';
import { HOSTS, VERSION_1, VIRT_CUM_IO } from 'config/constant';

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
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
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
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
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
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
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
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
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
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
        mockName,
      );
    });
  });
});
