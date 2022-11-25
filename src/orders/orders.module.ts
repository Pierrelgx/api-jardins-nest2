import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { OrderConfirmService } from 'src/mailer/orderconfirm/orderconfirm.service';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { AdminOrderConfirmService } from 'src/mailer/adminorderconfirm/adminorderconfirm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Cart, User])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CartsService,
    ProductsService,
    SendgridService,
    OrderConfirmService,
    AdminOrderConfirmService,
  ],
})
export class OrdersModule {}
