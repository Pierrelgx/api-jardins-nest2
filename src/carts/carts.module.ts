import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Order, Product]),
    MailerModule,
  ],
  providers: [CartsService, OrdersService, ProductsService, UsersService],
  controllers: [CartsController],
})
export class CartsModule {}
