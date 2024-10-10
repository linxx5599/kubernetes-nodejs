import { Module } from '@nestjs/common';
import { CoreV1Api, CustomObjectsApi } from '@kubernetes/client-node';
import { K8S_API, K8S_CUSTOM_API } from 'config/constant';
import kc from './kubeClient';

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
