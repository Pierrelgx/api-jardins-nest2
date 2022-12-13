import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/carts/entities/cart.entity';
import { IsEmail, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty()
  @OneToMany(() => Cart, (cart) => cart.user, {
    cascade: true,
  })
  carts: Cart[];

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  orders: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(10));
  }
}
