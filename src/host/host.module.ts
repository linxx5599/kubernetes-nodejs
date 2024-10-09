import { Module } from '@nestjs/common';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { HostService } from './host.service';
import { HostController } from './host.controller';

@Module({
  imports: [KubernetesModule],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
