import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './modules/car.module';
import { Session } from './entities/session.entity';
import { Car } from './entities/car.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      synchronize: true,
      entities: [Car, Session],
    }),
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
