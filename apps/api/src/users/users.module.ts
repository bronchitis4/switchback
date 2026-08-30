import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
