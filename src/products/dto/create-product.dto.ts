import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsUrl } from 'class-validator';
import { ProductTypes } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  productType: ProductTypes;

  @ApiProperty()
  @IsUrl()
  picture: string;

  @ApiProperty()
  available: boolean;
}
