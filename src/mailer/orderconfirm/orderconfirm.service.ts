import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { Order } from '../../orders/entities/order.entity';

@Injectable()
export class OrderConfirmService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendOrderConfirm(code: number, email: string, order: Order) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/orderconfirm/orderconfirm.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const orderDate = new Date().toLocaleDateString('fr');
    const withdraw = order.withdrawDate.split('-').reverse().join('-');
    const time = order.withdrawMorning ? 'de 10h à 14h' : 'de 14h à 19h';
    const amount = (order.amount / 100).toLocaleString('fr', {
      style: 'currency',
      currency: 'EUR',
    });

    const messageBody = template({
      email: email,
      orderDate: orderDate,
      amount: amount,
      withdraw: withdraw,
      time: time,
      code: code,
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
