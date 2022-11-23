import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderConfirmService } from 'src/mailer/orderconfirm/orderconfirm.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private orderConfirm: OrderConfirmService,
  ) {}

  async create(user: User, createOrderDto: CreateOrderDto, code: number) {
    code = Math.floor(1000 + Math.random() * 9000);

    const newOrder = this.ordersRepository.create({
      user,
      code,
      ...createOrderDto,
    });

    const confirmOrder = await this.ordersRepository.save(newOrder);

    await this.orderConfirm.sendOrderConfirm(code, user.email, confirmOrder);

    return confirmOrder;
  }

  findAll() {
    return this.ordersRepository.find({
      relations: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: { id: id },
      relations: {
        products: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return this.ordersRepository.save({ ...order, ...updateOrderDto });
  }

  async remove(id: number) {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }
}
