import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/carts/entities/cart.entity';
import { OrderProduct } from 'src/orderproducts/entities/orderproduct.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductTypes {
  LEGUMES = 'legumes',
  FRUITS = 'fruits',
  OEUFS = 'oeufs',
  MIEL = 'miel',
  DIVERS = 'divers',
}

@Entity()
@Check('"price" > 0')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column({
    type: 'enum',
    enum: ProductTypes,
    default: ProductTypes.LEGUMES,
  })
  @ApiProperty()
  productType: ProductTypes;

  @Column()
  @ApiProperty()
  picture: string;

  @Column({ default: true })
  @ApiProperty()
  available: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty()
  @OneToMany(() => Cart, (cart) => cart.product, {
    cascade: true,
  })
  carts: Cart[];

  @ApiProperty()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @BeforeInsert()
  @BeforeUpdate()
  async normalizeAndUpperCase() {
    this.name =
      this.name[0].toUpperCase() +
      this.name
        .slice(1)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
  }
}
