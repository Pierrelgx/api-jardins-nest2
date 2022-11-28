import { Module } from '@nestjs/common';
import { OrderProductsService } from './orderproducts.service';
import { OrderProductsController } from './orderproducts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/orderproduct.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CartsService } from 'src/carts/carts.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProduct, Product, Order, User, Cart]),
    MailerModule,
  ],
  providers: [
    OrderProductsService,
    ProductsService,
    OrdersService,
    UsersService,
    CartsService,
  ],
  controllers: [OrderProductsController],
  exports: [OrderProductsService],
})
export class OrderproductsModule {}
