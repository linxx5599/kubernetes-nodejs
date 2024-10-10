import { Module } from '@nestjs/common';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { PodService } from './pod.service';
import { PodController } from './pod.controller';

@Module({
  imports: [KubernetesModule],
  controllers: [PodController],
  providers: [PodService],
})
export class PodModule {}
