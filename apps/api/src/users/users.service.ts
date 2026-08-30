import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getUserForLogin(userData: CreateUserDto) {
    let user = await this.userRepository.getUserByIdProvider(
      userData.providerId,
    );
    if (!user) {
      user = await this.userRepository.createNewUser(userData);
    }

    return user;
  }
}
