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
import type { V1Namespace } from '@kubernetes/client-node';

@Controller('namespace')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Post()
  create(@Body() body: V1Namespace) {
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
  update(@Param('name') name: string, @Body() body: V1Namespace) {
    return this.namespaceService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.namespaceService.remove(name);
  }
}
