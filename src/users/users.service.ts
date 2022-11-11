import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[];

  findAll(email?: string): User[] {
    if (email) {
      return this.users.filter((user) => user.email === email);
    }
    return this.users;
  }

  findOne(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = { ...createUserDto };

    this.users.push(newUser);

    return newUser;
  }
}
