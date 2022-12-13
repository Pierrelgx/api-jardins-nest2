import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductTypes } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async findAll(name?: string, productType?: ProductTypes): Promise<Product[]> {
    if (name || productType) {
      return await this.productsRepository.find({
        where: {
          name: ILike(
            `${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%`,
          ),
        } || { productType: productType },
      });
    }
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);

    return await this.productsRepository.save(newProduct);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    return this.productsRepository.save(
      Object.assign(product, updateProductDto),
    );
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);

    return this.productsRepository.remove(product);
  }
}
