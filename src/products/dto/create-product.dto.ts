import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { ProductType } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  types: ProductType;

  @ApiProperty()
  @IsUrl()
  picture: string;

  @ApiProperty()
  available: boolean;
}
