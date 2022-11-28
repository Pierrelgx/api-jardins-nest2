import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CartsService } from 'src/carts/carts.service';
import { AdminOrderConfirmService } from 'src/mailer/adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from 'src/mailer/orderconfirm/orderconfirm.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private cartsService: CartsService,
    private orderConfirm: OrderConfirmService,
    private adminOrderConfirm: AdminOrderConfirmService,
  ) {}

  async create(
    userId: string,
    code: number,
    createOrderDto: CreateOrderDto,
  ): Promise<any> {
    code = Math.floor(1000 + Math.random() * 9000);

    const cartItems = await this.cartsService.getItemsInCart(userId);

    const amount = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next, 0);

    const user = await this.usersService.findOne(userId);

    const cart = cartItems.map((item) => item.product);

    const newOrder = this.ordersRepository.create({
      user,
      code,
      amount,
      ...createOrderDto,
    });

    newOrder.products = cart;

    const confirmOrder = await this.ordersRepository.save(newOrder);

    await this.orderConfirm.sendOrderConfirm(confirmOrder, cartItems);

    await this.adminOrderConfirm.sendAdminOrderConfirm(confirmOrder, cartItems);

    cartItems.map((cart) => this.cartsService.remove(cart.id));

    return confirmOrder;
  }

  findAll() {
    return this.ordersRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findByUser(userId: string) {
    const orders = await this.ordersRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user?.id === userId);
  }

  findOne(id: string) {
    return this.ordersRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return this.ordersRepository.save({ ...order, ...updateOrderDto });
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }
}
