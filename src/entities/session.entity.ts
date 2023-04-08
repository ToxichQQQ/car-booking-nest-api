import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Session {
  @ApiProperty({ example: 1, description: 'Session id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '10-22-2023',
    description: 'Start time of the booking session',
  })
  @Column()
  startDate: Date;

  @ApiProperty({
    example: '11-12-2023',
    description: 'End time of the booking session',
  })
  @Column()
  endDate: Date;

  @ApiProperty({ example: 'Т453ВА', description: 'Car number' })
  @Column()
  carNumber: string;
}
