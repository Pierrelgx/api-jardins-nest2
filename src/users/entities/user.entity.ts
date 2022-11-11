import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;
}
