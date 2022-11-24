import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  code: number;

  @Column()
  @ApiProperty()
  amount: number;

  @Column({ type: 'date' })
  @ApiProperty()
  withdrawDate: string;

  @Column({ default: true })
  @ApiProperty()
  withdrawMorning: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;

  @ApiProperty()
  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
