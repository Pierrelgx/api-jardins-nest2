import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

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
  products: Product[];
}
