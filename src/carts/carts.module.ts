import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CartsController } from './carts.controller';
import { UsersService } from 'src/users/users.service';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Order, Product, User]),
    MailerModule,
  ],
  providers: [CartsService, OrdersService, ProductsService, UsersService],
  controllers: [CartsController],
})
export class CartsModule {}
