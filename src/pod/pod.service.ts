import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Pod } from '@kubernetes/client-node';

const namespace = 'default';

@Injectable()
export class PodService {
  constructor(@Inject(K8S_API) private readonly k8sApi: CoreV1Api) {}
  async create(body: V1Pod) {
    try {
      return await this.k8sApi.createNamespacedPod(namespace, body);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      return this.k8sApi.listPodForAllNamespaces();
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async findOne(name: string) {
    try {
      return this.k8sApi.readNamespacedPod(name, 'kube-system');
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }
  async update(name: string, body: V1Pod) {
    try {
      return await this.k8sApi.patchNamespacedPod(name, namespace, body);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async remove(name: string) {
    try {
      return await this.k8sApi.deleteNamespacedPod(name, namespace);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }
}
