import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { WelcomeService } from 'src/mailer/welcome/welcome.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SendgridService, WelcomeService],
  exports: [UsersService],
})
export class UsersModule {}
