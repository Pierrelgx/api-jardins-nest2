import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { Order } from '../../orders/entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class AdminOrderConfirmService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendAdminOrderConfirm(order: Order, cart: Cart[]) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/adminorderconfirm/adminorderconfirm.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const admin = this.configService.get('ADMIN_EMAIL');

    const email = order.user.email;

    // const toLocalCurrency = (number: number) => {
    //   (number / 100).toLocaleString('fr', {
    //     style: 'currency',
    //     currency: 'EUR',
    //   });
    // };

    const orderDate = order.createdAt.toLocaleDateString('fr');
    const orderTime = order.createdAt.toLocaleTimeString('fr', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const withdrawDate = order.withdrawDate.split('-').reverse().join('-');
    const withdrawTime = order.withdrawMorning
      ? 'de 10h à 14h'
      : 'de 14h à 19h';
    const amount = (order.amount / 100).toLocaleString('fr', {
      style: 'currency',
      currency: 'EUR',
    });

    const cartDetails = cart.map((x) => [
      x.quantity,
      x.product.name,
      (x.total / 100).toLocaleString('fr', {
        style: 'currency',
        currency: 'EUR',
      }),
    ]);

    const messageBody = template({
      email: email,
      orderDate: orderDate,
      orderTime: orderTime,
      amount: amount,
      withdrawDate: withdrawDate,
      withdrawTime: withdrawTime,
      code: order.code,
      cartDetails: cartDetails,
      url: `https://www.lesjardinsdelalandette.com/orders/${order.id}`,
    });

    const mail = {
      to: admin,
      subject: 'Merci de votre commande !',
      from: this.configService.get('SENDGRID_SENDER'),
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
