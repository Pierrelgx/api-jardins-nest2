import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Entity } from 'typeorm';

@Entity()
export class CreateOrderDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  products: Product[];
}
