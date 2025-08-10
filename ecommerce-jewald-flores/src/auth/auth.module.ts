import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  // imports: [TypeOrmModule.forFeature([Users])],
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
