import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HostService } from './host.service';
import type { V1Namespace } from '@kubernetes/client-node';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  create(@Body() body: V1Namespace) {
    return this.hostService.create(body);
  }

  @Get()
  findAll() {
    return this.hostService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.hostService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() body: V1Namespace) {
    return this.hostService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.hostService.remove(name);
  }
}
