import { IsString, IsOptional } from 'class-validator';
import { OAuthProvider } from '../configs/oauth.config';

export class ProviderCallbackQueryDto {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  error?: string;

  @IsString()
  provider: OAuthProvider;
}
