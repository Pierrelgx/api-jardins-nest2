import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetMailerService } from 'src/mailer/usermailer/password-reset-mailer/password-reset-mailer.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private usersService: UsersService,
    private passwordResetMailerService: PasswordResetMailerService,
  ) {}

  async create(email: string): Promise<any> {
    const user = this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException({ msg: 'No User with this email.' });
    }

    const alreadyExists = await this.findOneByEmail(email);
    if (alreadyExists) {
      return await this.passwordResetMailerService.sendResetLink(alreadyExists);
    }

    const newPwdReset = this.passwordResetRepository.create({ email });
    const pwdReset = await this.passwordResetRepository.save(newPwdReset);

    return await this.passwordResetMailerService.sendResetLink(pwdReset);
  }

  async reset(id: string, password: string): Promise<User> {
    const pwdReset = await this.findOne(id);
    const user = await this.usersService.findOneByEmail(pwdReset.email);

    if (!pwdReset || !user) {
      throw new NotFoundException({ msg: 'not found.' });
    }

    return await this.usersService.update(user.id, { password: password });
  }

  findOne(id: string): Promise<PasswordReset> {
    return this.passwordResetRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string): Promise<PasswordReset> {
    return this.passwordResetRepository.findOneBy({ email: email });
  }

  async remove(id: string) {
    const pwdReset = await this.findOne(id);
    return await this.passwordResetRepository.delete(pwdReset);
  }
}
