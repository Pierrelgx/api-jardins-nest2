import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CartsController } from './carts.controller';
import { UsersService } from 'src/users/users.service';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrderConfirmService } from 'src/mailer/orderconfirm/orderconfirm.service';
import { WelcomeService } from 'src/mailer/welcome/welcome.service';
import { AdminOrderConfirmService } from 'src/mailer/adminorderconfirm/adminorderconfirm.service';
import { OrderMailerService } from 'src/mailer/ordermailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Order, Product, User])],
  providers: [
    CartsService,
    OrdersService,
    ProductsService,
    UsersService,
    OrderConfirmService,
    WelcomeService,
    SendgridService,
    AdminOrderConfirmService,
    OrderMailerService,
  ],
  controllers: [CartsController],
})
export class CartsModule {}
