import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodService } from './pod.service';
import type { V1Pod } from '@kubernetes/client-node';

@Controller('pod')
export class PodController {
  constructor(private readonly podService: PodService) {}

  @Post()
  create(@Body() body: V1Pod) {
    return this.podService.create(body);
  }

  @Get()
  findAll() {
    return this.podService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.podService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() body: V1Pod) {
    return this.podService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.podService.remove(name);
  }
}
