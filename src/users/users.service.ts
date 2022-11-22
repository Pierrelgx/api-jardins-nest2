import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WelcomeMailService } from 'src/mailer/welcomemail/welcomemail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private welcomeMail: WelcomeMailService,
  ) {}

  findAll() {
    return this.usersRepository.find({
      relations: {
        orders: true,
      },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: {
        orders: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new ForbiddenException({
        msg: 'User with this email already exists',
      });
    }
    const newUser = this.usersRepository.create(createUserDto);

    await this.welcomeMail.sendWelcomeEmail(newUser.email);

    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.usersRepository.save({ ...user, ...updateUserDto });

    // alternative but only returns the query result, not the updated user
    // return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);

    // alternative but only returns the query result, not the deleted user
    // return this.usersRepository.delete(id)
  }
}
