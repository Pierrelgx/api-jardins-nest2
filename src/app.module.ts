import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from '../db/data-source';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuard } from './authorization/admin.guard';
import { OwnerIdGuard } from './authorization/ownerId.guard';
import { CartsModule } from './carts/carts.module';
import { MailerModule } from './mailer/mailer.module';
import { OrderproductsModule } from './orderproducts/orderproducts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CartsModule,
    AuthModule,
    MailerModule,
    OrderproductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
    {
      provide: APP_GUARD,
      useClass: OwnerIdGuard,
    },
  ],
})
export class AppModule {}
