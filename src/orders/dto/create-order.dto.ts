import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';

@Entity()
export class CreateOrderDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  withdrawDate: string;

  @ApiProperty()
  withdrawMorning: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  orderProducts: OrderProduct[];
}
