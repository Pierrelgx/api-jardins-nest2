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
  total: number;

  @Column()
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => Product, (order) => order.id)
  @JoinColumn()
  product: Product;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
