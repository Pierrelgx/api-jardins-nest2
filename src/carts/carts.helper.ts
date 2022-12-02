import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsHelper {
  constructor(private productsService: ProductsService) {}
  checkQuantity(createCartDto: CreateCartDto) {
    if (createCartDto.quantity <= 0) {
      throw new BadRequestException({
        msg: 'quantity must e a positive number.',
      });
    }
  }

  async findProduct(productId: string): Promise<Product> {
    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async findCartItem(
    cartItems: Cart[],
    productId: string,
    userId: string,
  ): Promise<Cart[]> {
    return cartItems.filter(
      (item) => item.product.id === productId && item.user.id === userId,
    );
  }
}
