import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { WelcomeMailService } from 'src/sendgrid/welcomemail/welcomemail.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SendgridService, WelcomeMailService],
  exports: [UsersService],
})
export class UsersModule {}
