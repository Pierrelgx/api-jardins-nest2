import { Module } from '@nestjs/common';
import { AdminOrderConfirmService } from './adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from './orderconfirm/orderconfirm.service';
import { OrderMailerService } from './ordermailer.service';
import { SendgridService } from './sendgrid.service';
import { WelcomeService } from './welcome/welcome.service';

@Module({
  providers: [
    OrderMailerService,
    SendgridService,
    WelcomeService,
    AdminOrderConfirmService,
    OrderConfirmService,
  ],
  exports: [
    SendgridService,
    WelcomeService,
    AdminOrderConfirmService,
    OrderConfirmService,
  ],
})
export class MailerModule {}
