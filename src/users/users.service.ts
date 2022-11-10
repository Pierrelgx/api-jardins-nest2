import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, email: 'Lolo@yo.com', password: '696969' },
    { id: 1, email: 'Low1@yo.com', password: '696969' },
    { id: 2, email: 'Low2@yo.com', password: '696969' },
  ];

  findAll(email?: string): User[] {
    if (email) {
      return this.users.filter((user) => user.email === email);
    }
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };

    this.users.push(newUser);

    return newUser;
  }
}
