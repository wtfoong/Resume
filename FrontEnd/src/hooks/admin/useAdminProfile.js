import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../../api/admin/profileApi';

export const useAdminProfile = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  return { updateProfile: updateProfileMutation };
};
