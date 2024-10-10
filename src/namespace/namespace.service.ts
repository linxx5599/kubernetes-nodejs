import { Inject, Injectable } from '@nestjs/common';

import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Namespace } from '@kubernetes/client-node';
import { handleError } from 'config/share';

@Injectable()
export class NamespaceService {
  constructor(@Inject(K8S_API) private readonly k8sApi: CoreV1Api) {}
  async create(body: V1Namespace) {
    try {
      return await this.k8sApi.createNamespace(body);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      return this.k8sApi.listNamespace();
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(name: string) {
    try {
      return this.k8sApi.readNamespace(name);
    } catch (error) {
      handleError(error);
    }
  }
  async update(name: string, body: V1Namespace) {
    try {
      return await this.k8sApi.patchNamespace(name, body);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(name: string) {
    try {
      return await this.k8sApi.deleteNamespace(name);
    } catch (error) {
      handleError(error);
    }
  }
}
