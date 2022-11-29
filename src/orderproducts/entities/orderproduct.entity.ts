import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  quantity: number;

  @Column()
  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.orderProducts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.orderProducts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  order: Order;
}
