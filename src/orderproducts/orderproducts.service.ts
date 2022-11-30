import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/orderproduct.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductsRepository: Repository<OrderProduct>,
    private productsService: ProductsService,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(
    productId: string,
    quantity: number,
    subTotal: number,
    orderId: string,
  ): Promise<OrderProduct> {
    const product = await this.productsService.findOne(productId);
    const order = await this.ordersRepository.findOneBy({ id: orderId });

    const newOrder = this.orderProductsRepository.create({
      product,
      quantity,
      subTotal,
      order,
    });
    return await this.orderProductsRepository.save(newOrder);
  }
}
