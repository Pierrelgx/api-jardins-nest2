import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MailerParams {
  constructor(private configService: ConfigService) {}

  sender = this.configService.get('SENDGRID_SENDER');
  admin = this.configService.get('ADMIN_EMAIL');
  mainImage =
    'https://www.shutterstock.com/image-photo/assortment-fresh-fruits-vegetables-600w-553662235.jpg';
  mainUrl = this.configService.get('ALLOWED_URL');
}
