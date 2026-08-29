import { BadRequestException, Injectable } from '@nestjs/common';
import { oauthConfig, OAuthProvider } from './configs/oauth.config';
import { ProviderCallbackQueryDto } from './dto/provider-callback-query.dto';
import { NormalizedOAuthProfile } from './interfaces/auth.interfaces';
import { OAuthErrors } from './constants/auth-error.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getAuthUrl(provider: OAuthProvider) {
    const config = oauthConfig[provider];
    if (!config) throw new BadRequestException(OAuthErrors.PROVIDER_NOT_EXIST);

    const url = new URLSearchParams(config.codeParamsReq);
    return `${config.authUrl}?${url.toString()}`;
  }

  handleOAuthCallback(provider: OAuthProvider, code: string) {
    switch (provider) {
      case OAuthProvider.GOOGLE:
        return this.googleOAuth(code, provider);
      default:
        throw new BadRequestException(OAuthErrors.PROVIDER_NOT_EXIST);
    }
  }

  async googleOAuth(code: string, provider: OAuthProvider) {
    const config = oauthConfig[provider];
    if (!config) throw new BadRequestException(OAuthErrors.PROVIDER_NOT_EXIST);

    const tokenResponse = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ ...config.tokenParamsReq, code }),
    });
    const { access_token } = await tokenResponse.json();

    const userRespone = await fetch(config.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const userData = await userRespone.json();

    const normalizedOAuthProfile: NormalizedOAuthProfile = {
      id: userData.sub,
      name: userData.name,
      email: userData.email,
      avatarUrl: userData.picture,
    };

    return normalizedOAuthProfile;
  }

  async authenticateWithOAuth(
    providerCallbackQueryDto: ProviderCallbackQueryDto,
  ) {
    const { code, provider, error } = providerCallbackQueryDto;

    if (error) {
      throw new BadRequestException(error);
    }

    const userData = await this.handleOAuthCallback(provider, code);

    //TODO: Create-get user

    const access_token = await this.jwtService.signAsync({
      sub: userData?.id,
      email: userData?.email,
    });

    return {
      userData,
      access_token,
    };
  }
}
