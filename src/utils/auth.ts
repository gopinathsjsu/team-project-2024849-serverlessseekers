import Cookies from 'js-cookie';
import { SocialUser, GoogleAuthResponse, AppleAuthResponse, TokenPayload } from '../types/auth';

const TOKEN_COOKIE = 'auth_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

export const parseGoogleUser = (response: GoogleAuthResponse): SocialUser | null => {
  try {
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { sub, email, name, picture } = JSON.parse(jsonPayload);

    return {
      id: sub,
      email,
      name,
      picture,
      provider: 'google'
    };
  } catch (error) {
    console.error('Error parsing Google user:', error);
    return null;
  }
};

export const parseAppleUser = (response: AppleAuthResponse): SocialUser | null => {
  try {
    const { email, name } = response.user;
    const fullName = `${name.firstName} ${name.lastName}`.trim();

    return {
      id: email,
      email,
      name: fullName,
      provider: 'apple'
    };
  } catch (error) {
    console.error('Error parsing Apple user:', error);
    return null;
  }
};

export const setAuthCookies = (payload: TokenPayload) => {
  // Set HTTP-only cookie for access token (handled by server)
  // Client-side cookie for refresh token with secure settings
  Cookies.set(REFRESH_TOKEN_COOKIE, payload.refreshToken, {
    expires: 7, // 7 days
    secure: true,
    sameSite: 'strict'
  });
};

export const clearAuthCookies = () => {
  // Remove both cookies
  Cookies.remove(TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_COOKIE);
};