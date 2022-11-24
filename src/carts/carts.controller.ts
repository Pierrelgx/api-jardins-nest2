import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post()
  async AddToCart(@Body() body, @Request() req): Promise<void> {
    const { productId, quantity } = body;
    return await this.cartsService.addToCart(productId, quantity, req.user.id);
  }

  @Get()
  async GetItemsInCart(@Request() req): Promise<Cart[]> {
    return await this.cartsService.getItemsInCart(req.user.id);
  }
}
