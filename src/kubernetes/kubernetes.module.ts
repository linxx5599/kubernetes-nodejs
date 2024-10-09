import { Module } from '@nestjs/common';
import {
  KubeConfig,
  CoreV1Api,
  CustomObjectsApi,
  Watch,
} from '@kubernetes/client-node';
import { K8S_API, K8S_CUSTOM_API } from 'config/constant';
import { join } from 'path';
// import WebSocket from 'ws';
//ws
// const wss = new WebSocket.Server({ port: WS_PORT });

const K3S_YAML_PATH = join(__dirname, '../../../k3s.yaml');
const kc = new KubeConfig() as KubeConfig;
// 如果是在 Kubernetes 集群内部运行，可以使用 in-cluster 配置
kc.loadFromFile(K3S_YAML_PATH);

const watcher = new Watch(kc) as Watch;

watcher.watch(
  '/api/v1/namespaces',
  {},
  (type, item) => {
    console.log(`${type}: ${item.kind}: ${item.metadata.name}`);
  },
  (err) => {
    console.error(err);
  },
);

@Module({
  providers: [
    {
      provide: K8S_API,
      useFactory: async (): Promise<CoreV1Api> => {
        return kc.makeApiClient(CoreV1Api) as CoreV1Api;
      },
    },
    {
      provide: K8S_CUSTOM_API,
      useFactory: async (): Promise<CustomObjectsApi> => {
        return kc.makeApiClient(CustomObjectsApi) as CustomObjectsApi;
      },
    },
  ],
  exports: [K8S_API, K8S_CUSTOM_API],
})
export class KubernetesModule {}
