import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { Order } from '../../orders/entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class OrderConfirmService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendOrderConfirm(order: Order, cart: Cart[]) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/orderconfirm/orderconfirm.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const email = order.user.email;

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

    const messageBody = template({
      email: email,
      orderDate: orderDate,
      orderTime: orderTime,
      amount: amount,
      withdrawDate: withdrawDate,
      withdrawTime: withdrawTime,
      code: order.code,
      cart: cart,
      url: `https://www.lesjardinsdelalandette.com/orders/${order.id}`,
      mainImage:
        'https://www.shutterstock.com/image-photo/assortment-fresh-fruits-vegetables-600w-553662235.jpg',
    });

    const mail = {
      to: email,
      subject: 'Merci de votre commande !',
      from: this.configService.get('SENDGRID_SENDER'),
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
