import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductTypes } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);

    return this.productsRepository.save(newProduct);
  }

  findAll(name?: string, productType?: ProductTypes) {
    return this.productsRepository.find({
      where: { name: Like(`${name}%`) } || { productType: productType },
    });
  }

  findOne(id: string) {
    return this.productsRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productsRepository.save(
      Object.assign(product, updateProductDto),
    );
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return this.productsRepository.remove(product);
  }
}
