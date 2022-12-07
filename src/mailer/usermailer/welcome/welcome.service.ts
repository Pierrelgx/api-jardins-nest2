import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { SendgridService } from 'src/mailer/sendgrid.service';

@Injectable()
export class WelcomeService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendWelcome(email: string) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/usermailer/welcome/welcome.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const messageBody = template({
      email: email,
      url: 'https://www.lesjardinsdelalandette.com',
      mainImage:
        'https://www.shutterstock.com/image-photo/assortment-fresh-fruits-vegetables-600w-553662235.jpg',
    });

    const mail = {
      to: email,
      subject: 'Bienvenue dans les Jardins de Lalandette !',
      from: this.configService.get('SENDGRID_SENDER'),
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
