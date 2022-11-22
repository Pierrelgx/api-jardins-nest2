import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';
import * as hbs from 'handlebars';
import * as fs from 'fs';
@Injectable()
export class WelcomeMailService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendWelcomeEmail(email: string) {
    const emailTemplate = fs
      .readFileSync('./src/mailer/welcomemail/welcomemail.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const messageBody = template({
      email: email,
    });

    const mail = {
      to: email,
      subject: 'Bienvenue dans les Jardins de Lalandette !',
      from: this.configService.get('SENDGRID_SENDER'),
      text: 'Merci de nous avoir rejoints !',
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
