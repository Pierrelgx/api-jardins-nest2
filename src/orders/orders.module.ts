import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { OrderConfirmService } from 'src/mailer/orderconfirm/orderconfirm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, SendgridService, OrderConfirmService],
})
export class OrdersModule {}
