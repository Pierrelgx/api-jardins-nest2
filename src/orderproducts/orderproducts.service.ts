import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/orderproduct.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductsRepository: Repository<OrderProduct>,
    private productsService: ProductsService,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(productId: string, quantity: number, orderId: string) {
    const product = await this.productsService.findOne(productId);
    const order = await this.ordersRepository.findOneBy({ id: orderId });

    const newOrder = this.orderProductsRepository.create({
      product,
      quantity,
      order,
    });
    return await this.orderProductsRepository.save(newOrder);
  }
}
