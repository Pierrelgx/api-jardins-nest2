import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCartDto } from 'src/carts/dto/create-cart.dto';
import { CartsHelper } from './carts.helper';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    private usersService: UsersService,
    private cartsHelper: CartsHelper,
  ) {}

  async addToCart(createCartDto: CreateCartDto, userId: string): Promise<Cart> {
    const cartItems = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });

    const product = await this.cartsHelper.findProduct(createCartDto.productId);

    const cart = await this.cartsHelper.findCartItem(
      cartItems,
      product.id,
      userId,
    );

    if (cart.length < 1) {
      this.cartsHelper.checkQuantity(createCartDto);
      return await this.create(product, createCartDto, userId);
    }

    return await this.update(cart[0].id, createCartDto, product);
  }

  async getItemsInCart(userId: string): Promise<Cart[]> {
    const userCart = await this.cartsRepository.find({
      relations: ['product', 'user'],
    });
    return userCart.filter((item) => item.user.id === userId);
  }

  async create(product: Product, createCartDto: CreateCartDto, userId: string) {
    const user = await this.usersService.findOne(userId);

    const newItem = this.cartsRepository.create({
      subTotal: product.price * createCartDto.quantity,
      user,
      product,
      ...createCartDto,
    });

    return await this.cartsRepository.save(newItem);
  }

  async update(cartId: string, createCartDto: CreateCartDto, product: Product) {
    const updatedCart = await this.cartsRepository.findOneBy({
      id: cartId,
    });

    if (createCartDto.quantity <= 0) {
      return await this.remove(updatedCart.id);
    }

    return await this.cartsRepository.save({
      ...updatedCart,
      subTotal: product.price * createCartDto.quantity,
      ...createCartDto,
    });
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOneBy({ id });

    return this.cartsRepository.remove(cart);
  }
}
