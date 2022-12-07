import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { OrderMailerService } from './ordermailer.service';
import { AdminOrderConfirmService } from './adminorderconfirm/adminorderconfirm.service';
import { OrderConfirmService } from './orderconfirm/orderconfirm.service';
import { WelcomeService } from './welcome/welcome.service';
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
