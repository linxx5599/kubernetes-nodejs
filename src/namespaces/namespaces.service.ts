import { Inject, Injectable } from '@nestjs/common';

import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Namespace } from '@kubernetes/client-node';

@Injectable()
export class NamespacesService {
  constructor(@Inject(K8S_API) private readonly k8sApi: CoreV1Api) {}
  create(body: V1Namespace) {
    return this.k8sApi.createNamespace(body);
  }

  findAll() {
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
