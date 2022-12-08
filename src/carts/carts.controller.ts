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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@UseGuards(AuthenticatedGuard)
@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @ApiCreatedResponse({
    type: Cart,
    description: 'create cart or update cat quantity',
  })
  @ApiBadRequestResponse()
  @Post()
  async AddToCart(@Body() body: CreateCartDto, @Request() req): Promise<Cart> {
    return await this.cartsService.addToCart(body, req.user.id);
  }

  @ApiOkResponse({
    type: Cart,
    isArray: true,
    description: 'finds all carts related to logged in user',
  })
  @Get()
  async GetItemsInCart(@Request() req): Promise<Cart[]> {
    return await this.cartsService.getItemsInCart(req.user.id);
  }

  @Delete(':id')
  async DeleteCart(@Param('id') id: string): Promise<Cart> {
    return await this.cartsService.remove(id);
  }
}
