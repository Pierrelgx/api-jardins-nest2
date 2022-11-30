import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MailerModule } from 'src/mailer/mailer.module';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Product, OrderProduct]),
    MailerModule,
  ],
  providers: [CartsService, UsersService, ProductsService],
  controllers: [CartsController],
  exports: [CartsService],
})
export class CartsModule {}
