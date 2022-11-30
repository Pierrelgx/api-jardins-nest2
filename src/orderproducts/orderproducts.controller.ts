import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderProduct } from './entities/orderproduct.entity';
import { OrderProductsService } from './orderproducts.service';

@Controller('orderproducts')
@ApiTags('orderproducts')
export class OrderProductsController {
  constructor(private orderProductsService: OrderProductsService) {}

  @Post()
  async AddProductToOrder(@Body() body): Promise<OrderProduct> {
    const { product, quantity, subTotal, order } = body;
    return await this.orderProductsService.create(
      product.id,
      quantity,
      subTotal,
      order.id,
    );
  }
}
