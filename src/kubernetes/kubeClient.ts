import { KubeConfig, Watch } from '@kubernetes/client-node';
import { join } from 'path';
import MqttServer from './MqttServer';

class KubeClient {
  private static _instance: KubeClient;
  kc: KubeConfig;
  public K3S_YAML_PATH = join(__dirname, '../../../k3s.yaml');
  watcher: Watch;
  private watcherPaths = [
    '/api/v1/nodes',
    '/api/v1/namespaces',
    '/apis/virt.cum.io/v1/virtualmachines',
    '/apis/virt.cum.io/v1/hosts',
  ];
  private constructor() {
    this._init();
  }

  private async _init() {
    this.kc = new KubeConfig();
    // 如果是在 Kubernetes 集群内部运行，可以使用 in-cluster 配置
    this.kc.loadFromFile(this.K3S_YAML_PATH);
    this.watcher = new Watch(this.kc);
    for (const path of this.watcherPaths) {
      this.watchFn(path);
    }
  }

  public static getInstance(): KubeConfig {
    if (!KubeClient._instance) {
      KubeClient._instance = new KubeClient();
    }
    return KubeClient._instance.kc;
  }
  private watchFn(path) {
    this.watcher.watch(
      path,
      {},
      (type, item) => {
        console.log(`${type}: ${item.kind}: ${item.metadata.name}`);
        const msg = {
          resourceType: type,
          resource: item,
        };
        const topic = `/topic/${item.kind.toLowerCase()}`;
        MqttServer.publish(topic, JSON.stringify(msg));
      },
      (err) => {
        console.error(err);
      },
    );
  }
}

export default KubeClient.getInstance();
