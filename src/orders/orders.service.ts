import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto, code: number) {
    code = Math.floor(1000 + Math.random() * 9000);
    const newOrder = this.ordersRepository.create({ code, ...createOrderDto });

    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: number) {
    return this.ordersRepository.findOneBy({ id });
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
