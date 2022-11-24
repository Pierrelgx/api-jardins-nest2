import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @JoinTable()
  product: Product;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  user: User;
}
