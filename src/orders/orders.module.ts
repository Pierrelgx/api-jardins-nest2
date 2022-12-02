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
import { OrderProductsService } from 'src/orderproducts/orderproducts.service';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';
import { CartsHelper } from 'src/carts/carts.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, Cart, User, OrderProduct]),
    MailerModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UsersService,
    CartsService,
    CartsHelper,
    ProductsService,
    OrderProductsService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
