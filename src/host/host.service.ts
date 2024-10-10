import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { HOSTS, K8S_CUSTOM_API, VERSION_1, VIRT_CUM_IO } from 'config/constant';
import { CustomObjectsApi, type V1Namespace } from '@kubernetes/client-node';

@Injectable()
export class HostService {
  constructor(
    @Inject(K8S_CUSTOM_API) private readonly k8sCustomApi: CustomObjectsApi,
  ) {}
  async create(body: V1Namespace) {
    try {
      const res = await this.k8sCustomApi.createClusterCustomObject(
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
        body,
      );
      return res;
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return this.k8sCustomApi.listClusterCustomObject(
      VIRT_CUM_IO,
      VERSION_1,
      HOSTS,
    );
  }

  findOne(name: string) {
    return this.k8sCustomApi.getClusterCustomObject(
      VIRT_CUM_IO,
      VERSION_1,
      HOSTS,
      name,
    );
  }

  async update(name: string, body: V1Namespace) {
    try {
      const res = await this.k8sCustomApi.patchClusterCustomObject(
        VIRT_CUM_IO,
        VERSION_1,
        HOSTS,
        name,
        body,
      );
      return res;
    } catch (error) {
      throw new HttpException(error.body, HttpStatus.CONFLICT);
    }
  }

  remove(name: string) {
    return this.k8sCustomApi.deleteClusterCustomObject(
      VIRT_CUM_IO,
      VERSION_1,
      HOSTS,
      name,
    );
  }
}
