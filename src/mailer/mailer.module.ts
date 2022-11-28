import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { OrderMailerService } from './ordermailer.service';
import { AdminOrderConfirmService } from './adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from './orderconfirm/orderconfirm.service';
import { WelcomeService } from './welcome/welcome.service';

@Module({
  providers: [
    OrderMailerService,
    SendgridService,
    WelcomeService,
    AdminOrderConfirmService,
    OrderConfirmService,
  ],
  exports: [WelcomeService, AdminOrderConfirmService, OrderConfirmService],
})
export class MailerModule {}
