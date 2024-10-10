import { KubeConfig, Watch } from '@kubernetes/client-node';
import path from 'path';
import MqttServer from './MqttServer';
import KubeClient from './KubeClient';

jest.mock('@kubernetes/client-node');
jest.mock('path');
jest.mock('./MqttServer');

describe('KubeClient', () => {
  let kubeClient;
  let mockKubeConfig;
  let mockWatch;

  beforeEach(() => {
    mockKubeConfig = {
      loadFromFile: jest.fn(),
    };
    mockWatch = {
      watch: jest.fn(),
    };
    // 模拟 @kubernetes/client-node 的导入
    (KubeConfig as jest.Mock).mockReturnValue(mockKubeConfig);
    (Watch as unknown as jest.Mock).mockReturnValue(mockWatch);
    // 模拟路径模块的导入
    (path.join as jest.Mock).mockReturnValue('mockedPath/k3s.yaml');

    kubeClient = (KubeClient as any).getInstance() as KubeConfig;
  });

  it('should create a single instance', () => {
    const anotherInstance = (KubeClient as any).getInstance() as KubeConfig;
    expect(anotherInstance).toBe(kubeClient);
  });

  it('should load k3s.yaml file', () => {
    expect(mockKubeConfig.loadFromFile).toHaveBeenCalledWith(
      'mockedPath/k3s.yaml',
    );
  });

  it('should call watch for each path', () => {
    expect(mockWatch.watch).toHaveBeenCalledTimes(5);
    kubeClient.watcherPaths.forEach((path, index) => {
      expect(mockWatch.watch).toHaveBeenNthCalledWith(
        index + 1,
        path,
        {},
        expect.any(Function),
        expect.any(Function),
      );
    });
  });

  it('should publish MQTT message on watch callback', () => {
    const mockType = 'ADDED';
    const mockItem = { kind: 'Pod', metadata: { name: 'testPod' } };
    const callback = mockWatch.watch.mock.calls[0][2];
    callback(mockType, mockItem);
    expect(MqttServer.publish).toHaveBeenCalledWith(
      '/topic/pod',
      JSON.stringify({ resourceType: mockType, resource: mockItem }),
    );
  });
});
