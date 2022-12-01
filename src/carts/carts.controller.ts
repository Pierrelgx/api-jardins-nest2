import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@UseGuards(AuthenticatedGuard)
@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post()
  async AddToCart(@Body() body: CreateCartDto, @Request() req): Promise<Cart> {
    const { productId, quantity } = body;
    return await this.cartsService.addToCart(productId, quantity, req.user.id);
  }

  @Get()
  async GetItemsInCart(@Request() req): Promise<Cart[]> {
    return await this.cartsService.getItemsInCart(req.user.id);
  }

  @Delete(':id')
  async DeleteCart(@Param('id') id: string): Promise<Cart> {
    return await this.cartsService.remove(id);
  }
}
