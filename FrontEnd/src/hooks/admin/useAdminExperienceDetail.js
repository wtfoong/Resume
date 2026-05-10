import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExperienceDetail, updateExperienceDetail, deleteExperienceDetail } from '../../api/admin/experienceDetailApi';

export const useAdminExperienceDetail = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['experience'] });

  const createExperienceDetailMutation = useMutation({
    mutationFn: createExperienceDetail,
    onSuccess: invalidate,
  });

  const updateExperienceDetailMutation = useMutation({
    mutationFn: ({ id, data }) => updateExperienceDetail(id, data),
    onSuccess: invalidate,
  });

  const deleteExperienceDetailMutation = useMutation({
    mutationFn: deleteExperienceDetail,
    onSuccess: invalidate,
  });

  return {
    createExperienceDetail: createExperienceDetailMutation,
    updateExperienceDetail: updateExperienceDetailMutation,
    deleteExperienceDetail: deleteExperienceDetailMutation,
  };
};
