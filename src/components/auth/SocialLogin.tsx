import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../store/authStore';
import { parseGoogleUser, parseAppleUser } from '../../utils/auth';
import type { SocialUser, GoogleAuthResponse, AppleAuthResponse } from '../../types/auth';

interface SocialLoginProps {
  onSuccess?: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onSuccess }) => {
  const { loginWithSocial } = useAuthStore();

  const handleGoogleSuccess = async (response: GoogleAuthResponse) => {
    const socialUser = parseGoogleUser(response);
    if (socialUser) {
      await loginWithSocial(socialUser);
      onSuccess?.();
    }
  };

  const handleAppleLogin = async (response: AppleAuthResponse) => {
    const socialUser = parseAppleUser(response);
    if (socialUser) {
      await loginWithSocial(socialUser);
      onSuccess?.();
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.error('Google Login Failed'),
  });

  return (
    <div className="space-y-4">
      <button
        onClick={() => googleLogin()}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                   bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                   hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                   transform hover:scale-[1.02] transition-all duration-300
                   shadow-[0_8px_16px_rgba(37,99,235,0.2)]
                   hover:shadow-[0_12px_20px_rgba(37,99,235,0.3)]"
      >
        <div className="bg-white p-1 rounded-full">
          <img 
            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
            alt="Google" 
            className="w-5 h-5"
          />
        </div>
        <span className="text-white font-medium text-lg">Continue with Google</span>
      </button>

      <button
        onClick={() => console.log('Apple login clicked')}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                   bg-gradient-to-r from-neutral-800 via-neutral-900 to-black
                   hover:from-neutral-900 hover:via-black hover:to-neutral-900
                   transform hover:scale-[1.02] transition-all duration-300
                   shadow-[0_8px_16px_rgba(0,0,0,0.2)]
                   hover:shadow-[0_12px_20px_rgba(0,0,0,0.3)]"
      >
        <div className="bg-black p-1 rounded-full">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
        </div>
        <span className="text-white font-medium text-lg">Continue with Apple</span>
      </button>
    </div>
  );
};

export default SocialLogin;