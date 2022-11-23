import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class OrderConfirmService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendOrderConfirm(
    code: number,
    withdrawDate: string,
    email: string,
    orderId: number,
  ) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/orderconfirm/orderconfirm.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const orderDate = new Date().toLocaleDateString('fr');
    const withdraw = withdrawDate.split('-').reverse().join('-');

    const messageBody = template({
      email: email,
      orderDate: orderDate,
      withdraw: withdraw,
      code: code,
      url: `https://www.lesjardinsdelalandette.com/orders/${orderId}`,
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
