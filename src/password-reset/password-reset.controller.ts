import { Body, Controller, Param, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('forgot-password')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post()
  async forgot(@Body('email') email: string) {
    await this.passwordResetService.create(email);
    return { msg: 'Reset link sent to your email.' };
  }

  @Post(':id')
  async reset(@Param('id') id: string, @Body() body) {
    await this.passwordResetService.reset(id, body.password);
    await this.passwordResetService.remove(id);
    return { msg: 'Password successfully updated' };
  }
}
