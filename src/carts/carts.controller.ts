import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';

@UseGuards(AuthenticatedGuard)
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
