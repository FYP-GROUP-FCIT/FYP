import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './DTO/create-Material-dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {

    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) { }

    getAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    getById(id: string): Promise<Inventory> {
        return this.inventoryRepository.findOneBy({ id: id });
    }

    create(inventory: CreateMaterialDto): Promise<Inventory> {
        return this.inventoryRepository.save(inventory);
    }

    async update(id: string, inventory: CreateMaterialDto): Promise<Inventory> {
        const existingInventory = await this.inventoryRepository.findOneBy({ id: id });
        if (!existingInventory) {
            throw new Error('Inventory not found');
        }

        const updatedInventory = { ...existingInventory, ...inventory };
        return this.inventoryRepository.save(updatedInventory);
    }

    async delete(id: string): Promise<void> {
        await this.inventoryRepository.delete(id);
    }

}
