import { Module } from '@nestjs/common';
import {
  KubeConfig,
  CoreV1Api,
  CustomObjectsApi,
} from '@kubernetes/client-node';
import { K8S_API, K8S_CUSTOM_API } from 'config/constant';
import { join } from 'path';
const K3S_YAML_PATH = join(__dirname, '../../../k3s.yaml');
const kc = new KubeConfig() as KubeConfig;
// 如果是在 Kubernetes 集群内部运行，可以使用 in-cluster 配置
kc.loadFromFile(K3S_YAML_PATH);
// 如果是在外部通过配置文件或其他方式连接，可以加载配置文件
//创建客户端
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
