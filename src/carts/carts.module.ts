import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MailerModule } from 'src/mailer/mailer.module';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';
import { CartsHelper } from './carts.helper';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, OrderProduct]),
    MailerModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [CartsService, CartsHelper],
  controllers: [CartsController],
  exports: [CartsService, CartsHelper],
})
export class CartsModule {}
