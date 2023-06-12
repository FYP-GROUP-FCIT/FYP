import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMaterialDto,
  IssueMaterialDto,
  UpdateMaterialDto,
} from './DTO/create-Material-dto';
import { Inventory } from './entities/inventory.entity';
import { MaterialStatus, MaterialType } from '@lib/types';
import { GlobalResponseDto } from '@lib/dtos/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async getAll(): Promise<Inventory[]> {
    try {
      const res = await this.inventoryRepository.find({
        relations: ['issueTo', 'issueBy'],
      });
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException('Could not get items', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(id: string): Promise<Inventory> {
    try {
      const res = await this.inventoryRepository.findOne({
        where: { id },
        relations: ['issueTo', 'issueBy'],
      });
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException('Could not get item', HttpStatus.NOT_FOUND);
    }
  }

  async getByCategory(category: MaterialType): Promise<Inventory[]> {
    try {
      const res = await this.inventoryRepository.find({
        where: { category },
        relations: ['issueTo', 'issueBy'],
      });
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException('Could not get items', HttpStatus.NOT_FOUND);
    }
  }

  async create(inventory: CreateMaterialDto): Promise<Inventory> {
    try {
      const material = new Inventory();
      material.category = inventory.category;
      material.name = inventory.name;
      material.quantity = inventory.quantity;
      material.status = inventory.status;
      const res = this.inventoryRepository.save(material);
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, material: UpdateMaterialDto): Promise<Inventory> {
    try {
      const existingMaterial = await this.inventoryRepository.findOneBy({
        id,
      });
      if (!existingMaterial)
        throw new HttpException(
          'material/item not found',
          HttpStatus.NOT_FOUND
        );

      const updatedInventory = { ...existingMaterial, ...material };
      const res = await this.inventoryRepository.save(updatedInventory);
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: string): Promise<GlobalResponseDto> {
    try {
      const existingMaterial = await this.inventoryRepository.findOneBy({ id });
      if (!existingMaterial)
        throw new HttpException(
          'material/item not found',
          HttpStatus.NOT_FOUND
        );

      const res = await this.inventoryRepository.delete(id);
      if (res) {
        return new GlobalResponseDto('item deleted successfully!');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async issueItem(issueDto: IssueMaterialDto): Promise<Inventory> {
    try {
      const issuer = await this.userRepo.findOneBy({ id: issueDto.issueBy });
      const issued = await this.userRepo.findOneBy({ id: issueDto.issueTo });
      if (!issuer || !issued)
        throw new HttpException(
          'Issuer/issued to user not found!',
          HttpStatus.NOT_FOUND
        );
      const existingMaterial = await this.inventoryRepository.findOne({
        where: { id: issueDto.id },
        relations: ['issueTo', 'issueBy'],
      });
      if (!existingMaterial)
        throw new HttpException('material not found!', HttpStatus.NOT_FOUND);
      if (existingMaterial.quantity === 0) {
        existingMaterial.status = MaterialStatus.NOT_AVAILABLE;
        await this.inventoryRepository.save(existingMaterial);
        throw new HttpException(
          'material not available!',
          HttpStatus.NOT_FOUND
        );
      }
      if (issueDto.quantity <= existingMaterial.quantity) {
        existingMaterial.issueBy = issuer;
        existingMaterial.issueTo = issued;
        existingMaterial.quantity -= issueDto.quantity;
        existingMaterial.status = MaterialStatus.ISSUED;
        return await this.inventoryRepository.save(existingMaterial);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async returnItem(returnItem: IssueMaterialDto): Promise<Inventory> {
    try {
      const issuer = await this.userRepo.findOneBy({ id: returnItem.issueBy });
      const issued = await this.userRepo.findOneBy({ id: returnItem.issueTo });
      if (!issuer || !issued)
        throw new HttpException(
          'Issuer/issued to user not found!',
          HttpStatus.NOT_FOUND
        );
      const existingMaterial = await this.inventoryRepository.findOne({
        where: { id: returnItem.id },
        relations: ['issueTo', 'issueBy'],
      });
      if (!existingMaterial)
        throw new HttpException('material not found!', HttpStatus.NOT_FOUND);
      existingMaterial.issueBy = issuer;
      existingMaterial.issueTo = issued;
      existingMaterial.quantity += returnItem.quantity;
      existingMaterial.status = MaterialStatus.AVAILABLE;
      return await this.inventoryRepository.save(existingMaterial);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
