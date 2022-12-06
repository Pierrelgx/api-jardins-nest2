import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  subTotal: number;

  @Column()
  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: Product;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;
}
