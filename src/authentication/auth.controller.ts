import { Controller, Get, UseGuards } from '@nestjs/common';
import { Admin } from 'src/authorization/admin.decorator';
import { OwnerId } from 'src/authorization/ownerId.decorator';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  @Get('auth')
  @UseGuards(AuthenticatedGuard)
  checkAuth(): boolean {
    return true;
  }

  @Get('admin')
  @Admin(true)
  checkIfAdmin(): boolean {
    return true;
  }

  @Get('owner')
  @OwnerId(true)
  checkIfOwner(): boolean {
    return true;
  }
}
