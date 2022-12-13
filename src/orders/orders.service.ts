import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CartsService } from 'src/carts/carts.service';
import { AdminOrderConfirmService } from 'src/mailer/ordermailer/adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from 'src/mailer/ordermailer/orderconfirm/orderconfirm.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderProductsService } from 'src/orderproducts/orderproducts.service';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private cartsService: CartsService,
    private orderProductsService: OrderProductsService,
    private orderConfirm: OrderConfirmService,
    private adminOrderConfirm: AdminOrderConfirmService,
  ) {}

  async findAll(withdrawDate?: string): Promise<Order[]> {
    if (withdrawDate) {
      return await this.ordersRepository.find({
        where: { withdrawDate: withdrawDate },
        relations: {
          user: true,
        },
      });
    }
    return await this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return await this.ordersRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        orderProducts: {
          product: true,
        },
      },
    });
  }

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const code = Math.floor(1000 + Math.random() * 9000);

    const cartItems = await this.cartsService.getItemsInCart(userId);

    const user = await this.usersService.findOne(userId);

    const amount = cartItems
      .map((item) => item.subTotal)
      .reduce((acc, next) => acc + next, 0);

    const newOrder = this.ordersRepository.create({
      user,
      code,
      amount,
      ...createOrderDto,
    });

    const confirmOrder = await this.ordersRepository.save(newOrder);

    await this.createOrderItems(confirmOrder, cartItems);

    await this.sendConfirmEmails(confirmOrder, cartItems);

    cartItems.map(async (cart) => await this.cartsService.remove(cart.id));

    return confirmOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    return await this.ordersRepository.save({ ...order, ...updateOrderDto });
  }

  async remove(id: string): Promise<Order> {
    const order = await this.findOne(id);

    return await this.ordersRepository.remove(order);
  }

  async sendConfirmEmails(confirmOrder: Order, cartItems: Cart[]) {
    await this.orderConfirm.sendOrderConfirm(confirmOrder, cartItems);
    await this.adminOrderConfirm.sendAdminOrderConfirm(confirmOrder, cartItems);
  }

  async createOrderItems(confirmOrder: Order, cartItems: Cart[]) {
    cartItems.map(
      async (cart) =>
        await this.orderProductsService.create(
          cart.product.id,
          cart.quantity,
          cart.subTotal,
          confirmOrder.id,
        ),
    );
  }
}
