import { OAuthProvider } from '@switchback/database';
import { IsString, IsOptional } from 'class-validator';

export class ProviderCallbackQueryDto {
  @IsString()
  code!: string;

  @IsString()
  @IsOptional()
  error?: string;

  @IsString()
  provider!: OAuthProvider;
}
