import { Injectable } from '@nestjs/common';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { Order } from 'src/orders/entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { OrderMailerService } from '../ordermailer.service';
import MailerParams from 'src/mailer/mailer-params.helper';

@Injectable()
export class AdminOrderConfirmService {
  constructor(
    private orderMailerService: OrderMailerService,
    private readonly sendgridService: SendgridService,
    private readonly mailerParams: MailerParams,
  ) {}

  public async sendAdminOrderConfirm(order: Order, cart: Cart[]) {
    const emailTemplate = fs
      .readFileSync(
        './dist/src/mailer/ordermailer/adminorderconfirm/adminorderconfirm.hbs',
      )
      .toString();

    const template = hbs.compile(emailTemplate);

    const orderDetails = await this.orderMailerService.setOrderDetails(
      order,
      cart,
    );

    const messageBody = template({
      email: orderDetails.email,
      orderDate: orderDetails.orderDate,
      orderTime: orderDetails.orderTime,
      amount: orderDetails.amount,
      withdrawDate: orderDetails.withdrawDate,
      withdrawTime: orderDetails.withdrawTime,
      code: order.code,
      cartDetails: orderDetails.cartDetails,
      url: orderDetails.orderDetailsUrl,
    });

    const mail = {
      to: this.mailerParams.admin,
      subject: 'Nouvelle commande !',
      from: this.mailerParams.sender,
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
