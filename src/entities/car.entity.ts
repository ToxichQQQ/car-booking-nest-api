import { Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Car {
  @ApiProperty({ example: 'Т453ВА', description: 'Car number' })
  @PrimaryColumn()
  number: string;
}
