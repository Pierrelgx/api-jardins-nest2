import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const hash = await bcrypt.hash(password, Number(10));
    const isMatch = await bcrypt.compare(password, hash);

    if (user && isMatch) {
      // const { password, email, ...rest } = user;
      return user;
    }

    return null;
  }
}
