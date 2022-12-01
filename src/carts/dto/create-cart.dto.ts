import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

@Entity()
export class CreateCartDto {
  @ApiProperty()
  quantity: number;

  subTotal: number;

  @ApiProperty()
  productId: string;

  userId: string;
}
