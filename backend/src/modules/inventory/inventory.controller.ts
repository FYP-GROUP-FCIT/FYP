import { SWAGGER_API_TAG } from '@lib/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMaterialDto } from './DTO/create-Material-dto';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';

@ApiTags(SWAGGER_API_TAG.INVENTORY)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAll(): Promise<Inventory[]> {
    return this.inventoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.getById(id);
  }

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto): Promise<Inventory> {
    return this.inventoryService.create(createMaterialDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createMaterialDto: CreateMaterialDto
  ): Promise<Inventory> {
    return this.inventoryService.update(id, createMaterialDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.inventoryService.delete(id);
  }
}
