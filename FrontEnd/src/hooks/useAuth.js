import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/authApi';

export const useAuth = () => {
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
  });

  return { resetPassword: resetPasswordMutation };
};