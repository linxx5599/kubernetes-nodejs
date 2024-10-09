import { Inject, Injectable } from '@nestjs/common';

import { K8S_API, K8S_CUSTOM_API } from 'config/constant';
import {
  CoreV1Api,
  CustomObjectsApi,
  type V1Namespace,
} from '@kubernetes/client-node';

@Injectable()
export class NamespaceService {
  constructor(
    @Inject(K8S_API) private readonly k8sApi: CoreV1Api,
    @Inject(K8S_CUSTOM_API) private readonly k8sCustomApi: CustomObjectsApi,
  ) {}
  create(body: V1Namespace) {
    return this.k8sApi.createNamespace(body);
  }

  async findAll() {
    // const response = await this.k8sCustomApi.listClusterCustomObject(
    //   'virt.cum.io',
    //   'v1',
    //   'hosts',
    // );
    // return response.body;
    return this.k8sApi.listNamespace();
  }

  findOne(name: string) {
    return this.k8sApi.readNamespace(name);
  }

  update(name: string, body: V1Namespace) {
    return this.k8sApi.patchNamespace(name, body);
  }

  remove(name: string) {
    return this.k8sApi.deleteNamespace(name);
  }
}
