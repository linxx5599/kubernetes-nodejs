import { Module } from '@nestjs/common';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { NamespacesService } from './namespaces.service';
import { NamespacesController } from './namespaces.controller';

@Module({
  imports: [KubernetesModule],
  controllers: [NamespacesController],
  providers: [NamespacesService],
})
export class NamespacesModule {}
