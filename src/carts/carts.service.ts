import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async addToCart(
    productId: string,
    quantity: number,
    userId: string,
  ): Promise<any> {
    const cartItems = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });
    const product = await this.productsService.findOne(productId);
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (product) {
      const cart = cartItems.filter(
        (item) => item.product.id === productId && item.user.id === userId,
      );

      if (cart.length < 1) {
        const newItem = this.cartsRepository.create({
          total: product.price * quantity,
          quantity,
          user,
          product,
        });

        return await this.cartsRepository.save(newItem);
      } else {
        return await this.cartsRepository.update(cart[0].id, {
          quantity,
          total: product.price * quantity,
        });
      }
    }
    return null;
  }

  async getItemsInCart(userId: string): Promise<Cart[]> {
    const userCart = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });
    return userCart.filter((item) => item.user.id === userId);
  }

  async remove(id: string) {
    const cart = await this.cartsRepository.findOneBy({ id });

    return this.cartsRepository.remove(cart);
  }
}
