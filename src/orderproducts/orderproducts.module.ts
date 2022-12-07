import { Module } from '@nestjs/common';
import { OrderProductsService } from './orderproducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/orderproduct.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProduct, Order, Product, Cart]),
    MailerModule,
    CartsModule,
    ProductsModule,
  ],
  providers: [OrderProductsService],
  exports: [OrderProductsService],
})
export class OrderproductsModule {}
