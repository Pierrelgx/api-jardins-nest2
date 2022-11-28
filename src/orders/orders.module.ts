import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, Cart, User]),
    MailerModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartsService, ProductsService],
})
export class OrdersModule {}
