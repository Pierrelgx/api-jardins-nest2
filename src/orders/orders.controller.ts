import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({ type: Order, description: 'create new order' })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, code: number) {
    return this.ordersService.create(createOrderDto, code);
  }

  @ApiOkResponse({
    type: Order,
    isArray: true,
    description: 'finds all orders',
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOkResponse({ type: Order, description: 'find a specific order' })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
