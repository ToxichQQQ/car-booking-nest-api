import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryColumn()
  number: string;
}
