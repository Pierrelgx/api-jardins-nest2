import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { OrderMailerService } from './ordermailer/ordermailer.service';
import { AdminOrderConfirmService } from './ordermailer/adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from './ordermailer/orderconfirm/orderconfirm.service';
import { WelcomeService } from './usermailer/welcome/welcome.service';
import { PasswordResetMailerService } from './usermailer/password-reset-mailer/password-reset-mailer.service';

@Module({
  providers: [
    OrderMailerService,
    SendgridService,
    WelcomeService,
    AdminOrderConfirmService,
    OrderConfirmService,
    PasswordResetMailerService,
  ],
  exports: [
    WelcomeService,
    AdminOrderConfirmService,
    OrderConfirmService,
    PasswordResetMailerService,
  ],
})
export class MailerModule {}
