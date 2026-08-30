import { OAuthProvider } from '@switchback/database';

export const oauthConfig = {
  [OAuthProvider.GOOGLE]: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    codeParamsReq: {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
      access_type: 'offline',
      scope: 'email profile',
      response_type: 'code',
      prompt: 'select_account',
    },
    tokenParamsReq: {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_SECRET_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
      grant_type: 'authorization_code',
    },
  },
};
