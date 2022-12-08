import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class CreateOrderDto {
  code: number;

  amount: number;

  @ApiProperty()
  withdrawDate: string;

  @ApiProperty()
  withdrawMorning: boolean;

  user: User;

  orderProducts: OrderProduct[];
}
