import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CreateCartDto } from 'src/carts/dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addToCart(createCartDto: CreateCartDto, userId: string): Promise<Cart> {
    const cartItems = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });

    const product = await this.productsService.findOne(createCartDto.productId);

    if (!product) {
      return null;
    }

    const user = await this.usersService.findOne(userId);

    const cart = cartItems.filter(
      (item) => item.product.id === product.id && item.user.id === userId,
    );

    if (cart.length < 1) {
      const newItem = this.cartsRepository.create({
        subTotal: product.price * createCartDto.quantity,
        user,
        product,
        ...createCartDto,
      });

      return await this.cartsRepository.save(newItem);
    } else {
      const updatedCart = await this.cartsRepository.findOneBy({
        id: cart[0].id,
      });

      return await this.cartsRepository.save({
        ...updatedCart,
        subTotal: product.price * createCartDto.quantity,
        ...createCartDto,
      });
    }
  }

  async getItemsInCart(userId: string): Promise<Cart[]> {
    const userCart = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });
    return userCart.filter((item) => item.user.id === userId);
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOneBy({ id });

    return this.cartsRepository.remove(cart);
  }
}
