import { OAuthProvider } from '@switchback/database';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  avatarUrl!: string;

  @IsString()
  providerId!: string;
  provider!: OAuthProvider;
}
