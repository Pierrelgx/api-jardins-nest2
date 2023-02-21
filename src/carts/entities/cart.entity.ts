import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
