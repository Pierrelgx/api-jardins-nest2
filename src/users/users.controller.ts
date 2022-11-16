import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true, description: 'finds all users' })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: User, description: 'finds a specific user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiCreatedResponse({ type: User, description: 'create new user' })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout(function (err: Error) {
      if (err) {
        return err.message;
      }
    });
    return { msg: 'Logged out' };
  }
}
