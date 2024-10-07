import { Module } from '@nestjs/common';
import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';
import { K8S_API } from 'config/constant';

@Module({
  providers: [
    {
      provide: K8S_API,
      useFactory: async (): Promise<CoreV1Api> => {
        const kc = new KubeConfig() as KubeConfig;
        // 如果是在 Kubernetes 集群内部运行，可以使用 in-cluster 配置
        kc.loadFromDefault();
        // 如果是在外部通过配置文件或其他方式连接，可以加载配置文件
        // kubeConfig.loadFromFile('/path/to/kubeconfig.yaml');
        //创建客户端
        return kc.makeApiClient(CoreV1Api) as CoreV1Api;
      },
    },
  ],
  exports: [K8S_API],
})
export class KubernetesModule {}
