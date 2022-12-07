import { Body, Controller, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('forgot-password')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post('forgot')
  async forgot(@Body('email') email: string) {
    await this.passwordResetService.create(email);
    return { msg: 'Reset link sent to your email.' };
  }

  @Post('reset')
  async reset(@Body() body) {
    await this.passwordResetService.reset(body.id, body.password);
    await this.passwordResetService.remove(body.id);
    return { msg: 'Password successfully updated' };
  }
}
