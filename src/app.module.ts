import { Module } from '@nestjs/common';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';

import { NamespacesModule } from 'src/namespaces/namespaces.module';
@Module({
  imports: [KubernetesModule, NamespacesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
