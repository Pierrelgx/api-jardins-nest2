import { Module } from '@nestjs/common';
import { OrderProductsService } from './orderproducts.service';
import { OrderProductsController } from './orderproducts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/orderproduct.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { UsersModule } from 'src/users/users.module';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProduct, Order, Product, User, Cart]),
    MailerModule,
    UsersModule,
    CartsModule,
    ProductsModule,
  ],
  providers: [OrderProductsService],
  controllers: [OrderProductsController],
  exports: [OrderProductsService],
})
export class OrderproductsModule {}
