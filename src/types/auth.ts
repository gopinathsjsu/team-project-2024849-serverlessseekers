import { User, UserRole } from './index';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export interface GoogleAuthResponse {
  credential: string;
}

export interface AppleAuthResponse {
  authorization: {
    code: string;
    id_token: string;
  };
  user: {
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface SocialUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'apple';
}

export interface TokenPayload {
  token: string;
  refreshToken: string;
  expiresAt: number;
}