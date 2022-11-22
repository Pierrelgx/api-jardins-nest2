import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from '../sendgrid.service';

@Injectable()
export class WelcomeMailService {
  constructor(
    private readonly sendgridService: SendgridService,
    private configService: ConfigService,
  ) {}

  public async sendWelcomeEmail(email: string) {
    const mail = {
      to: email,
      subject: 'Bienvenue dans les Jardins de Lalandette !',
      from: this.configService.get('SENDGRID_SENDER'),
      text: 'Merci de nous avoir rejoints !',
      html: '<h1>Merci de nous avoir rejoints !</h1>',
    };

    return await this.sendgridService.send(mail);
  }
}
