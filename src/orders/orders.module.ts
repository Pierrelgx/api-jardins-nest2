import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, Cart, User]),
    MailerModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartsService, UsersService, ProductsService],
})
export class OrdersModule {}
