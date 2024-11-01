import { Module } from '@nestjs/common';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';

import { NamespaceModule } from 'src/namespace/namespace.module';
import { PodModule } from 'src/pod/pod.module';
import { HostModule } from 'src/host/host.module';
@Module({
  imports: [KubernetesModule, PodModule, NamespaceModule, HostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
