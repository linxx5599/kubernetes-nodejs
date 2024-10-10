import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { K8S_API } from 'config/constant';
import { CoreV1Api, type V1Namespace } from '@kubernetes/client-node';

@Injectable()
export class NamespaceService {
  constructor(@Inject(K8S_API) private readonly k8sApi: CoreV1Api) {}
  async create(body: V1Namespace) {
    try {
      return await this.k8sApi.createNamespace(body);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      return this.k8sApi.listNamespace();
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async findOne(name: string) {
    try {
      return this.k8sApi.readNamespace(name);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }
  async update(name: string, body: V1Namespace) {
    try {
      return await this.k8sApi.patchNamespace(name, body);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  async remove(name: string) {
    try {
      return await this.k8sApi.deleteNamespace(name);
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }
}
