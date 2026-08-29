import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { OAuthProvider } from './configs/oauth.config';
import { ProviderCallbackQueryDto } from './dto/provider-callback-query.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(':provider')
  redirectToProvider(
    @Param('provider') provider: OAuthProvider,
    @Res() res: Response,
  ) {
    const url = this.authService.getAuthUrl(provider);
    res.redirect(url);
  }

  @Get(':provider/callback')
  async oauthCallback(
    @Query() providerCallbackQueryDto: ProviderCallbackQueryDto,
  ) {
    return await this.authService.authenticateWithOAuth(
      providerCallbackQueryDto,
    );
  }
}
