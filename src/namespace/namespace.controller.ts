import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import type { CoreV1Event } from '@kubernetes/client-node';

@Controller('namespace')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Post()
  create(@Body() body: CoreV1Event) {
    return this.namespaceService.create(body);
  }

  @Get()
  findAll() {
    return this.namespaceService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.namespaceService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() body: CoreV1Event) {
    return this.namespaceService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.namespaceService.remove(name);
  }
}
