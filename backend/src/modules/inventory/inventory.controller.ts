import { SWAGGER_API_TAG } from '@lib/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateMaterialDto,
  IssueMaterialDto,
  UpdateMaterialDto,
} from './DTO/create-Material-dto';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';
import { MaterialType } from '@lib/types';
import { GlobalResponseDto } from '@lib/dtos/common';

@ApiTags(SWAGGER_API_TAG.INVENTORY)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getAll(): Promise<Inventory[]> {
    return await this.inventoryService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Inventory> {
    return await this.inventoryService.getById(id);
  }

  @Post('/category')
  async getByCategory(
    @Query('category') category: MaterialType
  ): Promise<Inventory[]> {
    return await this.inventoryService.getByCategory(category);
  }

  @Post()
  async create(
    @Body() createMaterialDto: CreateMaterialDto
  ): Promise<Inventory> {
    return await this.inventoryService.create(createMaterialDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ): Promise<Inventory> {
    return await this.inventoryService.update(id, updateMaterialDto);
  }

  @Put('/issue-item')
  async issueItem(
    @Body() issueMaterialDto: IssueMaterialDto
  ): Promise<Inventory> {
    return await this.inventoryService.issueItem(issueMaterialDto);
  }

  @Put('/return-item')
  async returnItem(
    @Body() returnItemDto: IssueMaterialDto
  ): Promise<Inventory> {
    return await this.inventoryService.returnItem(returnItemDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<GlobalResponseDto> {
    return await this.inventoryService.delete(id);
  }
}
