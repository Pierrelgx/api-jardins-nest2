import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  // @ApiProperty({ required: false })
  // gender?: string;
}
