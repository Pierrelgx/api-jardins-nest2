import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderProductsService } from './orderproducts.service';

@Controller('orderproducts')
@ApiTags('orderproducts')
export class OrderProductsController {
  constructor(private orderProductsService: OrderProductsService) {}

  @Post()
  async AddProductToOrder(@Body() body): Promise<any> {
    const { product, quantity, order } = body;
    return await this.orderProductsService.create(
      product.id,
      quantity,
      order.id,
    );
  }
}
