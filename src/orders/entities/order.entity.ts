import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';

@Entity()
@Check('"amount" > 0')
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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ApiProperty()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];
}
