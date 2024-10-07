import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NamespacesService } from './namespaces.service';
import type { V1Namespace } from '@kubernetes/client-node';

@Controller('namespaces')
export class NamespacesController {
  constructor(private readonly namespacesService: NamespacesService) {}

  @Post()
  create(@Body() body: V1Namespace) {
    return this.namespacesService.create(body);
  }

  @Get()
  findAll() {
    return this.namespacesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.namespacesService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() body: V1Namespace) {
    return this.namespacesService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.namespacesService.remove(name);
  }
}
