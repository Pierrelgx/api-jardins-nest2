import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[];

  createProduct(createProductDto: CreateProductDto): Product {
    const newProduct = { ...createProductDto };

    this.products.push(newProduct);

    return newProduct;
  }

  findAll(name?: string): Product[] {
    if (name) {
      return this.products.filter((product) => product.name === name);
    }
    return this.products;
  }

  findOne(productId: number) {
    return this.products.find((product) => product.id === productId);
  }

  update(productId: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${productId} product`;
  }

  remove(productId: number) {
    return `This action removes a #${productId} product`;
  }
}
