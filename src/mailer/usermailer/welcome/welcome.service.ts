import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { SendgridService } from 'src/mailer/sendgrid.service';
import MailerParams from 'src/mailer/mailer-params.helper';

@Injectable()
export class WelcomeService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
    private mailerParams: MailerParams,
  ) {}

  public async sendWelcome(email: string) {
    const emailTemplate = fs
      .readFileSync('./dist/src/mailer/usermailer/welcome/welcome.hbs')
      .toString();

    const template = hbs.compile(emailTemplate);

    const messageBody = template({
      email: email,
      url: this.mailerParams.mainUrl,
      mainImage: this.mailerParams.mainImage,
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
