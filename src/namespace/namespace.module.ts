import { Module } from '@nestjs/common';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { NamespaceService } from './namespace.service';
import { NamespaceController } from './namespace.controller';

@Module({
  imports: [KubernetesModule],
  controllers: [NamespaceController],
  providers: [NamespaceService],
})
export class NamespaceModule {}
