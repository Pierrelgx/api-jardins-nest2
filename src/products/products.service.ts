import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);

    return this.productsRepository.save(newProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productsRepository.save({ ...product, ...updateProductDto });
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return this.productsRepository.remove(product);
  }
}
