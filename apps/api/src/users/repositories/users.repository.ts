import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@switchback/database';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  getUserByIdProvider(providerId: string) {
    return this.prismaService.user.findUnique({ where: { providerId } });
  }

  createNewUser(user: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data: user });
  }
}
