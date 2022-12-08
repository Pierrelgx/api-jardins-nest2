import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';
import { Admin } from 'src/authorization/admin.decorator';

@UseGuards(AuthenticatedGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOkResponse({
    type: Order,
    isArray: true,
    description: 'finds all orders',
  })
  @ApiQuery({ name: 'withdrawDate', required: false })
  @Get()
  findAll(@Query('withdrawDate') withdrawDate?: string): Promise<Order[]> {
    return this.ordersService.findAll(withdrawDate);
  }

  @ApiOkResponse({ type: Order, description: 'find a specific order' })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @ApiCreatedResponse({ type: Order, description: 'create new order' })
  @ApiBadRequestResponse()
  @Post()
  create(
    @Request() req,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @Admin(true)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove(id);
  }
}
